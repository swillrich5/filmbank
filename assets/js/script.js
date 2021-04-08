 // Header (slider) with jQuery
 $(document).ready(function(){
    $('.slider').slider(indicators=false);
  });
        
  // Carousel with jQuery
  $(document).ready(function(){
    $('.carousel').carousel({
    });
    autoplay();
    function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 3000);
  }
  });

// button that kicks off the search for the movie entered
var searchButton = document.querySelector("#searchMovies");
    // input field where user enters the movie to be searched for
var searchField = document.querySelector("#addMovie");
    // div where either list of movies and single movie detail will display
var moviesList = document.querySelector("#movies-div");
var emptyInput = document.querySelector("#addMovie");
// array to save the movie details
var moviesArray = [];
var streamingArray = [];
var movieTitle = "";
var movieReviewTitle = "";



function displayWhereItsStreaming(streamingData) {
    var column2Div = document.querySelector("#column2-div");
    var pTag = document.createElement("p");
    pTag.innerHTML = "<b>Streaming Options:</b>"
    column2Div.appendChild(pTag);
    if (Object.keys(streamingData.results).length != 0)  {
        console.log(streamingData)
        var buyStreamingProvider = document.createElement("p");
        buyStreamingProvider.style.paddingLeft = "15px";
        buyStreamingProvider.innerHTML = "<b>Purchase: </b>";
        if (streamingData.results.US.buy != undefined) {

            for (var i = 0; i < streamingData.results.US.buy.length; i++) {
                buyStreamingProvider.innerHTML += streamingData.results.US.buy[i].provider_name;
                if ((i+1) != streamingData.results.US.buy.length) {
                    buyStreamingProvider.innerHTML += ", ";
                }
            }
        } else {
            buyStreamingProvider.innerHTML += " None";
        }
        column2Div.appendChild(buyStreamingProvider);  

        var rentStreamingProvider = document.createElement("p");
        rentStreamingProvider.style.paddingLeft = "15px";
        rentStreamingProvider.innerHTML = "<b>Rent: </b>";
        if (streamingData.results.US.rent != undefined) {
            var rentStreamingProvider = document.createElement("p");
            rentStreamingProvider.style.paddingLeft = "15px";
            rentStreamingProvider.innerHTML = "<b>Rent: </b>";
            for (var i = 0; i < streamingData.results.US.rent.length; i++) {
                rentStreamingProvider.innerHTML += streamingData.results.US.rent[i].provider_name;
                if ((i+1) != streamingData.results.US.rent.length) {
                    rentStreamingProvider.innerHTML += ", ";
                }
            }
        } else {
            rentStreamingProvider.innerHTML += " None";
        }
        column2Div.appendChild(rentStreamingProvider);

        var streamingService = document.createElement("p");
        streamingService.innerHTML = "<b>Streaming Services: </b>";
        streamingService.style.paddingLeft = "15px";
        if (streamingData.results.US.flatrate != undefined) {
            streamingService.style.paddingLeft = "15px";

            for (var i = 0; i < streamingData.results.US.flatrate.length; i++) {
                streamingService.innerHTML += streamingData.results.US.flatrate[i].provider_name;
                if ((i+1) != streamingData.results.US.flatrate.length) {
                    streamingService.innerHTML += ", ";
                }
            }
        } else {
            streamingService.innerHTML += " None";
        }
        column2Div.appendChild(streamingService);
    } else {
        pTag.innerHTML += " None";
    }

}


function displayReviewButton(movieReview) {
    var column2Div = document.querySelector("#column2-div");
    var reviewButton = document.createElement("a");
    var index = 0;
    reviewButton.classList.add("btn");
    reviewButton.innerHTML = "New York Times Movie Review";
    if (movieReview.results != undefined) {
        if (movieReview.results.length === 1) {
            reviewButton.href = movieReview.results[0].link.url;
            reviewButton.target = "_blank";    
        }
        else  if (movieReview.results.length > 1) {
            for (var i = 0; i < movieReview.results.length; i++) {
                if (movieReview.results[i].display_title === movieReviewTitle) {
                    index = i;
                    break;
                }
            }
            reviewButton.href = movieReview.results[index].link.url;
            reviewButton.target = "_blank";    
        } else {
            reviewButton.classList.add("disabled");
        }
    }
    reviewButton.style.display = "block";
    column2Div.appendChild(reviewButton);
}


function getMovieReview(movieName) {
    title = title.replace(/ /g, '+');
    var apiURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + title
     + "&api-key=T0ekj9kvOB8SEbBSMMEGhVwG8wou6TDU"

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayReviewButton(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to TMDB API');
    });
};

function addFavoriteCheckbox() {
    var favoriteCheckbox = document.createElement("input");
    var favoriteCheckboxLabel = document.createElement("label");
    var br = document.createElement("br");
    var column2Div = document.querySelector("#column2-div");
    favoriteCheckbox.id = "favorite";
    favoriteCheckbox.type = "checkbox";
    favoriteCheckbox.value = "favorite";
    favoriteCheckbox.name = "favorite";
    favoriteCheckboxLabel.htmlFor = "favorite";
    favoriteCheckboxLabel.appendChild(document.createTextNode("Favorite"));
    // favoriteCheckbox.style.visibility = "visible";
    // favoriteCheckbox.style.disabled = "false";

    
    column2Div.appendChild(favoriteCheckbox);
    column2Div.appendChild(favoriteCheckboxLabel);

    column2Div.appendChild(br);
    column2Div.appendChild(br);
}



