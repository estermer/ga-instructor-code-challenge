window.onload = function(){

  //create search button to add an event listener on it
  var searchButton = document.getElementById('search-button');
  var favoriteButton = document.getElementById('favorite-button');

  //variable for the currently displayed movies data
  var currentlyDisplayedMovie;

  //Added AJAX request object
  var xhttp;

  //this conditional statement is to account for older browsers
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  ///create display for the movies///
  var displayMovie = function(movie){

    //clear any previous search
    document.getElementById('movie-display').innerHTML = '';

    //create movie card element
    var movieCard = document.createElement('div');
    movieCard.setAttribute('class', 'movie');
    var title = '<h2 class="movie-title">' + movie.Title + '</h2>';
    var release = '<h2 class="movie-release">Released: ' + movie.Released + '</h2>';
    var rating = '<h2 class="movie-rating">Rating: ' + movie.Rated + '</h2>';
    var poster = '<img src="' + movie.Poster + '"><br>';
    var genre = '<h3 class="movie-genre"> Genre: ' + movie.Genre + '</h3>';
    var director = '<h3 class="movie-director"> Directed By: ' + movie.Director + '</h3>';

    //add the movieCard all together
    movieCard.innerHTML = title + release + rating + poster + director + genre;

    //append moviecard to the display
    document.getElementById('movie-display').appendChild(movieCard);

  };


  //function to create POST params of the movie data
  var createMovieParameters = function(movie){
    var title = 'Title=' + movie.Title;
    var release = '&Released=' + movie.Released;
    var rating = '&Rated=' + movie.Rated;
    var poster = '&Poster=' + movie.Poster;
    var genre = '&Genre=' + movie.Genre;
    var director = '&Director=' + movie.Director;

    return title + release + rating + poster + genre + director;
  };

  ///favorite event listener callback///
  // var favoriteCallback = function(){
  //
  //   //send the data to data store
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       //diplay the movie to the DOM
  //       console.log("Success! Movie added to your favorites!");
  //       console.log(currentlyDisplayedMovie);
  //       console.log(this.response);
  //     }
  //   };
  //   xhttp.open('POST', 'http://localhost:3000/favorites', true);
  //   //Send the proper header information along with the request
  //   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   xhttp.send(currentlyDisplayedMovie);
  //
  // };


  ///search event listener callback///
  var searchCallback = function(){

    //value of searched option
    var query = document.getElementsByName('search-movies')[0];

    //send the request to the OMDbapi
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //diplay the movie to the DOM
        displayMovie(this.response);
        favoriteButton.value = createMovieParameters(this.response);
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


  //event listener when user hits search button
  searchButton.addEventListener('click', searchCallback);
  //event listener for favorite button
  // favoriteButton.addEventListener('click', favoriteCallback);
};
