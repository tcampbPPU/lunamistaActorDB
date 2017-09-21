var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });

// Tell Express loading Handlebars 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set Port
app.set('port', process.env.PORT || 4000);


// Looks for files in Public Dir
app.use(express.static(__dirname + '/public'));


// Root Home Login Page
app.get('/', function(req, res) {
  res.render('home');
});

// Add Actor 
app.get('/add', function(req, res) {
  res.render('add');
});

// Search DB of Actors
app.get('/search', function(req, res) {
  res.render('search');
});

// List of previous Search Querys
app.get('/list', function(req, res) {
  res.render('list');
});

// custom 404 page 
app.use(function(req, res){ 
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack); 
  res.type('text/ plain'); 
  res.status(500);
  res.render('500');
});

// Listen to APP for Port
app.listen(app.get('port'), function(){ console.log('Express started on http:// localhost:' + app.get('port') + '; press Ctrl-C to terminate.'); 
});


