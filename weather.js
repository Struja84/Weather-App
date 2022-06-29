const api1 = `73c2db8f4254bcb0c9d41d4e3d67a686`;                        // API  ENG // SRB  API
const api2 = `776537b1e7b4ac395c6d80afee24294e`;                        // API  ENG // SRB  API
const wrapper = document.getElementById(`wrapper`);                    // WHOLE PAGE ENG //  SRB Celaa stranica hvatanje putem ID-ja

const submit = document.getElementById(`submit`);                      // BUTTON ENG // SRB Dugme
const star = document.getElementById(`star`);
const geoLocation = document.getElementById(`location`);

let currentCity = document.getElementById(`search`).value;

const deg = document.getElementById(`deg`);                            // Paragraph with degres ENG  //  SRB Paragrafa sa stepenima
const min_max = document.getElementById(`max_min`);
const locationCity = document.getElementById(`locationCity`);          // ID of location and state ENG // SRB ID lokacija i drzava

const currentWeather = document.getElementById(`currentWeather`);      // currentWeather ENG //  SRB Trenutno Vreme
const currentTime = document.getElementById(`currentTime`);
const timeClock = document.getElementById(`time`);
const date = document.getElementById(`date`);

const detailsOfCity = document.getElementById(`detailsOfCity`);
const weatherIcon = document.getElementById(`weatherIcon`);

const uvIndex = document.getElementById(`uvIndex`);
const wind = document.getElementById(`wind`);
const humidity = document.getElementById(`humidity`);

const pressure = document.getElementById(`pressure`);
const visibility = document.getElementById(`visibility`);
const feelslike = document.getElementById(`feelslike`);

const favs = document.getElementById(`favs`);
const wrongFormat = document.getElementById(`wrongFormat`);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weeks = ['Sun', 'Mon', 'The', 'Wed', 'Thu', 'Fri', 'Sat'];

window.onload = () => {
    // On load page focus on input
    document.getElementById(`search`).focus();
}

let favoriteCity = JSON.parse(localStorage.getItem('favoriteCity')) || [];

function saveFavorite() {
    let currentCity = document.getElementById(`search`).value;

    const fav = {
        name: currentCity,
    };
    console.log(fav.name);

    favoriteCity.push(fav);
    favoriteCity.splice(5);

    localStorage.setItem('favoriteCity', JSON.stringify(favoriteCity));
    currentCity = ``;
};

favoriteCity.map((favorite) => {
    let city = ``;
    city += `<li><strong class="favCityName">${favorite.name}</strong></span><img src="images/x.png" id="x" class="x"></li>`;
    favs.innerHTML += city;
});

const x = document.querySelectorAll(`.x`);
const favCityName = document.querySelectorAll(`.favCityName`);

for (let i = 0; i < favCityName.length; i++) {
    favCityName[i].addEventListener(`click`, function(e) {
        // console.log(e.target.textContent);
        currentCity = e.target.textContent;
        requestCityData();
        requestCityDataApi2();
    });
}

function deleteCity(e) {
    for (let i = 0; i < favoriteCity.length; i++) {
        if(e.currentTarget.parentNode.firstChild.textContent == favoriteCity[i].name) {
            console.log(e.currentTarget.parentNode.firstChild.textContent);
            const index = favoriteCity.indexOf(favoriteCity[i]);
            console.log(favoriteCity.indexOf(favoriteCity[i]));

            if (index > -1) {
                favoriteCity.splice(index, 1);
                updateFavoriteList();
            }

            localStorage.setItem('favoriteCity', JSON.stringify(favoriteCity));
        }
    }
};

for(i = 0; i < x.length;i++) {
    x[i].addEventListener('click', function(e) {
        deleteCity(e);
    }
)};

// On click save city in Local Storage as favorite city

star.addEventListener(`click`, function(e) {
    e.preventDefault();
    wrongFormat.style.display = 'none';
    currentCity = document.getElementById(`search`).value;

    if(currentCity == '') {
        wrongFormat.style.display = 'block';
        wrongFormat.textContent = `Input is empty`;
    } else {
        if(!regExInput.test(currentCity)) {
            wrongFormat.textContent = `Incorrect format search`;
            wrongFormat.style.display = 'block';
        } else {
            wrongFormat.style.display = 'none';
            if(favoriteCity.length == 0) {
                saveFavorite();
                updateFavoriteList();
            }
        
            if(favoriteCity.length == 5) {
                wrongFormat.style.display = 'block';
                wrongFormat.textContent = `Favorites full!`;
            } else {
                wrongFormat.style.display = 'none';
                if (favoriteCity.some(city => city.name === currentCity)) {
                    wrongFormat.style.display = 'block';
                    wrongFormat.textContent = `City is in favorites`;
                } else {
                    saveFavorite();
                    updateFavoriteList();
                    wrongFormat.style.display = 'none';
                }
            }
        }
    }
    document.getElementById(`search`).value = ``;
    document.getElementById(`search`).focus();
});

