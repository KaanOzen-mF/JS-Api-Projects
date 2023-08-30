// References element for html
const imageAuthor = document.getElementById("author");

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
// Function to make the second API call
const fetchStockData = async () => {
  const url =
    "https://twelve-data1.p.rapidapi.com/stocks?exchange=TR&format=json";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b12886698dmsh2a39c211cc8b4aep12a465jsn115794388fb5",
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
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
