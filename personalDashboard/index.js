// References element for html
const imageAuthor = document.getElementById("author");
const coinContainer = document.getElementById("coin-container");
const coinPriceContainer = document.getElementById("coin-price-container");
const coinNameContainer = document.getElementById("coin-name-container");
const timeContainer = document.getElementById("time-container");
const weatherContainer = document.getElementById("weather-container");
const weatherIcon = document.getElementById("weather-icon");
const weatherInfo = document.getElementById("weather-info");

//Fetch API function, it needs movie name as parameter
const fetchApiData = async () => {
  //Try fetch API
  try {
    const res = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    );

    //If response is not okey, it throw fail error
    if (!res.ok) {
      throw new Error("Failed to fetch data from the server.");
    }
    //If any data can not response or data is empty it sends error
    const backgroundImage = await res.json();
    if (backgroundImage.length === 0) {
      console.log("Can not find any images");
    }
    return backgroundImage;
  } catch (err) {
    //If catch any error it throw the error
    console.log("Error fetching API data:", err);
    return null;
  }
};

// Function to make the stock data API call
const fetchStockData = async () => {
  const url = "https://api.coingecko.com/api/v3/coins/bitcoin";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Something went wrong!");
    }
    const result = await response.json();

    coinPriceContainer.innerHTML += `
    <p>🎯: $${result.market_data.current_price.usd}</p>
    <p>👆: $${result.market_data.high_24h.usd}</p>
    <p>👇: $${result.market_data.low_24h.usd}</p>
    `;

    coinNameContainer.innerHTML += `
                                  <img src=${result.image.small} > 
                                  <p>${result.id}</p>                         
    `;
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  try {
    const result = await fetchApiData();
    if (result !== null) {
      const imageUrl = result.urls.full;
      const author = result.user.name;
      // Set background image using the fetched URL
      document.body.style.backgroundImage = `url("${imageUrl}")`;
      imageAuthor.innerHTML = `Photo By: ${author}`;
    } else {
      // Set default background image URL
      document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMyNTQ1OTd8&ixlib=rb-4.0.3&q=85")`;
    }

    // Call the function to fetch stock data
    await fetchStockData();
  } catch (error) {
    console.log("An error occurred:", error);
  }
})();

//Update time function
function updateTime() {
  const today = new Date();
  const time = today.toLocaleTimeString("en-us", { timeStyle: "short" });

  timeContainer.innerHTML = `<p>${time}</p>`;
}

// Initial call to display the time
updateTime();

// Update the time every minute (60000 milliseconds)
setInterval(updateTime, 60000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b9b153eaf7f306e1eb99f4b89b104917&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })

    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIcon.innerHTML += `<img src=${iconUrl} >`;
      weatherInfo.innerHTML += `
                                      <p>Location: ${data.name}</p>
                                      <p>Temperature ${Math.floor(
                                        data.main.temp
                                      )} °C</p>
                                      <p>Feels Like: ${Math.floor(
                                        data.main.feels_like
                                      )} °C</p>
                                      <p>${data.weather[0].description}</p>
                                      <p>${Math.floor(data.wind.speed)} km/h</p>
                                      `;
      console.log(data);
    })

    .catch((err) => console.error(err));
});
