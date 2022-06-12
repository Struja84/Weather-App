const api = `73c2db8f4254bcb0c9d41d4e3d67a686`;                        // API 
const submit = document.getElementById(`submit`);                      // BUTTON
const wrapper = document.getElementById(`wrapper`);                    // WHOLE PAGE

const deg = document.getElementById(`deg`);                            // Paragraph with degres
const locationCity = document.getElementById(`locationCity`);          // ID of location and state

const currentWeather = document.getElementById(`currentWeather`);      // currentWeather

submit.addEventListener(`click`, function(e) {
  const currentCity = document.getElementById(`search`).value;
   e.preventDefault();
   console.log(currentCity);
}