// Submit vector for getting data after typing in input field

let regExInput = /^[A-Z][a-z]+( [a-zA-Z0-9_]+)*$/;

submit.addEventListener(`click`, function(e) {
    currentCity = document.getElementById(`search`).value;
    e.preventDefault();
    currentWeather.style.animation = `none`;
    currentTime.style.animation = `none`;
    if(currentCity == '') {
        wrongFormat.style.display = 'block';
        wrongFormat.textContent = `Input is empty`;
    } else {
        if(!regExInput.test(currentCity)) {
            wrongFormat.textContent = `Incorrect format search`;
            wrongFormat.style.display = 'block';
        } else {
            console.log('Ispravan format');
            wrongFormat.style.display = 'none';
            requestCityData();
            requestCityDataApi2();
            document.getElementById(`search`).focus();
            currentWeather.style.animation = `slideFromLeft 3s normal`;
            currentTime.style.animation = `slideFromRight 3s normal`;
        }
    }
});

function requestCityData() {
    // console.log(currentCity);
 
    fetch(`http://api.weatherstack.com/current?access_key=${api2}&query=${currentCity}`).then(response => response.json()).then(data => {
        console.log(data);

        // Check if city exists

        if(data.success == false) {
            wrongFormat.textContent = `City doesn't exist!`;
            wrongFormat.style.display = 'block';
        } else {
            wrongFormat.style.display = 'none';

            // Displaying divs after calling function on click
    
            currentTime.style.display = `flex`;
            currentWeather.style.display = `flex`;
            detailsOfCity.style.display = `grid`;
    
            deg.textContent = data.current.temperature + "°C";
            locationCity.textContent = data.location.name + ', ' + data.location.country;
    
            // Geting current date for current city
    
            let time = data.location.localtime.split(' ');
            let localTime = time[1];
            timeClock.textContent = localTime;
            let currentDate = new Date(time[0]);
    
            const week = weeks[currentDate.getDay()];
            const dayOfMonth = currentDate.getDate();
            const month = months[currentDate.getMonth()];
            date.textContent = `${week}, ${dayOfMonth}.${month}`;
    
            // Details of city
    
            let uvIndexString = ``;
    
            if (data.current.uv_index < 3) {
                uvIndexString = 'Low';
            }
            if (data.current.uv_index > 2 && data.current.uv_index < 6) {
                uvIndexString = 'Medium';
            }
            if (data.current.uv_index > 5 && data.current.uv_index < 8) {
                uvIndexString = 'High';
            }
            if (data.current.uv_index > 7 && data.current.uv_index < 11) {
                uvIndexString = 'Very high';
            }
            if (data.current.uv_index == 11) {
                uvIndexString = 'Extreme';
            }
    
            uvIndex.textContent = uvIndexString;
            wind.textContent = data.current.wind_speed + 'km/h';
            humidity.textContent = data.current.humidity + '%';
    
            pressure.textContent = data.current.pressure + "mb";
            visibility.textContent = data.current.visibility + "km";
            feelslike.textContent = data.current.feelslike + "°C";
    
            // Check if is a day or night, and display icon/background day or night

            if(data.current.is_day == `yes`) {
                console.log(`It is daay`);
                checkWeatherDescDay();
            } else {
                console.log(`Is night`);
                checkWeatherDescNight();
            }
        }
    }).catch((err) => console.log(err));


    document.getElementById(`search`).value = ``;
};

function updateFavoriteList() {
    favs.innerHTML = ``;
    favoriteCity.map((city) => {
        let cityList = ``;
        cityList += `<li><strong class="favCityName">${city.name}</strong></span><img src="images/x.png" id="x" class="x"></li>`;
        favs.innerHTML += cityList;
        // console.log(favoriteCity);
    });
    const x = document.querySelectorAll(`.x`);
    const favCityName = document.querySelectorAll(`.favCityName`);
    
    for(i = 0; i < x.length;i++) {
        x[i].addEventListener('click', function(e) {
            deleteCity(e);
    })}

    for (let i = 0; i < favCityName.length; i++) {
        favCityName[i].addEventListener(`click`, function(e) {
            console.log(e.target.textContent);
            currentCity = e.target.textContent;
            requestCityData();
            requestCityDataApi2();
        });
    }
}

// Geolocation

