var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get("/", function(req, res) {
  res.send("Hello")
})

//////////////////////////////////////

/*
app.get('/test/*', function(req, res) {
  res.json({ "a": 1, "b": 2 });
});
*/

/*
app.get('/test/*', function(req, res) {
  res.json(["Hello", "World"]);
});
*/

/*
app.get('/test/*', function(req, res) {
  res.json(42);
});
*/

app.get('/test/*', function(req, res) {
  var param = req.url.substr(6);
  res.json({ "msg": param });
});

//////////////////////////////////////

let counter = 0;

app.get('/cpt/query', function(req, res) {
  res.json({ "counter": counter });
});

app.get('/cpt/inc', function(req, res) {
  var value = parseInt(req.query.v);
  if (!isNaN(value)) {
    counter += value;
    res.json({ "code": 0 });
  } 
  else if (req.query.v !== undefined) {
    res.json({ "code": -1 });
  } 
  else {
    counter++;
    res.json({ "code": 0 });
  }
});

//////////////////////////////////////

var allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

app.get('/msg/get/*', function(req, res) {
  var id = parseInt(req.params[0]);
  if (!isNaN(id) && id >= 0 && id < allMsgs.length) {
    res.json({ "code": 1, "msg": allMsgs[id] });
  } 
  else {
    res.json({ "code": 0 });
  }
});

app.get('/msg/nber', function(req, res) {
  res.json({ "count": allMsgs.length });
});

app.get('/msg/getAll', function(req, res) {
  const formattedMessages = allMsgs.map((msg, index) => {
    return { "msg": msg };
  });
  res.json({ "messages": formattedMessages });
});

app.get('/msg/post/*', function(req, res) {
  var message = unescape(req.params[0]);
  allMsgs.push(message);
  var id = allMsgs.length - 1;
  res.json({ "code": 1, "id": id });
});

//////////////////////////////////////

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");