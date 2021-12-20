window.addEventListener("load", () => {
  let long;
  let lat;
  let API_key = `288911e985ea56be02ac3ac4323b28ec`;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let temp = data.main.temp;
          let summary = data.weather[0].main;
          let timezone = data.name;
          let icon = data.weather[0].description;

          if (icon === "few clouds") {
            icon = "FEW_CLOUDS";
          } else if (icon === "clear sky") {
            icon = "CLEAR_SKY";
          } else if (icon === "scattered clouds" || icon === "broken clouds") {
            icon = "CLOUDY";
          } else if (icon === "shower rain" || icon === "rain") {
            icon = "RAIN";
          } else if (icon === "thunderstorm") {
            icon = "WIND";
          } else if (icon === "snow") {
            icon = "SNOW";
          } else if (icon === "mist") {
            icon = "FOG";
          }

          // Set DOM Elements from API
          temperatureDegree.textContent = Math.floor(temp - 273.15);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = timezone;

          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    console.log("skycons", skycons);
    const currentIcon = icon.replace(/-g/, "_").toUpperCase();
    console.log("currentIcon", currentIcon);

    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
