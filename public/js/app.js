window.onload = function(){

  //Added AJAX request object
  var xhttp;
  //this conditional statement is to account for older browsers
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  //create search button to add an event listener on it
  var searchButton = document.getElementById('search-button');

  var searchCallback = function(){
    //value of searched option
    var query = document.getElementsByName('search-movies')[0].value;
  };

  searchButton.addEventListener('click', searchCallback);
};
