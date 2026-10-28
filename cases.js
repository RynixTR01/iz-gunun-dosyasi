const cases = [
  {
    id:'son-vapur', number:'01', time:'00.12', title:'Son Vapur', subtitle:'İptal edilen sefer, bağlı bir atkı ve açık kalan servis kapısı.', image:'./assets/son-vapur.webp', duration:'8–10 dk',
    lead:'Gazeteci Aslı, gece yarısından sonra iskeleden kayboldu. Kırmızı atkısı korkulukta bulundu. Görevli onun son vapura bindiğini söylüyor. Aslı, limandaki kayıp yükleri araştırıyordu.',
    question:'Aslı’nın vapura bindiği yalanını kim söyledi?', suspects:[['Selin','Yakın arkadaşı'],['Yalın','İskele görevlisi'],['Rıza','Yüklenici']], answer:1,
    secondQuestion:'Aslı iskeleden nasıl ayrıldı?', secondOptions:['İptal edilen 00.12 vapuruyla','Denize açılan yük teknesiyle','Bakım koridorundaki servis kapısından'], secondAnswer:2,
    reveal:'00.12 seferi hiç yapılmadı. Yalın, Aslı’yı vapura bindirdiğini söyleyerek ona zaman kazandırdı. Aslı atkısını bilerek korkuluğa bağladı; herkes suya bakarken servis kapısından çıktı. Kapı kaydı ve kendi ses notu bu yolu doğruluyor. Rıza’nın yük aracı aynı dakikalarda iskeledeydi; Aslı’nın araştırdığı kayıtlar hâlâ açıklığa kavuşmadı.',
    hints:['00.12 seferi iptal edilmişti. Atkının bağlanmış olması neyi düşündürüyor?','Servis kapısının açıldığı dakika ile Aslı’nın ses notunu eşleştir.'],
    evidence:[
      {kind:'image',tag:'OLAY YERİ',title:'Kırmızı atkı',brief:'Rüzgârın bırakamayacağı bir düğüm.',image:'./assets/son-vapur.webp',detail:'Atkı korkuluğa iki kez dolanıp sıkı bir denizci düğümüyle bağlanmış.'},
      {kind:'phone',tag:'TANIK İFADESİ',title:'Görevli Yalın',brief:'“Onu bizzat bindirdim.”',messages:[['Yalın','Aslı’yı 00.12 vapuruna bizzat bindirdim.'],['Soruşturma','Turnikeden geçti mi?'],['Yalın','Evet, gözümün önünde.']]},
      {kind:'note',tag:'SEFER PANOSU',title:'Olmayan sefer',brief:'Resmî iptal kaydı.',note:'23.55  •  SİS UYARISI\n00.12 seferi İPTAL\nSon sefer: 23.42',detail:'Sefer 17 dakika önce iptal edilmişti. Yalın bunu görev yerinde biliyordu.'},
      {kind:'note',tag:'TURNİKE LOGU',title:'Kapanan çıkış',brief:'Son biniş 23.58.',note:'23.58  •  Turnike kapandı\n00.12  •  Geçiş: 0',detail:'Aslı vapura binmedi. Fakat turnike iskeleden ayrılmanın tek yolu değil.'},
      {kind:'image',tag:'YENİ İZ',title:'Servis kapısı',brief:'Kilit dilinde kırmızı bir lif.',image:'./assets/vapur-servis.webp',detail:'Bakım koridorunun kapısında atkıyla aynı renkte bir yün lifi var. Kapı dışarıdan görünmüyor.'},
      {kind:'note',tag:'KAPI KAYDI',title:'İki geçiş',brief:'Yalın’ın kartı, ardından içeriden açılış.',note:'00.04  •  YALIN-03 ile açıldı\n00.07  •  İçeriden çıkış\n00.08  •  Kapı kilitlendi',detail:'Yalın’ın kartı bir kaçış yolu açmış olabilir. Ama Aslı’nın o yoldan geçtiğini başka bir kanıt doğrulamalı.'},
      {kind:'phone',tag:'SES NOTU / DÖKÜM',title:'Aslı’nın izi',brief:'00.09’da Selin’e gönderildi.',messages:[['Aslı · 00.09','Atkıyı bıraktım. Servis kapısından çıktım. Beni vapurda arayacaklar.'],['Selin','Güvende misin?'],['Aslı','Şimdilik. Yük defterini bulmam gerek.']]},
      {kind:'note',tag:'YÜK KAYDI',title:'İkinci gizem',brief:'Rıza’nın aracı neden oradaydı?',note:'00.05  •  RIZA / Yük aracı\nÇıkış kapısı: BATI\nYük listesi: SİLİNMİŞ',detail:'Aslı kaçmış; fakat araştırdığı silinen yük listesi yeni bir soruyu açık bırakıyor.'}
    ]
  },
  {
    id:'bos-cerceve', number:'02', time:'02.18', title:'Boş Çerçeve', subtitle:'Küratörün kartı suçlu görünüyor. Eser daha sonra kayboldu.', image:'./assets/bos-cerceve.webp', duration:'8–10 dk',
    lead:'Müzedeki nadir bir fotoğraf sabah yoktu. Alarm çalmamıştı. Küratör Seda’nın kartı önce sensörü susturmuş, sonra depoya girmişti. Bu kolay bir cevap gibi görünüyor.',
    question:'Orijinal eseri kim çıkardı?', suspects:[['Nehir','Restoratör'],['Eren','Gece güvenliği'],['Seda','Sergi küratörü']], answer:0,
    secondQuestion:'Alarm neden hırsızlık anında çalmadı?', secondOptions:['Seda’nın onaylı bakım işlemi nedeniyle','Güvenlik elektriği kestiği için','Çerçevede hiç sensör bulunmadığı için'], secondAnswer:0,
    reveal:'Seda, onaylı koruma işlemi için orijinali 19.05’te depoya taşıyıp sergiye bir kopya bıraktı. 21.00’de gördüğü kopyaydı. Bakım modu alarmı susturdu, fakat bu hırsızlık değildi. Nehir 21.37’de depoya girip orijinali restorasyon sandığına koydu. Mor eldiven izi ve çıkış görüntüsü bu ikinci hareketi birbirine bağlıyor.',
    hints:['Seda’nın kart hareketi, eserin çalındığı an olmak zorunda değil.','Koruma emrindeki mühür numarasını Nehir’in çıkardığı sandıkla karşılaştır.'],
    evidence:[
      {kind:'image',tag:'GALERİ · SABAH',title:'Boş çerçeve',brief:'Cam sağlam, alarm sessiz.',image:'./assets/bos-cerceve.webp',detail:'Eser dikkatle çıkarılmış. Cam kırılmamış.'},
      {kind:'phone',tag:'İFADELER',title:'Son kontrol',brief:'Üç kişi, üç ayrı saat.',messages:[['Seda','21.00’de galeriyi kontrol ettim. Çerçevede fotoğraf vardı.'],['Eren','Vardiyam 22.00’de başladı.'],['Nehir','Bugün restorasyon yapmadım.']]},
      {kind:'note',tag:'SENSÖR KAYDI',title:'Bakım modu',brief:'Küratör erişimi.',note:'18.42  •  Sensör 07\nBakım modu AÇIK\nYetki: KÜRATÖR',detail:'Sensör bir insan tarafından susturulmuş.'},
      {kind:'note',tag:'DEPO GEÇİŞİ',title:'Seda’nın kartı',brief:'19.05–19.13 arası.',note:'19.05  •  Arka depo\nKart: KÜRATÖR-01\nÇıkış: 19.13',detail:'İlk bakışta hırsızlık gibi. Ancak bu geçişin resmî bir nedeni var mı?'},
      {kind:'note',tag:'KORUMA EMRİ',title:'Gizli değişim',brief:'Orijinal için onaylı taşıma.',note:'18.20  •  İmzalı koruma emri\nOrijinal → Depo / Mühür 41\nSergi → KOPYA',detail:'Seda hırsızlığı değil, onaylı yer değişimini yaptı. 21.00’de çerçevede gördüğü şey kopyaydı.'},
      {kind:'image',tag:'RESTORASYON LABI',title:'Boş çekmece',brief:'Mühür 41 kırılmış.',image:'./assets/muze-lab.webp',callouts:[['66%','42%','ORİJİNAL YOK'],['26%','86%','MOR ELDİVEN']],detail:'Koruma çekmecesi açık; kırılmış mühürde mor eldiven kalıntısı var. Tezgahtaki baskı yalnızca referans kopya.'},
      {kind:'note',tag:'İKİNCİ GEÇİŞ',title:'Nehir’in sandığı',brief:'21.37’de depo; 21.49’da çıkış.',note:'21.37  •  NEHİR-05 / Depo\n21.49  •  Sandık 41 / Çıkış\nGece restorasyon izni: YOK',detail:'Sandık numarası koruma emrindeki mühürle aynı. Nehir restorasyon yapmadığını söylemişti.'},
      {kind:'phone',tag:'GÜVENLİK FOTOĞRAFI',title:'Saklanan kare',brief:'Çıkış kamerasından not.',messages:[['Eren','21.49 kareyi büyüttüm. Nehir, mühür 41 yazılı sandığı taşıyor.'],['Soruşturma','Sevk formu?'],['Eren','Sistemde yok.']]}
    ]
  },
  {
    id:'ucuncu-anahtar', number:'03', time:'01.06', title:'Üçüncü Anahtar', subtitle:'Kart binanın görevlisine ait. Gece onu kim taşıyordu?', image:'./assets/ucuncu-anahtar.webp', duration:'8–10 dk',
    lead:'Yazar Cem’in mühürlediği daireden tek nüsha el yazması kayboldu. Kapı zorlanmamış. Acil anahtar dolabı bina görevlisinin kartıyla açıldı. Kartın sahibi ile onu kullanan kişi aynı mı?',
    question:'El yazmasını kim aldı?', suspects:[['Leyla','Komşu'],['Ozan','Bina görevlisi'],['Pelin','Editör']], answer:2,
    secondQuestion:'Daireye nasıl girdi?', secondOptions:['Leyla’nın anahtarını kopyaladı','Ozan’ın kayıp kartıyla acil anahtarı aldı','Mührü bozmadan pencereden girdi'], secondAnswer:1,
    reveal:'Pelin, Ozan’ın 00.46’da kaybolan kartıyla acil anahtarı dolaptan aldı. Asansör görüntüsündeki bordo dosya, Cem’in Pelin’e verdiği tekil editör dosyasıyla eşleşiyor. Ozan o sırada dışarıdaki arıza çağrısında kayıtlıydı. Pelin el yazmasını almak için üçüncü anahtarı kullandı; yeniden yapıştırılan mühür bu girişin iziydi.',
    hints:['Kart sahibinin nerede olduğunu bağımsız bir kayıtla doğrula.','Asansör karesindeki bordo dosya kime ait?'],
    evidence:[
      {kind:'image',tag:'KORİDOR',title:'Sessiz kapı',brief:'Mühür yeniden yapıştırılmış.',image:'./assets/ucuncu-anahtar.webp',detail:'Kapı sağlam. Bir anahtar kullanılmış olmalı.'},
      {kind:'phone',tag:'MESAJLAR',title:'Leyla’nın anahtarı',brief:'İki anahtar sanılıyordu.',messages:[['Cem','Yedek anahtar sende, değil mi?'],['Leyla','Evet. Evden çıkmadım.'],['Cem','Başka anahtar yok sanıyordum.']]},
      {kind:'note',tag:'DOLAP KAYDI',title:'Acil anahtar',brief:'01.06 erişimi.',note:'01.06  •  Dolap açıldı\nKart: GÖREVLİ-02\nAnahtar: Daire 4',detail:'Kart Ozan’a ait. Kimin elinde olduğu henüz belli değil.'},
      {kind:'note',tag:'ASANSÖR',title:'Dördüncü kat',brief:'Dokuz dakikalık yolculuk.',note:'01.08  •  Bodrum → Kat 4\n01.17  •  Kat 4 → Bodrum',detail:'Acil anahtarı alan kişi bu yolculuğu yapmış olabilir.'},
      {kind:'phone',tag:'ARIZA HATTI',title:'Kayıp kart',brief:'Ozan’ın 00.46 çağrısı.',messages:[['Ozan · 00.46','Kartım kayıp. Dış trafodaki arızaya gidiyorum.'],['Operatör · 01.11','Teknisyen Ozan, trafo başında görüldü.'],['Ozan','Kartı kapatın.']]},
      {kind:'image',tag:'ASANSÖR KAMERASI',title:'Bordo dosya',brief:'01.08 karesinde belirgin.',image:'./assets/anahtar-asansor.webp',callouts:[['25%','50%','KÖŞEDEKİ YIRTIK']],detail:'Kamera yüzü görmüyor; eldeki bordo dosyanın sol köşesinde tekil yuvarlak bir yırtık var.'},
      {kind:'note',tag:'EDİTÖR TESLİMİ',title:'Aynı yırtık',brief:'Pelin’e verilen dosya.',note:'Pelin’e teslim: BORDO DOSYA\nSol üst köşe: yuvarlak yırtık\nİçerik: sözleşme taslağı',detail:'Cem’in teslim fotoğrafındaki yırtık, asansördeki dosyayla eşleşiyor.'},
      {kind:'phone',tag:'SON MESAJ',title:'Acele baskı',brief:'Gece gelen talep.',messages:[['Pelin · 00.39','Metni sabah baskıya sokmam gerek.'],['Cem','Onay vermedim. Eve dönünce konuşuruz.'],['Pelin','O zaman geç kalacağız.']]}
    ]
  },
  {
    id:'emanet-dolabi', number:'04', time:'06.24', title:'Emanet Dolabı', subtitle:'Yalan söylenen teslim ve birbirine benzeyen iki zarf.', image:'./assets/emanet-dolabi.webp', duration:'8–10 dk',
    lead:'Mimar Duru, bir zarfı istasyon dolabına bıraktı. Ortağı Arda, onu 06.10’da aldığını söylüyor. Kayıtlar bunu yalanlıyor. Asıl soru: zarf şimdi kimde?',
    question:'Zarfı aldığını söyleyerek yalan söyleyen kim?', suspects:[['Arda','Duru’nun ortağı'],['İpek','Duru’nun kardeşi'],['Tuna','İstasyon çalışanı']], answer:0,
    secondQuestion:'Asıl zarf şimdi kimin elinde?', secondOptions:['Arda’nın','İpek’in','Tuna’nın'], secondAnswer:1,
    reveal:'Arda’nın 06.10 iddiası imkânsız: dolap ancak 06.18’de açıldı. Tuna, Duru’nun talimatıyla gerçek zarfı güvenli kasaya taşıdı; İpek 06.22’de mühür numarasını doğrulayarak teslim aldı. Arda’nın perondaki fotoğrafında görünen boş zarf farklı bir mühür taşıyor. Yalanı, gerçek zarfın yerini öğrenmek için kurdu.',
    hints:['Arda’nın söylediği saate bak, sonra dolabın tek açılışını bul.','Asıl zarfın mühür numarasını güvenli kasa tesliminde izle.'],
    evidence:[
      {kind:'image',tag:'İSTASYON',title:'Açık dolap',brief:'Fotoğraf olaydan sonra çekildi.',image:'./assets/emanet-dolabi.webp',detail:'06.24’te raf boş. Fotoğraf tek başına kimin aldığını söylemez.'},
      {kind:'phone',tag:'MESAJLAR',title:'Arda’nın iddiası',brief:'“06.10’da aldım.”',messages:[['Arda','Zarfı 06.10’da dolaptan aldım.'],['Duru','Benim trenim 06.15’te. Emin misin?'],['Arda','Evet. Perondaydım.']]},
      {kind:'note',tag:'DOLAP LOGU',title:'Tek açılış',brief:'06.10’da kapak kapalı.',note:'05.50  •  Kilitlendi\n06.18  •  Açıldı\n06.24  •  Kapak açık',detail:'Arda’nın anlattığı teslim gerçekleşmedi.'},
      {kind:'note',tag:'TESLİM TUTANAĞI',title:'Güvenli kasa',brief:'Tuna’nın ilk hareketi.',note:'06.18  •  Zarf alındı\nGörevli: Tuna\nYer: Güvenli kasa',detail:'Tuna gerçek zarfı dolaptan aldı. Hikâye burada bitmiyor.'},
      {kind:'image',tag:'YENİ FOTOĞRAF',title:'İki zarf',brief:'Aynı kâğıt, farklı mühür.',image:'./assets/dolap-zarflar.webp',callouts:[['18%','66%','MÜHÜR 81'],['57%','78%','BOŞ · 18']],detail:'Arda’nın fotoğrafındaki zarfın ağzı boş ve damgası 18. Gerçek zarfın mühürü 81.'},
      {kind:'note',tag:'MÜHÜR KAYDI',title:'81 numara',brief:'Duru’nun sabah notu.',note:'05.49  •  Asıl zarf\nMühür: 81\nAçma yetkisi: İPEK',detail:'Mühür numarası, benzer görünen zarfları ayırıyor.'},
      {kind:'note',tag:'KASA ÇIKIŞI',title:'Son teslim',brief:'06.22’de imza.',note:'06.22  •  Mühür 81\nTeslim alan: İPEK\nKimlik doğrulandı',detail:'Tuna saklamadı; asıl zarfı yetkili kişiye teslim etti.'},
      {kind:'phone',tag:'SON MESAJ',title:'Neden yalan?',brief:'Arda’nın merakı.',messages:[['Arda · 06.26','Zarf bende. İçindekilerin kopyasını da aldım.'],['İpek','Mühür numarasını söyle.'],['Arda','...']]}
    ]
  }
];
