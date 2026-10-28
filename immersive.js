/* Scene-led game experience. Case facts remain in app.js. */
let sceneIndex = 0;
let selectedSecond = null;
let finishedTime = 0;
let narrator = null;
let narrationEnabled = true;
let transcriptOpen = false;
let audioCtx = null;
let musicGain = null;
let musicTimer = null;
let chordIndex = 0;
let musicVolume = Number(localStorage.getItem('iz-music-volume') ?? '35');
let musicMuted = localStorage.getItem('iz-music-muted') === 'true';
let narrations = {};

fetch('./narration.json').then(r => r.json()).then(data => { narrations = data; route(); }).catch(() => { route(); });

function musicLevel() { return musicMuted ? 0 : musicVolume / 100 * (narrator && !narrator.paused ? 0.26 : 1); }
function updateMusicGain() {
  if (musicGain && audioCtx) musicGain.gain.setTargetAtTime(musicLevel(), audioCtx.currentTime, .18);
  const slider = document.querySelector('#music-volume');
  if (slider) slider.value = String(musicVolume);
  const toggle = document.querySelector('#music-toggle');
  if (toggle) { toggle.textContent = musicMuted ? '♫ Kapalı' : '♫ Açık'; toggle.setAttribute('aria-pressed', String(!musicMuted)); }
}
function scoreChord() {
  if (!audioCtx || !musicGain) return;
  const chords = [[220,261.63,329.63],[174.61,220,261.63],[146.83,174.61,220],[164.81,196,246.94]];
  const notes = chords[chordIndex++ % chords.length];
  const t = audioCtx.currentTime + .03;
  notes.forEach((hz,i) => {
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain(), filter = audioCtx.createBiquadFilter();
    osc.type = i === 0 ? 'sine' : 'triangle'; osc.frequency.value = hz / (i === 0 ? 2 : 1);
    filter.type = 'lowpass'; filter.frequency.value = 690;
    gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(i === 0 ? .065 : .025, t + 1.2);
    gain.gain.setValueAtTime(i === 0 ? .065 : .025, t + 2.8); gain.gain.linearRampToValueAtTime(0, t + 4.1);
    osc.connect(filter).connect(gain).connect(musicGain); osc.start(t); osc.stop(t + 4.2);
  });
  for (let n=0;n<4;n++) {
    const osc=audioCtx.createOscillator(), gain=audioCtx.createGain(), at=t+n*1.04;
    osc.type='sine'; osc.frequency.value=notes[(n+1)%3]*2;
    gain.gain.setValueAtTime(0,at); gain.gain.linearRampToValueAtTime(.012,at+.08); gain.gain.exponentialRampToValueAtTime(.0001,at+.7);
    osc.connect(gain).connect(musicGain); osc.start(at); osc.stop(at+.72);
  }
}
function startMusic() {
  if (musicMuted) return;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    musicGain = audioCtx.createGain(); musicGain.gain.value = musicLevel(); musicGain.connect(audioCtx.destination);
    scoreChord(); musicTimer=setInterval(scoreChord, 4160);
  } else if (audioCtx.state === 'suspended') audioCtx.resume();
  updateMusicGain();
}
function stopNarrator() { if(narrator){narrator.pause();narrator=null;updateMusicGain();} }
function playNarration(c, index) {
  stopNarrator();
  if (!narrationEnabled || index > (narrations[c.id]||[]).length) return;
  narrator = new Audio(`./assets/audio/${c.id}/${index}.mp3`);
  narrator.preload='auto'; narrator.volume=1;
  narrator.onplay=()=>{updateMusicGain();updateNarrationButton(true)};
  narrator.onpause=()=>{updateMusicGain();updateNarrationButton(false)};
  narrator.onended=()=>{updateMusicGain();updateNarrationButton(false)};
  narrator.onerror=()=>{transcriptOpen=true;const p=document.querySelector('#scene-caption');if(p)p.hidden=false;updateNarrationButton(false)};
  narrator.play().catch(()=>{updateNarrationButton(false);});
}
function updateNarrationButton(playing){const el=document.querySelector('#narration-toggle');if(el)el.textContent=playing?'❚❚ Anlatımı durdur':'▶ Anlatımı dinle';}
function visualFor(c) {
  if (sceneIndex===0 || sceneIndex>c.evidence.length) return `<img class="scene-photo" src="${c.image}" alt="${esc(c.title)} olay yeri">`;
  const e=c.evidence[sceneIndex-1];
  if(e.kind==='image')return `<img class="scene-photo" src="${e.image}" alt="${esc(e.title)}">${(e.callouts||[]).map(([x,y,label])=>`<span class="scene-callout" style="left:${x};top:${y}">${esc(label)}</span>`).join('')}`;
  if(e.kind==='phone')return `<div class="scene-device"><div class="device-header"><span>●●●</span><span>MESAJLAR · ${esc(c.time)}</span><span>▰</span></div><div class="device-chat">${e.messages.map((m,i)=>`<div class="device-bubble ${i%2?'sent':''}"><small>${esc(m[0])}</small>${esc(m[1])}</div>`).join('')}</div><div class="device-bottom"></div></div>`;
  return `<div class="scene-document"><span class="document-stamp">İZ / KANIT ${String(sceneIndex).padStart(2,'0')}</span><div class="document-lines">${esc(e.note).replaceAll('\n','<br>')}</div><span class="document-foot">KAYIT DOĞRULANDI · ${esc(e.tag)}</span></div>`;
}
function renderScene(c, play=true) {
  document.title=`${c.title} — İz`;
  const isIntro=sceneIndex===0, isDecision=sceneIndex===c.evidence.length+1, isResult=sceneIndex===c.evidence.length+2;
  const e=c.evidence[sceneIndex-1];
  const number=sceneIndex+1,total=c.evidence.length+3;
  const heading=isIntro?c.title:isDecision?'Karar anı':isResult?'Dosya kapandı':e.title;
  const kicker=isIntro?`DOSYA ${c.number} · ${c.time}`:isDecision?'SON SAHNE / KARAR':isResult?'GERÇEK ORTAYA ÇIKTI':e.tag;
  const summary=isIntro?c.subtitle:isDecision?c.question:isResult?'İzleri doğru okudun.':e.brief;
  const narrationText=narrations[c.id]?.[sceneIndex] || (isIntro?c.lead:isDecision?c.question:e?.detail||'');
  shell(`<main class="story"><div class="story-bar"><button class="story-exit" id="story-exit" aria-label="Dosyalara dön">← Çık</button><div class="story-progress"><span>DOSYA ${c.number}</span><div class="progress-track"><i style="width:${Math.min(100,number/total*100)}%"></i></div><span>${Math.min(number,total)} / ${total}</span></div><span class="story-clock" id="clock">00:00</span></div><div class="story-stage"><div class="story-visual">${visualFor(c)}<div class="visual-vignette"></div><span class="scene-corner">${isIntro?'OLAY YERİ':isDecision?'KANITLARI BİRLEŞTİR':isResult?'DOSYA KAPANDI':`KANIT ${String(sceneIndex).padStart(2,'0')}`}</span></div><div class="scene-panel"><span class="eyebrow">${esc(kicker)}</span><h1>${esc(heading)}</h1><p class="scene-summary">${esc(summary)}</p>${!isResult?`<div class="scene-audio"><button id="narration-toggle" class="audio-button">▶ Anlatımı dinle</button><button id="transcript-toggle" class="text-button">${transcriptOpen?'Altyazıyı gizle':'Altyazı'}</button></div><p id="scene-caption" class="scene-caption" ${transcriptOpen?'':'hidden'}>${esc(narrationText)}</p>`:''}${isDecision?`<div class="decision-list">${c.suspects.map((s,i)=>`<button class="decision-suspect ${selected===i?'active':''}" data-suspect="${i}" aria-pressed="${selected===i}"><span><strong>${esc(s[0])}</strong><small>${esc(s[1])}</small></span><i>○</i></button>`).join('')}</div><h2 class="second-question">${esc(c.secondQuestion)}</h2><div class="decision-list second-list">${c.secondOptions.map((option,i)=>`<button class="decision-suspect ${selectedSecond===i?'active':''}" data-second="${i}" aria-pressed="${selectedSecond===i}"><span><strong>${esc(option)}</strong></span><i>○</i></button>`).join('')}</div><button id="hint" class="text-button hint-action">İpucu al <span class="clue-count">${hintsUsed} / 2</span></button><div id="hints"></div><div id="wrong-answer" class="wrong-answer" hidden>İki karar birlikte kanıtlarla uyuşmuyor. Son üç kanıtı yeniden incele.</div>`:''}${isResult?`<p class="result-reveal">${esc(c.reveal)}</p><div class="result-score"><span>◷ ${fmt(finishedTime)}</span><span>✧ ${hintsUsed} ipucu</span><span>↻ ${wrongCount} yanlış</span></div>${challenge?`<p class="challenge-result">${finishedTime<challenge.time?'Arkadaşından daha hızlı çözdün.':finishedTime===challenge.time?'Arkadaşınla aynı sürede çözdün.':'Arkadaşın bu kez daha hızlıydı.'} Sen: ${fmt(finishedTime)} · Arkadaşın: ${fmt(challenge.time)}</p>`:''}`:''}<div class="scene-actions">${sceneIndex>0&&!isResult?'<button class="btn btn-secondary" id="scene-prev">← Geri</button>':''}${!isDecision&&!isResult?`<button class="btn btn-primary" id="scene-next">${isIntro?'Olay yerine gir':'Anladım, devam et'} →</button>`:isDecision?`<button class="btn btn-primary" id="scene-solve" ${selected===null||selectedSecond===null?'disabled':''}>Kararımı ver →</button>`:`<button class="btn btn-primary" id="scene-share">Sonucu paylaş ↗</button><button class="btn btn-secondary" id="scene-archive">Başka dosya aç</button>`}</div></div></div><div class="story-sound"><button id="music-toggle" aria-pressed="${!musicMuted}">${musicMuted?'♫ Kapalı':'♫ Açık'}</button><label for="music-volume">Müzik</label><input id="music-volume" type="range" min="0" max="100" value="${musicVolume}" aria-label="Müzik sesi"><span>${musicVolume}%</span></div></main>`);
  if(isResult)document.querySelector('.result-reveal').insertAdjacentHTML('beforebegin','<div class="scene-audio"><button id="narration-toggle" class="audio-button">▶ Çözümü dinle</button></div>');
  document.querySelector('#story-exit').onclick=()=>location.hash='dosyalar';
  document.querySelector('#scene-next')?.addEventListener('click',()=>{sceneIndex++;transcriptOpen=false;renderScene(c);});
  document.querySelector('#scene-prev')?.addEventListener('click',()=>{sceneIndex--;transcriptOpen=false;renderScene(c);});
  document.querySelector('#scene-archive')?.addEventListener('click',()=>location.hash='dosyalar');
  document.querySelector('#scene-share')?.addEventListener('click',()=>share(c,finishedTime));
  document.querySelector('#transcript-toggle')?.addEventListener('click',()=>{transcriptOpen=!transcriptOpen;document.querySelector('#scene-caption').hidden=!transcriptOpen;document.querySelector('#transcript-toggle').textContent=transcriptOpen?'Altyazıyı gizle':'Altyazı';});
  document.querySelector('#narration-toggle')?.addEventListener('click',()=>{if(narrator&&!narrator.paused){narrator.pause();return;}if(narrator&&narrator.readyState>0){narrator.play().catch(()=>{});return;}playNarration(c,sceneIndex);});
  const updateSolve=()=>{document.querySelector('#scene-solve').disabled=selected===null||selectedSecond===null;};
  document.querySelectorAll('[data-suspect]').forEach(el=>el.onclick=()=>{selected=Number(el.dataset.suspect);document.querySelectorAll('[data-suspect]').forEach(s=>{const on=s===el;s.classList.toggle('active',on);s.setAttribute('aria-pressed',String(on));});updateSolve();});
  document.querySelectorAll('[data-second]').forEach(el=>el.onclick=()=>{selectedSecond=Number(el.dataset.second);document.querySelectorAll('[data-second]').forEach(s=>{const on=s===el;s.classList.toggle('active',on);s.setAttribute('aria-pressed',String(on));});updateSolve();});
  document.querySelector('#hint')?.addEventListener('click',()=>hint(c));
  document.querySelector('#scene-solve')?.addEventListener('click',()=>solve(c));
  document.querySelector('#music-toggle').onclick=()=>{musicMuted=!musicMuted;localStorage.setItem('iz-music-muted',String(musicMuted));if(!musicMuted)startMusic();updateMusicGain();};
  document.querySelector('#music-volume').oninput=ev=>{musicVolume=Number(ev.target.value);localStorage.setItem('iz-music-volume',String(musicVolume));document.querySelector('.story-sound span').textContent=`${musicVolume}%`;if(musicVolume>0&&musicMuted){musicMuted=false;localStorage.setItem('iz-music-muted','false');startMusic();}updateMusicGain();};
  if(play)playNarration(c,sceneIndex);else stopNarrator();
  updateMusicGain();tick();window.scrollTo(0,0);
}
function game(id){const c=cases.find(x=>x.id===id);if(!c){home();return;}clearInterval(timer);stopNarrator();currentId=id;selected=null;selectedSecond=null;hintsUsed=0;wrongCount=0;finishedTime=0;sceneIndex=0;transcriptOpen=false;startTime=Date.now();elapsedBefore=0;renderScene(c);timer=setInterval(tick,1000);}
function solve(c){if(selected===null||selectedSecond===null)return;if(selected!==c.answer||selectedSecond!==c.secondAnswer){wrongCount++;document.querySelector('#wrong-answer').hidden=false;return;}const time=seconds();clearInterval(timer);finishedTime=time;elapsedBefore=time;startTime=Date.now();localStorage.setItem(storageKey(c.id),JSON.stringify({time,hints:hintsUsed,date:todayKey}));sceneIndex=c.evidence.length+2;renderScene(c,true);}
document.addEventListener('click',event=>{if(event.target.closest('[data-open], #scene-next, #narration-toggle'))startMusic();},true);
window.addEventListener('hashchange',()=>{if(!location.hash.startsWith('#dosya/')){stopNarrator();audioCtx?.suspend();}});

