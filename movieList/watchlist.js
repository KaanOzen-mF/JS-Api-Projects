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
                  }<span><button class="read-more-btn">Read More</button></span>
                </p>
              </div>
            </div>
        `;

      // Append the movie element to the watchlist section
      watchlistSection.appendChild(movieElement);

      // Attach event listener to the created "Read More" buttons
      watchlistSection
        .querySelectorAll(".read-more-btn")
        .forEach((button, index) => {
          button.addEventListener("click", () => {
            // Display the full movie plot or take any desired action
            const selectedMovie = watchlistArray[index];
            openPopup(selectedMovie);
          });
        });

      // Attach event listener to the close button of the popup
      const popupCloseButton = document.getElementById("popup-close-button");
      popupCloseButton.addEventListener("click", closePopup);

      // Add event listener to the remove button
      const removeButton = movieElement.querySelector(
        ".remove-watchlist-button"
      );
      // Remove from watchlist selected movie
      removeButton.addEventListener("click", (e) => {
        const movieIndex = e.target.dataset.index;

        // Remove the movie from the watchlist array
        watchlistArray.splice(movieIndex, 1);

        // Update local storage with the modified watchlist array
        localStorage.setItem("watchlist", JSON.stringify(watchlistArray));

        // Remove the movie element from the DOM
        watchlistSection.removeChild(movieElement);
      });
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

// Function to open the pop-up and display movie details
const openPopup = (movie) => {
  const popupOverlay = document.getElementById("popup-overlay");
  const popupContent = document.getElementById("popup-content");
  const popupMovieDetails = document.getElementById("popup-movie-details");

  popupMovieDetails.innerHTML = `
    <h2>${movie.Title}</h2>
    <p><span>Release Yer:</span> ${movie.Released}</p>
    <p><span>Runtime: </span>${movie.Runtime}</p>
    <p><span>Genre: </span> ${movie.Genre}</p>
    <p><span>Director: </span>${movie.Director}</p>
    <p><span>Writer: </span>${movie.Writer}</p>
    <p><span>Actors: </span>${movie.Actors}</p>
    <p><span>Country: </span>${movie.Country}</p>
    <p><span>Awards: </span>${movie.Awards}</p>
    <p><span>IMDb Rating: </span>${movie.imdbRating}</p>
    <p><span>IMDb Votes: </span>${movie.imdbVotes}</p>
    <p><span>Box Office: </span>${movie.BoxOffice}</p>
    <p><span><u>Movie Plot</u></span></p>
    <p>${movie.Plot}</p>
  `;

  popupOverlay.style.display = "flex";

  // Close the popup if the overlay is clicked
  popupOverlay.addEventListener("click", closePopup);
};

// Function to close the pop-up
const closePopup = () => {
  const popupOverlay = document.getElementById("popup-overlay");
  popupOverlay.style.display = "none";
};
