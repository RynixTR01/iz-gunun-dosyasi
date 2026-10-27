# İz — Günün Dosyası

Mobil öncelikli, Türkçe dedektiflik oyunu. Beş ayrı dosyada görsel kanıtları, mesajları ve kayıtları inceleyip çelişkiyi bulursun. Günün dosyası İstanbul saatine göre her gün değişir; arşivdeki dosyalar her zaman oynanabilir.

Oyun sahne sahne ilerler. Her sahnenin Türkçe ElevenLabs anlatımı vardır; altyazı isteğe bağlı açılır. Arka plan müziği tarayıcıda üretilir, sesi ayarlanabilir ve tamamen kapatılabilir.

## Yerelde çalıştırma

Bağımlılık veya derleme adımı yoktur. Klasörde bir statik sunucu başlat:

```bash
python -m http.server 4173
```

Sonra `http://localhost:4173` adresini aç.

## İçerik

- 5 oynanabilir dosya, 21 kanıt sahnesi
- Her dosyada 2 kademeli ipucu ve gerekçeli sonuç
- Mobil uyumlu sahne akışı, görsel kanıtlar, sesli anlatım ve spoilersız paylaşım
- Sonuçlar tarayıcının yerel depolamasında saklanır

Görseller bu proje için üretilmiştir. Hikâyeler kurgusaldır. Seslendirme ElevenLabs ile üretilmiştir. Ücretsiz ElevenLabs planında oluşturulan sesler için ticari kullanım kısıtı ve atıf koşulu bulunduğundan site şu an ücretsiz kullanım içindir; ileride ücretli bir model açılmadan önce ses lisansı yeniden değerlendirilmelidir.
