//Take the reference element of HTML
const movieSearchInput = document.getElementById("movie-search");
const searchButton = document.getElementById("search-button");
const iconContainer = document.getElementById("icon-container");
const movieContainer = document.getElementById("main-section");

//Fetch API function, it needs movie name as parameter
const fetchApiData = async (movieName) => {
  //Try fetch API
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=cf0fdf8&s=${movieName}&type=movie`
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
  iconContainer.style.display = "none";
  // Reset the input field after search
  movieSearchInput.value = "";
  // Fetch movie data and handle the response
  const movieData = await fetchApiData(inputValue);
  // Check if movieData contains Search results

  displayMovies(movieData);
});

const displayMovies = (movies) => {
  movieContainer.innerHTML = "";
  movies.map((movie) => {
    fetch(`http://www.omdbapi.com/?apikey=cf0fdf8&i=${movie.imdbID}`)
      .then((res) => res.json())
      .then((movie) => {
        let movieHtml = `
          <div class="movie-container" id="movie-container">
            <img
              src=${movie.Poster ? movie.Poster : ""}
              alt=""
              class="movie-poster"
            />
            <div class="movie-text-container">
              <div class="movie-title-container">
                <p class="movie-title">${movie.Title ? movie.Title : ""}</p>
                <img src="img/starIcon.png" alt="" srcset="" />
                <p class="movie-imdb">${
                  movie.imdbRating ? movie.imdbRating : ""
                }</p>
              </div>
              <div class="movie-info-container">
                <p class="movie-time">${movie.Runtime ? movie.Runtime : ""}</p>
                <p class="movie-type">${movie.Genre ? movie.Genre : ""}</p>
                <div class="watchlist-container">
                  <img src="img/watchlistIcon.png" alt="" />
                  <p>Watchlist</p>
                </div>
              </div>
              <div class="movie-explonation">
                <p>
                  ${
                    movie.Plot ? movie.Plot : ""
                  }<span><a href="">Read More</a></span>
                </p>
              </div>
            </div>
          </div>
        `;
        movieContainer.innerHTML += movieHtml;
      });
  });
};
