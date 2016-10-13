var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');//forgot to require body-parser

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

///missing a ) at the end and a / before public
//code is redundant and not needed
// app.use('/', express.static(path.join(__dirname, 'public'));

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});//}) was missing on this line

app.get('/favorites', function(req, res){// '/' was missing in the path
  if(!req.body.name || !req.body.oid){
    res.send("Error");
  }//if statement was missing closing curly brackets }
  else {//else statement preferred after the if statement
    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  }
});

app.listen(3000, function(){// forgot to finish spelling list to listen
  console.log("Listening on port 3000");
});
