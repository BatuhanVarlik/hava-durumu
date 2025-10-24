const API_KEY = '04b2b7bf589e4fadb16142603252310';
// --- API Ayarı ---
// Lütfen weatherapi.com'dan aldığınız API anahtarınızı buraya girin


// --- 1. STATE (DURUM) ---
// "Gerçeğin tek kaynağı"
let appState = {
    currentTime: new Date(),
    isLoading: false,
    error: null,
    weatherData: null 
};

// --- 2. DOM ELEMENTLERİNİ SEÇME ---
// Sadece 'statik' ve 'giriş noktası' olan elementleri seçiyoruz.
const cityInputEl = document.getElementById('city-input');
const searchButtonEl = document.getElementById('search-button');
const currentTimeEl = document.getElementById('current-time');
const contentAreaEl = document.getElementById('weather-content-area'); // <- TÜM İÇERİK BURAYA!

// --- 3. STATE GÜNCELLEME YARDIMCISI ---
// Bu fonksiyon, state'i günceller ve OTOMATİK OLARAK 'renderApp'i çağırır.
function setState(newState) {
    appState = { ...appState, ...newState };
    // Ekranı yeniden çiz!
    renderApp();
}

// --- 4. HTML OLUŞTURMA FONKSİYONLARI ---

/**
 * .map() ve .join() kullanarak hava durumu detaylarını HTML'e çevirir.
 * Bu, React'te bir "component" (bileşen) listesi render etmeye benzer.
 */
function generateWeatherDetailsHtml(current) {
    // 1. Önce veriyi .map() için uygun bir diziye dönüştürelim
    const detailsData = [
        { label: 'Hissedilen', value: current.feelslike_c, unit: '°C' },
        { label: 'Nem', value: current.humidity, unit: '%' },
        { label: 'Rüzgar', value: current.wind_kph, unit: ' km/s' },
        { label: 'Rüzgar Yönü', value: current.wind_dir, unit: '' },
        { label: 'Görüş Mesafesi', value: current.vis_km, unit: ' km' },
        { label: 'UV İndeksi', value: current.uv, unit: '' },
        { label: 'Yağış', value: current.precip_mm, unit: ' mm' }
    ];

    // 2. .map() kullanarak her objeyi bir HTML string'ine dönüştür
    const htmlArray = detailsData.map(item => {
        // Not: 'Template literals' (backticks ``) string oluşturmak için çok kullanışlıdır.
        return `
            <p class="detail-label">
                ${item.label}
                <span class="detail-value">
                    ${item.value}${item.unit ? ` ${item.unit}` : ''}
                </span>
            </p>
        `;
    });

    // 3. .join('') kullanarak tüm HTML string'lerinden oluşan diziyi tek bir string yap
    return htmlArray.join('');
}

/**
 * 'weatherData' objesini alıp tüm HTML'i oluşturan ana fonksiyon.
 */
function generateWeatherHtml(data) {
    const { location, current } = data;
    const iconUrl = `https:${current.condition.icon}`;

    // 1. Ana (weather-main) HTML'i oluştur
    const mainHtml = `
        <div class="weather-main">
            <h2 id="city-name">${location.name}, ${location.region}</h2>
            <img id="weather-icon" src="${iconUrl}" alt="${current.condition.text}">
            <p id="condition-text">${current.condition.text}</p>
            <p id="temperature">Sıcaklık <span id="temp-c">${current.temp_c}</span>°C</p>
        </div>
    `;

    // 2. Detay (weather-details) HTML'ini yardımcı fonksiyondan al (.map/.join)
    const detailsHtml = generateWeatherDetailsHtml(current);

    // 3. İkisini birleştirip tam konteyneri döndür
    return `
        <div id="weather-data-container">
            ${mainHtml}
            <div class="weather-details">
                ${detailsHtml}
            </div>
        </div>
    `;
}

// --- 5. ANA RENDER (GÖRÜNTÜLEME) FONKSİYONU ---
/**
 * 'appState'i okur ve 'contentAreaEl.innerHTML'i günceller.
 * Artık DOM'a dokunan tek yer burası (ve saat).
 */
function renderApp() {
    
    // a) Saati güncelle (Bu hala ayrı bir element)
    currentTimeEl.textContent = appState.currentTime.toLocaleTimeString('tr-TR');

    // b) 'contentAreaEl' için HTML'i 'appState'e göre belirle
    let contentHtml = '';

    if (appState.isLoading) {
        contentHtml = `<div id="loading-message"><p>Yükleniyor...</p></div>`;
    } 
    else if (appState.error) {
        contentHtml = `<div id="error-message">${appState.error}</div>`;
    } 
    else if (appState.weatherData) {
        // Başarılı: Tüm HTML'i oluşturmak için yardımcı fonksiyonu çağır
        contentHtml = generateWeatherHtml(appState.weatherData);
    } 
    else {
        // Başlangıç durumu
        contentHtml = `<div id="initial-message"><p>Lütfen bir şehir arayın.</p></div>`;
    }

    // c) Oluşturulan HTML'i sayfaya bas
    contentAreaEl.innerHTML = contentHtml;
}

// --- 6. OLAY (EVENT) FONKSİYONLARI ---

// API'den veri çekecek fonksiyon (Bu fonksiyon değişmedi)
async function fetchWeather(city) {
    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        setState({ 
            isLoading: false, 
            error: 'Lütfen main.js dosyasına API anahtarınızı girin.' 
        });
        return;
    }

    // 1. Yükleniyor durumuna geç (Bu, renderApp'i tetikler)
    setState({ isLoading: true, error: null, weatherData: null });

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no&lang=tr`);
        
        if (!response.ok) {
            // response.statusText gibi genel bir hata
            throw new Error('Şehir bulunamadı veya bir ağ hatası oluştu.');
        }

        const data = await response.json();

        if (data.error) {
            // API'den gelen spesifik hata (örn: "No matching location found.")
             throw new Error(data.error.message);
        }

        // 2. Başarılı: State'i veri ile güncelle (Bu, renderApp'i tetikler)
        setState({ isLoading: false, weatherData: data });

    } catch (err) {
        // 3. Hata: State'i hata mesajı ile güncelle (Bu, renderApp'i tetikler)
        setState({ isLoading: false, error: err.message });
    }
}

// Arama butonu tıklama olayı
function handleSearch() {
    const city = cityInputEl.value.trim(); // trim() ile boşlukları temizle
    if (city) {
        fetchWeather(city);
    } else {
        // State üzerinden hata ver
        setState({ error: 'Lütfen bir şehir adı girin.', weatherData: null });
    }
}

// --- 7. OLAY DİNLEYİCİLERİ VE BAŞLANGIÇ ---

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    
    // Arama butonuna tıklandığında 'handleSearch' fonksiyonunu çağır
    searchButtonEl.addEventListener('click', handleSearch);

    // Input'ta Enter'a basıldığında 'handleSearch' fonksiyonunu çağır
    cityInputEl.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // Saati başlatan interval
    setInterval(() => {
        // Sadece state'i güncelliyoruz, 'renderApp' gerisini halledecek.
        setState({ currentTime: new Date() });
    }, 1000);

    // Başlangıçta uygulamayı bir kez render et (ilk 'state'i ekrana çiz)
    // Bu, "Lütfen bir şehir arayın." mesajını gösterecek.
    renderApp();
});

