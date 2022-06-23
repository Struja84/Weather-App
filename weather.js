// const api1 = `73c2db8f4254bcb0c9d41d4e3d67a686`;                        // API  ENG // SRB  API
const api2 = `d9231abe2f304d7de659f537d5440cef`;                        // API  ENG // SRB  API
const submit = document.getElementById(`submit`);                      // BUTTON ENG // SRB Dugme
const wrapper = document.getElementById(`wrapper`);                    // WHOLE PAGE ENG //  SRB Celaa stranica hvatanje putem ID-ja
const star = document.getElementById(`star`);
let currentCity = document.getElementById(`search`).value;

const deg = document.getElementById(`deg`);                            // Paragraph with degres ENG  //  SRB Paragrafa sa stepenima
const locationCity = document.getElementById(`locationCity`);          // ID of location and state ENG // SRB ID lokacija i drzava

const currentWeather = document.getElementById(`currentWeather`);      // currentWeather ENG //  SRB Trenutno Vreme
const currentTime = document.getElementById(`currentTime`);
const timeClock = document.getElementById(`time`);
const date = document.getElementById(`date`);

const detailsOfCity = document.getElementById(`detailsOfCity`);
const uvIndex = document.getElementById(`uvIndex`);
const wind = document.getElementById(`wind`);
const humidity = document.getElementById(`humidity`);

const favs = document.getElementById(`favs`);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weeks = ['Sun', 'Mon', 'The', 'Wed', 'Thu', 'Fri', 'Sat'];

function weatherCheck(data) {
    if(data.current.weather_descriptions[0] == 'Overcast') {
        wrapper.style.backgroundImage = `url(images/1.avif)`;
    }

    if(data.current.weather_descriptions[0] == 'Partly cloudy') {
        wrapper.style.backgroundImage = `url(images/Partly_cloud.jpg)`;
    }

    if(data.current.weather_descriptions[0] == 'Rain' || data.current.weather_descriptions[0] == 'Light rain shower' || data.current.weather_descriptions[0] == 'Light drizzle') {
        wrapper.style.backgroundImage = `url(images/2.jpg)`;
    }

    if(data.current.weather_descriptions[0] == 'Sunny' || data.current.weather_descriptions[0] == 'Clear') {
        wrapper.style.backgroundImage = `url(images/3.jpg)`;
    }

    if(data.current.weather_descriptions[0] == 'Light snow') {
        wrapper.style.backgroundImage = `url(images/4.jpg)`;
    }

    if(data.current.weather_descriptions[0] == 'Haze') {
        wrapper.style.backgroundImage = `url(images/Haze.jpg)`;
    }
};


let favoriteCity = JSON.parse(localStorage.getItem('favoriteCity')) || [];
console.log(favoriteCity);

for (let i = 0; i < favoriteCity.length; i++) {
    console.log(favoriteCity[i].name);
    // if()
    
}

function saveFavorite() {
    const currentCity = document.getElementById(`search`).value;

    const fav = {
        name: currentCity,
    };
    console.log(fav.name);

    // for (let i = 0; i < favoriteCity.length; i++) {
    //     if(currentCity === favoriteCity[i].name) {
    //         favoriteCity.push(fav);
    //     } else {
    //         alert(`City is already in favorites`);
    //     }
    // }

    favoriteCity.push(fav);
    favoriteCity.splice(5);

    localStorage.setItem('favoriteCity', JSON.stringify(favoriteCity));
    // alert(`USPŠNO STE SAČUVALI VAŠ SKOR! ! !`);
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
        console.log(e.target.textContent);
        currentCity = e.target.textContent;
        requestCityData();
    });
}

for(i = 0; i < x.length;i++) {
    x[i].addEventListener('click', function(e) {
        // console.log(e.target);
        // console.log(e.currentTarget.parentNode.firstChild.textContent);
        // console.log(favoriteCity);
        for (let i = 0; i < favoriteCity.length; i++) {
            // console.log(favoriteCity[i].name);
            // console.log(favoriteCity.indexOf(favoriteCity[i]));
            if(e.currentTarget.parentNode.firstChild.textContent == favoriteCity[i].name) {
                console.log(e.currentTarget.parentNode.firstChild.textContent);
                const index = favoriteCity.indexOf(favoriteCity[i]);
                console.log(favoriteCity.indexOf(favoriteCity[i]));

                if (index > -1) {
                    favoriteCity.splice(index, 1);
                    location.reload();
                }

                localStorage.setItem('favoriteCity', JSON.stringify(favoriteCity));
            }
        }
    });
}

star.addEventListener(`click`, function(e) {
    // saveFavorite();
    e.preventDefault();
    currentCity = document.getElementById(`search`).value;
    for (let i = 0; i < favoriteCity.length; i++) {
        if(currentCity === favoriteCity[i].name) {
            saveFavorite();
        } else {
            alert(`City is already in favorites`);
        }
    }
});

submit.addEventListener(`click`, function(e) {
    currentCity = document.getElementById(`search`).value;
    e.preventDefault();
    if(currentCity != '') {
        requestCityData();
    } else {
        alert(`Empty field! ! ! Type City`);
    }
});

function requestCityData(e) {
    console.log(currentCity);
    // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${api1}`).then(response => response.json()).then(data => {
    //     console.log(data);
    //     console.log(data.weather[0].main);
    //     if(data.weather[0].main == 'Clouds') {
    //         wrapper.style.backgroundImage = `url(images/1.avif)`;
    //     }
    //     if(data.weather[0].main == 'Rain') {
    //         wrapper.style.backgroundImage = `url(images/2.jpg)`;
    //     }
    //     if(data.weather[0].main == 'Clear') {
    //         wrapper.style.backgroundImage = `url(images/3.jpg)`;
    //     }
    //     if(data.weather[0].main == 'Snow') {
    //         wrapper.style.backgroundImage = `url(images/4.jpg)`;
    //     }
    // })

    fetch(`http://api.weatherstack.com/current?access_key=${api2}&query=${currentCity}`).then(response => response.json()).then(data => {
        console.log(data);

        currentTime.style.display = `flex`;
        currentWeather.style.display = `flex`;
        detailsOfCity.style.display = `grid`;

        deg.textContent = data.current.temperature + "°C";
        locationCity.textContent = data.location.name + ', ' + data.location.country;

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

        weatherCheck(data);
        console.log(data.current.weather_descriptions[0]);
    });

    document.getElementById(`search`).value = ``;
}