function getWhereItsStreaming(movieID) {
    var tmdbAPIKey = "8e8357c629a4f6e188b08411c96a6e5b";
    var apiURL = "https://api.themoviedb.org/3/movie/" + movieID + "/watch/providers" + "?api_key=" + tmdbAPIKey;

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWhereItsStreaming(data);
                getMovieReview(title);
                addFavoriteCheckbox();
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to TMDB API');
    });
};



function displayMovieCast(movieCast) {
    var column2Div = document.querySelector("#column2-div");
    var castTag = document.createElement("p");
    column2Div.appendChild(castTag);
    castTag.innerHTML = "<b>Cast: </b>";
    for (var i= 0; (i <= 5 && i < movieCast.cast.length); i++) {
        var actor = document.createElement("p");
        actor.innerHTML = movieCast.cast[i].character + ": " + movieCast.cast[i].name;
        column2Div.appendChild(actor);
    }

}


function getMovieCast(movieID) {
    var tmdbAPIKey = "8e8357c629a4f6e188b08411c96a6e5b";
    var apiURL = "https://api.themoviedb.org/3/movie/" + movieID + "/credits?api_key=" + tmdbAPIKey + "&language=en-US";

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayMovieCast(data);
                getWhereItsStreaming(movieID, data);
             });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to TMDB API');
    });
};



function findMovie(movieID) {
    for (var i = 0; i < moviesArray.length; i++) {
        if (moviesArray[i].id == movieID) {
            return moviesArray[i];
        }
    }
}

function displayMovieDetails(movieID) {
    moviesList.innerHTML = "";
    var rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    moviesList.appendChild(rowDiv);


    var movieTitle = document.createElement("h3");
    movieTitle.classList.add("movie-title");
    var movie = findMovie(movieID);
    movieTitle.textContent = movie.title;
    title = movie.title;    // workaround for getting movie review by title
    movieReviewTitle = movie.title;
    rowDiv.appendChild(movieTitle);


    var columnDiv = document.createElement("div");
    columnDiv.classList.add("col");
    columnDiv.classList.add("s12");
    columnDiv.classList.add("m6");
    rowDiv.appendChild(columnDiv);

    var imageDiv = document.createElement("div");

    imageDiv.id = "poster-div";
    columnDiv.appendChild(imageDiv);

    var poster = document.createElement("img");
    poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    imageDiv.appendChild(poster);

    var column2Div = document.createElement("div");
    column2Div.classList.add("col");
    column2Div.classList.add("s12");
    column2Div.classList.add("m6");
    column2Div.id = "column2-div";
    rowDiv.appendChild(column2Div);

    var overview = document.createElement("p");
    overview.textContent = movie.overview;
    column2Div.appendChild(overview);

    var releaseDate = document.createElement("p");
    releaseDate.innerHTML = "<b>Release Date: </b>" + movie.release_date;
    column2Div.appendChild(releaseDate);    
    
    getMovieCast(movieID);

}




function displaySearchResultsList(searchResults) {
    for (var i = 0; i < searchResults.results.length; i++) {
        // ****** SAVE SEARCH RESULTS INCLUDING DETAILS TO AN ARRAY *****
        moviesArray.push(searchResults.results[i]);
        // saveMovieDetails(searchResults.results[i]);
        var movieListEl = document.createElement("a");
        movieListEl.innerHTML = searchResults.results[i].title;
        movieListEl.classList.add("collection-item");
        // movieListEl.
        movieListEl.id = searchResults.results[i].id;
        moviesList.appendChild(movieListEl);
        movieListEl.addEventListener('click', event => {
            var movieID = event.target.id;
            displayMovieDetails(movieID);
        })
    }
}


function displaySearchResults(searchResults) {

    // if we get back more than one moview display the list
    // if we get just one back, display its details
    if (searchResults.results.length > 1) {
        displaySearchResultsList(searchResults);
    } else {
        moviesArray.push(searchResults.results[0]);
        displayMovieDetails(searchResults.results[0].id);
    }
}



// make the first API call to TMDB to get the list of movies from the search
// calls displaySearchResults to display the results of the search 
function fetchFirstAPI(movieName) {
    var tmdbAPIKey = "8e8357c629a4f6e188b08411c96a6e5b";

    var apiURL =  "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbAPIKey + "&language=en-US&page=1&include_adult=false&query=" + movieName + "&append_to_response=credits";
    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displaySearchResults(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Error: Unable to connect to TMDB API');
    });
};




var searchFormHandler = function(event) {
    event.preventDefault();
    movieName = searchField.value;
    movieName = movieName.replace(/ /g, '+');
    if (movieName) {
        moviesList.innerHTML = "";
        moviesArray = [];
        fetchFirstAPI(movieName);
    } else {
        document.emptyInput.setProperty('--animate-furation', '2s');
           
         }
}

searchButton.addEventListener("click", searchFormHandler);