let user_loc = navigator.geolocation; // for allowing browser to get current location
let latitude = 0;
let longitude = 0;
      

geoLocation.addEventListener(`click`, function(e) {
    e.preventDefault();
    currentWeather.style.animation = `none`;
    currentTime.style.animation = `none`;

    // If we allowed browser to get our location call function success

    if(user_loc) {
        user_loc.getCurrentPosition(success);
    } else {
        alert("Your browser doesn't support geolocation API");
    }

    function success(data) {
        latitude = data.coords.latitude;
        longitude = data.coords.longitude;
        currentLocationData();
    }

    function currentLocationData() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api1}`).then(response => response.json()).then((data) => {

            let max_deg = Math.ceil(data.main.temp_max - 273.15);
            let min_deg = Math.floor(data.main.temp_min - 273.15);
            min_max.textContent = `${max_deg}°C / ${min_deg}°C`;

            // Converting serbian latin letters in english latin for getting data from first API

            const letters = {
                "ž": "z",
                "Ž": "Z",
                "š": "s",
                "Š": "S",
                "č": "c",
                "Č": "C",
                "đ": "dj",
                "Đ": "Dj"
            };

            let rexText = data.name;
            rexText = rexText.replace(/[zžsšcčdjđZŽSŠCČDJĐ\\]/g, ch => letters[ch] || ch);
            currentCity = `${rexText}, ${data.sys.country}`;
            requestCityData();
            wrongFormat.style.display = 'none';
            currentWeather.style.animation = `slideFromLeft 3s normal`;
            currentTime.style.animation = `slideFromRight 3s normal`;
        }).catch((err) => console.log(err));
    }
    document.getElementById(`search`).focus();
});

function requestCityDataApi2() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${api1}`).then((response) => response.json()).then((data) => {
        // console.log(data);
        let max_deg = Math.ceil(data.main.temp_max - 273.15);
        let min_deg = Math.floor(data.main.temp_min - 273.15);
        min_max.textContent = `${max_deg}°C / ${min_deg}°C`;
    }).catch((err) => console.log(err));
}

function checkWeatherDescDay() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${api1}`).then((response) => response.json()).then((data) => {
        console.log(data);
        let weatherDesc = data.weather[0].main;
        if(weatherDesc == `Clear`) {
            wrapper.style.backgroundImage = `url(images/3.jpg)`;
            weatherIcon.src = `images/clear-day.svg`;
            currentWeather.style.color = '';
            currentTime.style.color ='';
        }
        if(weatherDesc == `Clouds`) {
            wrapper.style.backgroundImage = `url(images/Partly_cloud.jpg)`;
            weatherIcon.src = `images/partly-cloudy-day.svg`;
            currentWeather.style.color = '';
            currentTime.style.color ='';
        }
        if(weatherDesc == `Rain`) {
            wrapper.style.backgroundImage = `url(images/2.jpg)`;
            weatherIcon.src = `images/overcast-rain.svg`;
            currentWeather.style.color = '';
            currentTime.style.color ='';
        }
        if(weatherDesc == `Snow`) {
            wrapper.style.backgroundImage = `url(images/4.jpg)`;
            weatherIcon.src = `images/overcast-snow.svg`;
            currentWeather.style.color = '';
            currentTime.style.color ='';
        }
        if(weatherDesc == `Dust` || weatherDesc == 'Haze') {
            wrapper.style.backgroundImage = `url(images/Haze.jpg)`;
            weatherIcon.src = `images/overcast-haze.svg`;
            currentWeather.style.color = '';
            currentTime.style.color ='';
        }
    }).catch((err) => console.log(err));
}

function checkWeatherDescNight() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${api1}`).then((response) => response.json()).then((data) => {
        console.log(data);
        let weatherDesc = data.weather[0].main;
        if(weatherDesc == `Clear`) {
            wrapper.style.backgroundImage = `url(images/clear_night.jpg)`;
            weatherIcon.src = `images/clear-night.svg`;
            currentWeather.style.color = 'white';
            currentTime.style.color ='white';
        }
        if(weatherDesc == `Clouds`) {
            wrapper.style.backgroundImage = `url(images/night_cloud.jpg)`;
            weatherIcon.src = `images/partly-cloudy-night.svg`;
            currentWeather.style.color = 'white';
            currentTime.style.color ='white';
        }
        if(weatherDesc == `Rain`) {
            wrapper.style.backgroundImage = `url(images/rain_night.jpg)`;
            weatherIcon.src = `images/partly-cloudy-night-rain.svg`;
            currentTime.style.color ='white';
            currentWeather.style.color = 'white';
        }
        if(weatherDesc == `Snow`) {
            wrapper.style.backgroundImage = `url(images/snow_night.jpg)`;
            weatherIcon.src = `images/snow1.svg`;
            currentWeather.style.color = 'white';
            currentTime.style.color ='white';
        }
        if(weatherDesc == `Dust` || weatherDesc == 'Haze') {
            wrapper.style.backgroundImage = `url(images/Haze_night.jpg)`;
            weatherIcon.src = `images/dust.svg`;
            currentWeather.style.color = 'white';
            currentTime.style.color ='white';
        }
    }).catch((err) => console.log(err));
}

