const form = document.getElementById("weather-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  clearWeatherCard();

  const location = document.getElementById("location-input").value;

  const apiKey = "2800cfe3cb2cf1aae9f04fabf981ba0c";
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  document.getElementById("location-input").value = "";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      addCard(data);
    })
    .catch(function (error) {
      console.error(error);

      const weatherCard = document.getElementById("weather-card");
      const errMessage = document.createElement("h3");
      errMessage.classList.add("error-message");

      location
        ? (errMessage.innerText = `Error! No results for "${location}".`)
        : (errMessage.innerText = `Please enter a valid location.`);
      weatherCard.appendChild(errMessage);
    });
});

const addCard = (data) => {
  const weatherCard = document.getElementById("weather-card");

  weatherCard.appendChild(createCardHeader(data));

  weatherCard.appendChild(createCardData(data));
};

const createCardHeader = (data) => {
  const location = data.name;
  const country = data.sys.country;
  const { icon } = data.weather[0];
  const timestamp = timeFormatter(data.dt);

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  const title = document.createElement("h3");
  title.classList.add("card-header-title");
  title.innerText = `${location}, ${country}`;
  cardHeader.appendChild(title);

  const weatherIcon = document.createElement("span");
  weatherIcon.innerHTML = `<img class='weather-icon' src='icons/${icon}.png'>`;
  title.appendChild(weatherIcon);

  const time = document.createElement("small");
  time.classList.add("timestamp");
  time.innerText = timestamp;
  cardHeader.appendChild(time);

  cardHeader.appendChild(cardHeaderDetails(data));

  return cardHeader;
};

const cardHeaderDetails = (data) => {
  const feelsLike = data.main.feels_like;
  const { description } = data.weather[0];

  const headerDetails = document.createElement("div");
  headerDetails.classList.add("bold");

  headerDetails.innerText = `Feels like: ${Math.round(
    feelsLike
  )}℃, ${description}.`;

  return headerDetails;
};

const createCardData = (data) => {
  const cardData = document.createElement("div");
  cardData.classList.add("card-data");

  cardData.appendChild(createDataLeft(data));

  cardData.appendChild(createDataRight(data));

  return cardData;
};

const createDataLeft = (data) => {
  const { humidity, temp } = data.main;
  const { speed } = data.wind;

  const cardDataLeft = document.createElement("div");
  cardDataLeft.classList.add("card-data-left");

  createDataElement(cardDataLeft, "Temperature", Math.round(temp), "p", "℃");

  createDataElement(cardDataLeft, "Humidity", humidity, "p", "%");

  createDataElement(cardDataLeft, "Wind speed", speed, "p", "m/s");

  return cardDataLeft;
};

const createDataRight = (data) => {
  const { deg } = data.wind;
  const { visibility } = data;
  const { pressure } = data.main;

  const cardDataRight = document.createElement("div");
  cardDataRight.classList.add("card-data-right");

  visibility < 1000
    ? createDataElement(cardDataRight, "Visibility", visibility, "p", "m")
    : createDataElement(
        cardDataRight,
        "Visibility",
        visibilityCalc(visibility),
        "p",
        "km"
      );

  createDataElement(cardDataRight, "Pressure", pressure, "p", "hPa");

  createDataElement(
    cardDataRight,
    "Wind direction",
    windDirection(deg),
    "p",
    ""
  );

  return cardDataRight;
};

const createDataElement = (
  parent,
  elementName,
  elementValue,
  elementType,
  unit
) => {
  const newElement = document.createElement(`${elementType}`);
  newElement.innerText = `${elementName}: ${elementValue} ${unit}`;
  parent.appendChild(newElement);
};

const clearWeatherCard = () => {
  const weatherCard = document.getElementById("weather-card");

  while (weatherCard.firstChild) {
    weatherCard.removeChild(weatherCard.firstChild);
  }
};
