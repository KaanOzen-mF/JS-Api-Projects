//Take the reference element of HTML
const movieSearchInput = document.getElementById("movie-search");
const searchButton = document.getElementById("search-button");
const iconContainer = document.getElementById("icon-container");

//Fetch API function, it needs movie name as parameter
const fetchApiData = async (movieName) => {
  //Try fetch API
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=cf0fdf8&s=${movieName}&type=movie`
    );
    //If response is not okey, it throw fail error
    if (!res.ok) {
      throw new Error("Failed to fetch data from the server.");
    }
    //If any data can not response or data is empty it sends error
    const movieData = await res.json();
    if (movieData.length === 0) {
      console.log("Can not find any movie");
    }
    return movieData.Search;
  } catch (err) {
    //If catch any error it throw the error
    console.log("Error fetching API data:", err);
    return [];
  }
};

// Add an event listener to the search button
searchButton.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const inputValue = movieSearchInput.value; // Get the value from the input field

  // Reset the input field after search
  movieSearchInput.value = "";

  // Fetch movie data and handle the response
  const movieData = await fetchApiData(inputValue);

  // Check if movieData contains Search results
  const movieNames = movieData.map((movie) => {});
  console.log(movieNames);
});
