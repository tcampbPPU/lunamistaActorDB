var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });

// Tell Express loading Handlebars 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set Port
app.set('port', process.env.PORT || 3000);

// Looks for files in Public Dir
app.use(express.static(__dirname + '/public'));

// add fortunes for dynamic test
var fortuneCookies = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];

// var date = new Date();
// console.log(date);

// Render looks in views for file name in extenstion

// Root Dir
app.get('/', function(req, res) {
  res.render('home');
});

// Date Dir
app.get('/datetime', function(req, res) {
  var date = new Date();
  res.render('datetime', { datetime: date});
});

// About Dir
app.get('/about', function(req,res){
  var randomFortune = fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
  res.render('about', { fortune: randomFortune });
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


