const apiKey = '05d3d022d7bb435b9fd100532252509';
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const currentTimeElement = document.getElementById('current-time');
const weatherMain = document.querySelector('.weather-main');
const weatherDetails = document.querySelector('.weather-details')

function getTime(){
    const rightNow = new Date();
    const yil = rightNow.getFullYear();
    const ay = rightNow.getMonth() + 1;
    const gün = rightNow.getDate();
    const saat = rightNow.getHours().toString().padStart(2,'0');
    const dakika = rightNow.getMinutes().toString().padStart(2,'0');;
    const saniye = rightNow.getSeconds().toString().padStart(2,'0');;
    const anlikZaman  = `${gün}/${ay}/${yil}<br>${saat}:${dakika}:${saniye}`;
    currentTimeElement.innerHTML = anlikZaman;
}
setInterval(getTime,1000);
getTime();

// Bu fonksiyon, API'den gelen veriyi dinamik olarak ekrana basar
function renderWeatherInfo(data) {
// genel bilgiler 
    document.getElementById('city-name').textContent = data.location.name;
    document.getElementById('weather-icon').src = data.current.condition.icon;
    document.getElementById('condition-text').textContent = data.current.condition.text;
    document.getElementById('temp-c').textContent = data.current.temp_c;
// detaylar 
    document.getElementById('feels-like-value').textContent = data.current.feelslike_c;
    document.getElementById('humidity-value').textContent = data.current.humidity;
    document.getElementById('wind-value').textContent = data.current.wind_kph;
    document.getElementById('wind-dir-value').textContent = data.current.wind_dir;
    document.getElementById('visibility-value').textContent = data.current.vis_km;
    document.getElementById('uv-index-value').textContent = data.current.uv;
    document.getElementById('precipitation-value').textContent = data.current.precip_mm;
 }
function clearWeatherInfo() {
    // Ana Bilgiler
    document.getElementById('city-name').textContent = '';
    document.getElementById('weather-icon').src = '';
    document.getElementById('condition-text').textContent = '';
    document.getElementById('temp-c').textContent = '';

    // Detaylar
    document.getElementById('feels-like-value').textContent = '';
    document.getElementById('humidity-value').textContent = '';
    document.getElementById('wind-value').textContent = '';
    document.getElementById('wind-dir-value').textContent = '';
    document.getElementById('visibility-value').textContent = '';
    document.getElementById('uv-index-value').textContent = '';
    document.getElementById('precipitation-value').textContent = '';
}
// Hava durumu verilerini çeken ana fonksiyon
async function fetchWeather(city) {
    clearWeatherInfo();
    weatherMain.style = 'none';
    weatherDetails.style = 'none';
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
        
        if (!response.ok) {
            throw new Error(`API isteği başarısız oldu: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);

        // Hata olmadığında, tüm verileri ekrana basmak için fonksiyonu çağır
        renderWeatherInfo(data);
        
        // weatherMain.style.display = 'flex';
        // weatherDetails.style.display = 'grid';

    } catch (error) {
        console.error('Hata:', error);
        clearWeatherInfo();
        // Hata durumunda sadece bir hata mesajı göster
        alert(`Bir hata oluştu: ${error.message}`);

    }
}

// Butona tıklandığında fonksiyonu çalıştır
searchButton.addEventListener('click', () => {
    fetchWeather(cityInput.value);
});

// Enter tuşuna basıldığında fonksiyonu çalıştır
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});




//     // Önceki içeriği tamamen temizle
//     weatherInfo.innerHTML = '';

//     // Şehir adı
//     const cityNameElement = document.createElement('h2');
//     cityNameElement.textContent = data.location.name;
//     weatherInfo.appendChild(cityNameElement);

//     // Hava durumu simgesi
//     const weatherIconElement = document.createElement('img');
//     weatherIconElement.src = data.current.condition.icon;
//     weatherIconElement.alt = data.current.condition.text;
//     weatherInfo.appendChild(weatherIconElement);

//     // Hava durumu metni
//     const conditionTextElement = document.createElement('p');
//     conditionTextElement.textContent = data.current.condition.text;
//     weatherInfo.appendChild(conditionTextElement);

//     // Sıcaklık
//     const tempElement = document.createElement('p');
//     tempElement.textContent = `Sıcaklık: ${data.current.temp_c} °C`;
//     weatherInfo.appendChild(tempElement);

//     // Hissedilen Sıcaklık
//     const feelsLikeElement = document.createElement('p');
//     feelsLikeElement.textContent = `Hissedilen Sıcaklık: ${data.current.feelslike_c} °C`;
//     weatherInfo.appendChild(feelsLikeElement);
    
//     // Nem
//     const humidityElement = document.createElement('p');
//     humidityElement.textContent = `Nem: ${data.current.humidity} %`;
//     weatherInfo.appendChild(humidityElement);

//     // Rüzgar Hızı
//     const windElement = document.createElement('p');
//     windElement.textContent = `Rüzgar Hızı: ${data.current.wind_kph} km/s`;
//     weatherInfo.appendChild(windElement);

//     // Rüzgar Yönü
//     const windDirElement = document.createElement('p');
//     windDirElement.textContent = `Rüzgar Yönü: ${data.current.wind_dir}`;
//     weatherInfo.appendChild(windDirElement);

//     // Görüş Mesafesi
//     const visibilityElement = document.createElement('p');
//     visibilityElement.textContent = `Görüş Mesafesi: ${data.current.vis_km} km`;
//     weatherInfo.appendChild(visibilityElement);

//     // UV İndeksi
//     const uvIndexElement = document.createElement('p');
//     uvIndexElement.textContent = `UV İndeksi: ${data.current.uv}`;
//     weatherInfo.appendChild(uvIndexElement);

//     // Yağış Miktarı
//     const precipElement = document.createElement('p');
//     precipElement.textContent = `Yağış: ${data.current.precip_mm} mm`;
//     weatherInfo.appendChild(precipElement);