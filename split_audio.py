"""Split a scene narration at deliberate pauses in the ElevenLabs recording."""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT / '.audio-tools'))
import imageio_ffmpeg  # type: ignore

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
case_id = sys.argv[1]
narrations = json.loads((ROOT / 'narration.json').read_text(encoding='utf-8'))
if case_id == 'outros':
    outros = json.loads((ROOT / 'outro.json').read_text(encoding='utf-8'))
    segments = list(outros.values())
    source = ROOT / 'assets' / 'audio' / 'outros-full.mp3'
else:
    segments = narrations[case_id]
    source = ROOT / 'assets' / 'audio' / case_id / 'full.mp3'
probe = subprocess.run([ffmpeg, '-hide_banner', '-i', str(source), '-af', 'silencedetect=noise=-36dB:d=0.7', '-f', 'null', 'NUL'], capture_output=True, text=True)
log = probe.stderr
duration_match = re.search(r'Duration: (\d+):(\d+):([\d.]+)', log)
if not duration_match:
    raise RuntimeError('Audio duration not found')
duration = int(duration_match[1]) * 3600 + int(duration_match[2]) * 60 + float(duration_match[3])
starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
cuts = [(a + b) / 2 for a, b in zip(starts, ends)]
if len(cuts) != len(segments) - 1:
    short_probe = subprocess.run([ffmpeg, '-hide_banner', '-i', str(source), '-af', 'silencedetect=noise=-25dB:d=0.35', '-f', 'null', 'NUL'], capture_output=True, text=True)
    short_starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', short_probe.stderr)]
    short_ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', short_probe.stderr)]
    candidates = [(a+b)/2 for a,b in zip(short_starts, short_ends)]
    total_chars = sum(len(x) for x in segments)
    cuts = []
    for i in range(len(segments)-1):
        expected = duration * sum(len(x) for x in segments[:i+1]) / total_chars
        eligible = [x for x in candidates if x > (cuts[-1]+5 if cuts else 5) and x < duration-5]
        if not eligible:
            raise RuntimeError(f'{case_id}: no short pause near scene {i+1}')
        chosen = min(eligible, key=lambda x: abs(x-expected))
        if abs(chosen-expected) > 4:
            raise RuntimeError(f'{case_id}: pause too far from scene {i+1}: {chosen:.1f} vs {expected:.1f}')
        cuts.append(chosen)
    print(f'{case_id}: used short natural pauses {cuts}')
boundaries = [0.0] + cuts + [duration]
for i in range(len(segments)):
    if case_id == 'outros':
        slug = list(outros.keys())[i]
        output = ROOT / 'assets' / 'audio' / slug / f'{len(narrations[slug])}.mp3'
    else:
        output = source.parent / f'{i}.mp3'
    result = subprocess.run([ffmpeg, '-y', '-hide_banner', '-loglevel', 'error', '-ss', f'{boundaries[i]:.3f}', '-to', f'{boundaries[i+1]:.3f}', '-i', str(source), '-c:a', 'libmp3lame', '-q:a', '3', str(output)], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)
print(f'{case_id}: {len(segments)} scenes, {duration:.1f}s')
