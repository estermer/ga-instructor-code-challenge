var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');//forgot to require body-parser
var favorites = require('./data.json');//moved from inside app.post

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  console.error(err.stack);
  next(err);
});

///missing a ) at the end and a / before public
//code is redundant and not needed
// app.use('/', express.static(path.join(__dirname, 'public'));
//needs a home route to search for movies
app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/favorites', function(req, res){
  // var data = fs.readFileSync('./data.json'); Not needed now that it is required at the top
  res.setHeader('Content-Type', 'application/json');
  res.send(favorites);
});//}) was missing on this line

//when writing files to a datastore or db use a post route
app.post('/favorites', function(req, res){// '/' was missing in the path
  // if(!req.body.name || !req.body.oid){
  //   res.send("Error");
  // }//if statement was missing closing curly brackets }
  // else {//else statement preferred after the if statement
    favorites.push(req.body);
    // fs.writeFile('./data.json', JSON.stringify(favorites),  "utf8", function(err){
    //   //Added a callback to confirm the data was saved to the favorites data file
    //   if(err) throw err;
    //   console.log("saved");
    // });
    // res.setHeader('Content-Type', 'application/json');
    // res.send(favorites);
    console.log(favorites);
  // }
});

app.listen(process.env.PORT || 3000, function(){// forgot to finish spelling list to listen
  console.log("Listening on port 3000");
});
