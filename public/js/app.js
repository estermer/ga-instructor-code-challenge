window.onload = function(){

  //Added AJAX request object
  var xhttp;

  //create search button to add an event listener on it
  var searchButton = document.getElementById('search-button');

  //this conditional statement is to account for older browsers
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  //create display for the movies
  var displayMovies = function(movie){
    
  };


  //search event listener callback
  var searchCallback = function(){

    //value of searched option
    var query = document.getElementsByName('search-movies')[0].value;

    //send the request to the OMDbapi
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.response.Title);
        displayMovies(this.response);
      }
    };
    xhttp.open('GET', 'http://www.omdbapi.com/?t=' + query + '&y=&plot=short&r=json', true);
    xhttp.responseType = 'json';
    xhttp.send();

  };

  //event listener when user hits search button
  searchButton.addEventListener('click', searchCallback);
};