// Responsive JS

const form = document.getElementsByTagName(`form`);
const search = document.getElementById(`search`);
const locationResponsive = document.getElementById(`location`);
const searchCity = document.getElementById(`searchCity`);
const displayWeather = document.getElementById(`displayWeather`);
const divDetails = document.getElementsByClassName(`color`);
const lastChild = document.getElementById(`lastChild`);
const middleChild = document.getElementById(`middleChild`);

const city = document.getElementsByClassName(`city`);
// const cityRight = document.getElementsByClassName(`cityRight`);
// console.log(city);

// console.log(divDetails);

window.addEventListener(`load`, responsive);
window.addEventListener(`resize`, responsive);

function responsive() {
    const width = window.innerWidth;
    console.log(width);
    if(width < 1360) {
        for (let i = 0; i < city.length; i++) {
            city[i].style.display = `none`;  
        }
    } else {
        for (let i = 0; i < city.length; i++) {
            city[i].style.display = ``;  
        }
    }

    if(width < 950) {
        // Responsive input
        form[0].style.width = `100%`;
    } else {
        // Responsive input
        form[0].style.width = ``;
    }

    if(width < 665) {
        for (let i = 0; i < city.length; i++) {
            city[i].style.display = `inline`;
        }
        // Responsive DisplayWeather
        min_max.style.fontSize = `1.5em`;
        locationCity.style.fontSize = `2em`;
        displayWeather.style.gridTemplateColumns = `1fr`;
        displayWeather.style.height = `36vh`;
        displayWeather.style.marginBottom = `2em`;

        // Responsive input
        form[0].style.display = `grid`;
        form[0].style.gridTemplateColumns = `1fr 1fr 1fr`;

        search.style.gridColumn = `span 4`;
        search.style.width = `15em`;
        search.style.margin = `0 auto`;

        submit.style.display = `flex`;
        submit.style.justifyContent = `flex-end`;

        locationResponsive.style.display = `flex`;
        locationResponsive.style.justifyContent = `flex-start`;

        searchCity.style.height = `12vh`;

        wrongFormat.style.width = `40vw`;
        wrongFormat.style.padding = `0.4em`;
        wrongFormat.style.top = `-2.1em`;

        // Responsive Details
        detailsOfCity.style.gridTemplateColumns = `1fr`;
        detailsOfCity.style.height = `75vh`;
        favs.style.padding = `1em`;
        
        for (let i = 0; i < divDetails.length; i++) {
            divDetails[i].style.flexDirection = `row`;
            divDetails[i].style.borderRight = `none`;
            divDetails[i].style.borderBottom = `1px solid white`;
            divDetails[i].style.alignItems = `center`;
        }

        middleChild.style.flexDirection = ``;
        middleChild.style.padding = `0.5em`;
        lastChild.style.borderBottom = `none`;
        wrapper.style.height = `133vh`;

    } else {
        // Responsive DisplayWeather
        min_max.style.fontSize = ``;
        locationCity.style.fontSize = ``;
        displayWeather.style.gridTemplateColumns = ``;
        displayWeather.style.height = ``;
        displayWeather.style.marginBottom = ``;

        // Responsive input
        form[0].style.display = ``;
        form[0].style.gridTemplateColumns = ``;

        search.style.gridColumn = ``;
        search.style.width = ``;
        search.style.margin = ``;

        submit.style.display = ``;
        submit.style.justifyContent = ``;

        locationResponsive.style.display = ``;
        locationResponsive.style.justifyContent = ``;

        searchCity.style.height = ``;

        // Responsive Details
        detailsOfCity.style.gridTemplateColumns = ``;
        detailsOfCity.style.height = ``;
        favs.style.padding = ``;

        for (let i = 0; i < divDetails.length; i++) {
            divDetails[i].style.flexDirection = ``;
            divDetails[i].style.borderRight = ``;
            divDetails[i].style.borderBottom = ``;
        }
        middleChild.style.padding = ``;
        lastChild.style.borderBottom = ``;
        wrapper.style.height = ``;
    }
}
