window.onload = function(){

  /*****************VARIABLES / SETTERS / GETTERS*******************/
  //create search button to add an event listener on it
  var searchButton = document.getElementById('search-button');
  var favoriteButton = document.getElementById('favorite-button');
  var viewFavoritesButton = document.getElementById('view-favorites');
  var movieDisplay = document.getElementById('movie-display');
  var searchDisplay = document.getElementsByClassName('search-field')[0];
  var returnHomeButton = document.getElementById('home-button');

  //variable for the currently displayed movies data
  var currentlyDisplayedMovie = "hi i work";

  //Added AJAX request object
  var xhttp;

  //this conditional statement is to account for older browsers
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  //set currentlyDisplayedMovie
  var setCurrentlyDisplayedMovie = function(movie){
    currentlyDisplayedMovie = movie;
  };

  //get currentlyDisplayedMovie
  var getCurrentlyDisplayedMovie = function(){
    return currentlyDisplayedMovie;
  };
  /*****************VARIABLES / SETTERS / GETTERS*******************/


  /*****************DOM MANIPULATOR FUNCTIONS*******************/
  var createMovieCard = function(movie){
    //create movie card element
    var movieCard = document.createElement('div');
    movieCard.setAttribute('class', 'movie');
    var title = '<h1 class="movie-title">' + movie.Title + '</h1>';
    var release = '<h2 class="movie-release">Released: ' + movie.Released + '</h2>';
    var poster = '<img src="' + movie.Poster + '"><br>';
    var genre = '<h3 class="movie-genre"> Genre: ' + movie.Genre + ' | Rating: ' + movie.Rated + '</h3>';
    var director = '<h3 class="movie-director"> Directed By: ' + movie.Director + '</h3>';

    //add the movieCard all together
    movieCard.innerHTML = title + release + poster + director + genre;

    return movieCard;
  };

  var displayFavorites = function(favorites){
    //clear search field and other buttons
    searchDisplay.style.display = 'none';
    viewFavoritesButton.style.display = 'none';
    favoriteButton.style.display = 'none';

    // add return to search button
    returnHomeButton.style.display = 'inline-block';

    for(var i = 0; i < favorites.length; i++){
      var movieCard = createMovieCard(favorites[i]);
      //append moviecard to the display
      movieDisplay.appendChild(movieCard);
    }
  };

  var displayMovie = function(movie){

    //clear any previous search
    movieDisplay.innerHTML = '';

    //create movie card element
    var movieCard = createMovieCard(movie);

    //append moviecard to the display
    movieDisplay.appendChild(movieCard);

  };
  /*****************DOM MANIPULATOR FUNCTIONS*******************/


  /*****************EVENT LISTENER CALLBACKS*******************/
  var returnHomeCallback = function(){
    //show search field and other buttons
    searchDisplay.style.display = 'block';
    viewFavoritesButton.style.display = 'inline-block';

    // hide return to search button
    returnHomeButton.style.display = 'none';

    //clear display
    movieDisplay.innerHTML = '';
    movieDisplay.style.display = 'none';
  };

  var viewFavoritesCallback = function(){

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log('SUCCESS');
        console.log(this.response);
        //show a courtesy message if no movies are favorited yet
        if(this.response.length === 0){
          movieDisplay.style.display = 'block';
          movieDisplay.innerHTML = '<h1 class="movie-title"> YOU HAVE NO FAVORITE MOVIES YET :) </h1>';
        } else {
          movieDisplay.style.display = 'block';
          movieDisplay.innerHTML = '';
          displayFavorites(this.response);
        }
      }
    };
    xhttp.open('GET', '/favorites', true);
    xhttp.responseType = 'json';
    xhttp.send();

  };

  var favoriteCallback = function(){
    var movie = getCurrentlyDisplayedMovie();

    var title = 'Title=' + movie.Title;
    var release = '&Released=' + movie.Released;
    var poster = '&Poster=' + movie.Poster;
    var genre = '&Genre=' + movie.Genre;
    var director = '&Director=' + movie.Director;
    var rating = '&Rated=' + movie.Rated;

    var data = title + release + poster + genre + director + rating;

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.response);
      }
    };

    xhttp.open('POST', '/favorites');
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
  };


  var searchCallback = function(){
    movieDisplay.style.display = 'block';

    //value of searched option
    var query = document.getElementsByName('search-movies')[0];

    //send the request to the OMDbapi
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //only display something if defined
        if(this.response.Title !== undefined){
          //diplay the movie to the DOM
          displayMovie(this.response);
          setCurrentlyDisplayedMovie(this.response);
        } else {
          movieDisplay.innerHTML = '<h1 class="movie-title"> Please Try Again :) </h1>';
        }
      }
    };
    xhttp.open('GET', 'http://www.omdbapi.com/?t=' + query.value + '&y=&plot=short&r=json', true);
    xhttp.responseType = 'json';
    xhttp.send();

    //clear search field
    query.value = '';

    //display favorite button
    favoriteButton.style.display = 'inline-block';
  };
  /*****************EVENT LISTENER CALLBACKS*******************/


  //event listener when user hits search button
  searchButton.addEventListener('click', searchCallback);
  favoriteButton.addEventListener('click', favoriteCallback);
  viewFavoritesButton.addEventListener('click', viewFavoritesCallback)
  returnHomeButton.addEventListener('click', returnHomeCallback);
};
