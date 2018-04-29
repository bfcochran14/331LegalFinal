// app/routes.js
var surveyData = require('../app/models/surveyData');

var MongoClient = require('mongodb').MongoClient;
var db;
const url = 'mongodb://ben:admin@ds237979.mlab.com:37979/ndadocument';

MongoClient.connect(url, function(err, client){
	if (err) return console.log(err)
  	db = client.db('ndadocument') // whatever your database name is
})
module.exports = function(app, passport,promise) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/survey', function(req,res){

      res.render('survey.ejs');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
      }));
    app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));
    app.post('/survey', isLoggedIn,record_data);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
function record_data(req, res, next) {
	console.log(req.body); // show in the console what the user entered
//scrub question 5
if(req.body.question5 == 'item1')
	req.body.question5 = 'Individual';
else if (req.body.question5 == 'item2') {
		req.body.question5 = 'Limited Liability';
	}
else if (req.body.question5 == 'item3') {
			req.body.question5 = 'Corperation';
		}
else if (req.body.question5 == 'item4') {
				req.body.question5 = 'Partnership';
		}
else if (req.body.question5 == 'item5') {
			req.body.question5 = 'Sole Proprietorship';
		}
else if (req.body.question5 == 'item6') {
			req.body.question5 = 'Other';
		}
//scrub question 6
if(req.body.question6 == 'item1')
	req.body.question6 = 'Alabama';
else if (req.body.question6 == 'item2') {
	req.body.question6 = 'Alaska';
}
else if (req.body.question6 == 'item3') {
	req.body.question6 = 'Arizona';
}
else if (req.body.question6 == 'item4') {
	req.body.question6 = 'Arkansas';
}
else if (req.body.question6 == 'item5') {
	req.body.question6 = 'Calafornia';
}
else if (req.body.question6 == 'item6') {
	req.body.question6 = 'Colorado';
}
else if (req.body.question6 == 'item7') {
	req.body.question6 = 'Connecticut';
}
else if (req.body.question6 == 'item8') {
	req.body.question6 = 'Delaware';
}
else if (req.body.question6 == 'item9') {
	req.body.question6 = 'Florida';
}
else if (req.body.question6 == 'item10') {
	req.body.question6 = 'Georgia';
}
else if (req.body.question6 == 'item11') {
	req.body.question6 = 'Hawaii';
}
else if (req.body.question6 == 'item12') {
	req.body.question6 = 'Idaho';
}
else if (req.body.question6 == 'item13') {
	req.body.question6 = 'Illinois';
}
else if (req.body.question6 == 'item14') {
	req.body.question6 = 'Indiana';
}
else if (req.body.question6 == 'item15') {
	req.body.question6 = 'Iowa';
}
else if (req.body.question6 == 'item16') {
	req.body.question6 = 'Kansas';
}
else if (req.body.question6 == 'item17') {
	req.body.question6 = 'Kentucky';
}
else if (req.body.question6 == 'item18') {
	req.body.question6 = 'Louisiana';
}
else if (req.body.question6 == 'item19') {
	req.body.question6 = 'Maine';
}
else if (req.body.question6 == 'item20') {
	req.body.question6 = 'Maryland';
}
else if (req.body.question6 == 'item21') {
	req.body.question6 = 'Massachusetts';
}
else if (req.body.question6 == 'item22') {
	req.body.question6 = 'Michigan';
}
else if (req.body.question6 == 'item23') {
	req.body.question6 = 'Minnesota';
}
else if (req.body.question6 == 'item24') {
	req.body.question6 = 'Mississippi';
}
else if (req.body.question6 == 'item25') {
	req.body.question6 = 'Missouri';
}
else if (req.body.question6 == 'item26') {
	req.body.question6 = 'Montana';
}
else if (req.body.question6 == 'item27') {
	req.body.question6 = 'Nebraska';
}
else if (req.body.question6 =='item28' ) {
	req.body.question6 = 'Nevada';
}
else if (req.body.question6 == 'item29') {
	req.body.question6 = 'New Hampshire';
}
else if (req.body.question6 == 'item30' ) {
	req.body.question6 = 'New Jersey';
}
else if (req.body.question6 == 'item31') {
	req.body.question6 = 'New Mexico';
}
else if (req.body.question6 == 'item32') {
	req.body.question6 = 'New York';
}
else if (req.body.question6 == 'item33') {
	req.body.question6 = 'North Carolina';
}
else if (req.body.question6 == 'item34') {
	req.body.question6 = 'North Dakota';
}
else if (req.body.question6 == 'item35' ) {
	req.body.question6 = 'Ohio';
}
else if (req.body.question6 == 'item36') {
	req.body.question6 = 'Oklahoma';
}
else if (req.body.question6 == 'item37') {
	req.body.question6 = 'Oregon';
}
else if (req.body.question6 == 'item38') {
	req.body.question6 = 'Pennsylvania';
}
else if (req.body.question6 == 'item39') {
	req.body.question6 = 'Rhode Island';
}
else if (req.body.question6 == 'item40') {
	req.body.question6 = 'South Carolina';
}
else if (req.body.question6 == 'item41') {
	req.body.question6 = 'South Dakota';
}
else if (req.body.question6 == 'item42') {
	req.body.question6 = 'Tennessee';
}
else if (req.body.question6 == 'item43') {
	req.body.question6 = 'Texas';
}
else if (req.body.question6 == 'item44') {
	req.body.question6 = 'Utah';
}
else if (req.body.question6 == 'item45') {
	req.body.question6 = 'Vermont';
}
else if (req.body.question6 == 'item46') {
	req.body.question6 = 'Virginia';
}
else if (req.body.question6 == 'item47') {
	req.body.question6 = 'Washington';
}
else if (req.body.question6 == 'item48') {
	req.body.question6 = 'West Virginia';
}
else if (req.body.question6 == 'item49') {
	req.body.question6 = 'Wisconsin';
}
else if (req.body.question6 == 'item50') {
	req.body.question6 = 'Wyoming';
}
else if (req.body.question6 == 'item51') {
	req.body.question6 = 'Puerto Rico';
}
else if (req.body.question6 == 'item52') {
	req.body.question6 = 'District of Columbia';
}


//scrub question 7
if(req.body.question7 == 'item2')
{
	req.body.question7 = 'No';
}
	console.log("post recieved")
	db.collection('nda').save(req.body, (err, result) => {
		console.log('inside collection function')
    	if (err) return console.log(err)
    	console.log('saved to database')
    	res.redirect('/profile')
  	})
	 db.collection('nda').find().toArray(function(err, results){
		 console.log(results);
	 });
}
