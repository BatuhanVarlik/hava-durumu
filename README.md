# hava-durumu

Basit bir hava durumu uygulaması. WeatherAPI'den gerçek zamanlı hava verisi çekip şehir bazlı gösterir. HTML, CSS ve vanilla JavaScript ile yazılmıştır.

## Özellikler
- Şehir adı girilerek anlık hava durumu çekme
- Sıcaklık, hissedilen sıcaklık, nem, rüzgar, görüş mesafesi, UV indeksi ve yağış bilgileri
- Canlı saat göstergesi

## Gereksinimler
- Modern web tarayıcısı
- İnternet bağlantısı
- WeatherAPI API anahtarı (ücretsiz hesapla alınabilir)

## Kurulum ve çalıştırma (yerel)
1. Depoyu bilgisayara klonla veya dosyaları indirin.
2. Proje dizinine gidin:
   - cd "/Users/batu/Desktop/Yazılım Öğrenme serüveni/Frontend/Benim-Yaptiklarim/hava-durumu"
3. Basit bir yerel sunucu başlatın (file:// üzerinden açmak CORS/fetch sorunlarına yol açabilir):
   - Python 3 ile:
     - python3 -m http.server 5500
     - Tarayıcıda: http://localhost:5500
   - Alternatif: VS Code Live Server eklentisi veya `npx http-server -p 5500`

## API anahtarı kullanımı
- main.js içindeki `apiKey` değişkenine kendi WeatherAPI anahtarınızı yazın:
  - Dosya: `main.js`
  - Örnek: const apiKey = 'SENIN_API_KEYIN';
- Not: API anahtarını istemci tarafında tutmak güvenlidir ama açıkça paylaşmayın; üretim için bir sunucu proxy'si kullanmak daha güvenlidir.

## Hata / Troubleshooting
- "failed to fetch" hatası olursa:
  - Sayfayı doğrudan dosya (`file://`) ile açmayın; yerel sunucu kullanın.
  - Fetch URL'sinin HTTPS olduğundan emin olun (https://api.weatherapi.com/...)
  - Tarayıcı DevTools → Network sekmesinde isteği seçip Response ve Console mesajlarını kontrol edin.
  - API yanıtında "API key is invalid" veya benzeri bir hata varsa anahtarınızı kontrol edin.
  - CORS hatası görüyorsanız yerel sunucu veya proxy kullanın.
- Hala sorun devam ederse Network/Console çıktısını paylaşın.

## Dosya yapısı
- index.html — uygulama arayüzü
- stylesheet.css — stiller
- main.js — API çağrıları ve DOM manipülasyonu
- README.md — proje bilgileri

## Lisans
Kişisel kullanım ve öğrenme amaçlı. İstenirse lisans eklenebilir.

---

# English

# weather-app

A simple weather application. Fetches real-time weather data from WeatherAPI and displays it per city. Built with HTML, CSS and vanilla JavaScript.

## Features
- Fetch current weather by entering a city name
- Shows temperature, feels-like temperature, humidity, wind, visibility, UV index and precipitation
- Live clock display

## Requirements
- Modern web browser
- Internet connection
- WeatherAPI API key (can be obtained for free)

## Local setup & run
1. Clone the repo or download the files.
2. Open the project folder:
   - cd "/Users/batu/Desktop/Yazılım Öğrenme serüveni/Frontend/Benim-Yaptiklarim/hava-durumu"
3. Start a simple local server (opening via file:// may cause CORS/fetch issues):
   - With Python 3:
     - python3 -m http.server 5500
     - Open http://localhost:5500 in your browser
   - Alternatively use VS Code Live Server extension or `npx http-server -p 5500`

## Using the API key
- Put your WeatherAPI key into the `apiKey` variable in main.js:
  - File: `main.js`
  - Example: const apiKey = 'YOUR_API_KEY';
- Note: Storing the key client-side is fine for learning, avoid sharing it publicly; use a server proxy in production.

## Troubleshooting
- If you get "failed to fetch":
  - Don't open the page via file://; use a local server.
  - Ensure the fetch URL uses HTTPS (https://api.weatherapi.com/...)
  - Check DevTools → Network → Response and Console for API messages.
  - If the API response says "API key is invalid", verify your key.
  - If CORS errors appear, use a local server or proxy.
- If problems persist, share the Network/Console output.

## Project structure
- index.html — UI
- stylesheet.css — styles
- main.js — API calls and DOM logic
- README.md — project info

## License
For personal learning use. Add a license if needed.
