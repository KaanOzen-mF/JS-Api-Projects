document.addEventListener("DOMContentLoaded", () => {
  const watchlistSection = document.getElementById("watchlist-section");

  // Retrieve watchlist data from local storage
  const watchlistData = localStorage.getItem("watchlist");
  const watchlistArray = JSON.parse(watchlistData);

  if (watchlistArray && watchlistArray.length > 0) {
    // Iterate through the watchlist and create HTML elements to display movie information
    watchlistArray.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("watchlist-container");

      // Create HTML structure to display movie details
      movieElement.innerHTML += `
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
                  
                <button id="watchlist-remove-btn" class="remove-watchlist-button">--</button>
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
        `;

      // Append the movie element to the watchlist section
      watchlistSection.appendChild(movieElement);
    });
  } else {
    // Handle the case when there's no watchlist data in local storage
    watchlistSection.innerHTML = `
                                <div class="alert-text">
                                    <p>Your watchlist is looking a little empty...</p>
                                    <div class="alert-button-container">
                                        <button><a href="index.html">+</a></button>
                                        <p>Let's add some movies!</p>
                                    </div>
                                </div>`;
  }
});
