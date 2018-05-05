// app/routes.js
var surveyData = require('../app/models/surveyData');
var User = require('../app/models/user');

var PDFDocument = require('pdfkit')
var MongoClient = require('mongodb').MongoClient;
var db;
const url = 'mongodb://ben:admin@ds237979.mlab.com:37979/ndadocument';

//var sourcePdf= "../ndaV1.pdf"
//var destinationPdf= "../ndaV2."

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
		app.get('/pdf',function(req,res){

			db.collection('nda').find().sort({ "_id": -1 }).limit(1).toArray(function(err, results){
				console.log(results);
				res.render('pdf.ejs', {nda: results})
			});
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
if(req.body.question7 == 'item1')
{
	req.body.question7 = 'Yes';
}
if(req.body.question7 == 'item2')
{
	req.body.question7 = 'No';
}

//scrub question 8
if(req.body.question8 == 'item1')
	req.body.question8 = 'Alabama';
else if (req.body.question8 == 'item2') {
	req.body.question8 = 'Alaska';
}
else if (req.body.question8 == 'item3') {
	req.body.question8 = 'Arizona';
}
else if (req.body.question8 == 'item4') {
	req.body.question8 = 'Arkansas';
}
else if (req.body.question8 == 'item5') {
	req.body.question8 = 'Calafornia';
}
else if (req.body.question8 == 'item6') {
	req.body.question8 = 'Colorado';
}
else if (req.body.question8 == 'item7') {
	req.body.question8 = 'Connecticut';
}
else if (req.body.question8 == 'item8') {
	req.body.question8 = 'Delaware';
}
else if (req.body.question8 == 'item9') {
	req.body.question8 = 'Florida';
}
else if (req.body.question8 == 'item10') {
	req.body.question8 = 'Georgia';
}
else if (req.body.question8 == 'item11') {
	req.body.question8 = 'Hawaii';
}
else if (req.body.question8 == 'item12') {
	req.body.question8 = 'Idaho';
}
else if (req.body.question8 == 'item13') {
	req.body.question8 = 'Illinois';
}
else if (req.body.question8 == 'item14') {
	req.body.question8 = 'Indiana';
}
else if (req.body.question8 == 'item15') {
	req.body.question8 = 'Iowa';
}
else if (req.body.question8 == 'item16') {
	req.body.question8 = 'Kansas';
}
else if (req.body.question8 == 'item17') {
	req.body.question8 = 'Kentucky';
}
else if (req.body.question8 == 'item18') {
	req.body.question8 = 'Louisiana';
}
else if (req.body.question8 == 'item19') {
	req.body.question8 = 'Maine';
}
else if (req.body.question8 == 'item20') {
	req.body.question8 = 'Maryland';
}
else if (req.body.question8 == 'item21') {
	req.body.question8 = 'Massachusetts';
}
else if (req.body.question8 == 'item22') {
	req.body.question8 = 'Michigan';
}
else if (req.body.question8 == 'item23') {
	req.body.question8 = 'Minnesota';
}
else if (req.body.question8 == 'item24') {
	req.body.question8 = 'Mississippi';
}
else if (req.body.question8 == 'item25') {
	req.body.question8 = 'Missouri';
}
else if (req.body.question8 == 'item26') {
	req.body.question8 = 'Montana';
}
else if (req.body.question8 == 'item27') {
	req.body.question8 = 'Nebraska';
}
else if (req.body.question8 =='item28' ) {
	req.body.question8 = 'Nevada';
}
else if (req.body.question8 == 'item29') {
	req.body.question8 = 'New Hampshire';
}
else if (req.body.question8 == 'item30' ) {
	req.body.question8 = 'New Jersey';
}
else if (req.body.question8 == 'item31') {
	req.body.question8 = 'New Mexico';
}
else if (req.body.question8 == 'item32') {
	req.body.question8 = 'New York';
}
else if (req.body.question8 == 'item33') {
	req.body.question8 = 'North Carolina';
}
else if (req.body.question8 == 'item34') {
	req.body.question8 = 'North Dakota';
}
else if (req.body.question8 == 'item35' ) {
	req.body.question8 = 'Ohio';
}
else if (req.body.question8 == 'item36') {
	req.body.question8 = 'Oklahoma';
}
else if (req.body.question8 == 'item37') {
	req.body.question8 = 'Oregon';
}
else if (req.body.question8 == 'item38') {
	req.body.question8 = 'Pennsylvania';
}
else if (req.body.question8 == 'item39') {
	req.body.question8 = 'Rhode Island';
}
else if (req.body.question8 == 'item40') {
	req.body.question8 = 'South Carolina';
}
else if (req.body.question8 == 'item41') {
	req.body.question8 = 'South Dakota';
}
else if (req.body.question8 == 'item42') {
	req.body.question8 = 'Tennessee';
}
else if (req.body.question8 == 'item43') {
	req.body.question8 = 'Texas';
}
else if (req.body.question8 == 'item44') {
	req.body.question8 = 'Utah';
}
else if (req.body.question8 == 'item45') {
	req.body.question8 = 'Vermont';
}
else if (req.body.question8 == 'item46') {
	req.body.question8 = 'Virginia';
}
else if (req.body.question8 == 'item47') {
	req.body.question8 = 'Washington';
}
else if (req.body.question8 == 'item48') {
	req.body.question8 = 'West Virginia';
}
else if (req.body.question8 == 'item49') {
	req.body.question8 = 'Wisconsin';
}
else if (req.body.question8 == 'item50') {
	req.body.question8 = 'Wyoming';
}
else if (req.body.question8 == 'item51') {
	req.body.question8 = 'Puerto Rico';
}
else if (req.body.question8 == 'item52') {
	req.body.question8 = 'District of Columbia';
}
else{
	req.body.question8 = ''
}

	console.log("post recieved")
	db.collection('nda').save(req.body, (err, result) => {
		console.log('inside collection function')
    	if (err) return console.log(err)

    	console.log('saved to database')
    	console.log(req.body)
    	//res.redirect('/pdf')
    	showPDF(req.body, res);
  	})
		db.collection('nda').find().sort({ "_id": -1 }).limit(1).toArray(function(err, results){
			//console.log(results);
			//res.render('pdf.ejs', {nda: results})
		});


	// db.collection('nda').find({"_id":1}).toArray(function(err, results){
		 //console.log(results);
	 //});
}


function showPDF(data, res) {
	console.log('in showPdf')
	console.log(data.question1)
	const doc = new PDFDocument();
	res.setHeader('Content-disposition', 'inline; filename="' + data + '"')
  	res.setHeader('Content-type', 'application/pdf');

  	/*
  	let template = {
  		name: "Paul",
  		docType: "patent",
  		paragraph1: "The author, NAME, seeks a DOCTYPE for";
  	}
	*/
	var dpgender = 'male'
	var rgender = 'female'
	//Data scrubbing//
	//Pronouns
	if(dpgender == 'male'){
		var dppronoun = 'him'
	}
	else{
		var dppronoun = 'her'
	}
	if(rgender == 'male'){
		var rppronoun = 'him'
	}
	else{
		var rppronoun = 'her'
	}
	//Possesives
	if(dpgender == 'male'){
		var dppossesive = 'his'
	}
	else{
		var dppossesive = 'hers'
	}
	if(rgender == 'male'){
		var rppossesive = 'his'
	}
	else{
		var rppossesive = 'hers'
	}


	var disclosingPartyName = data.question1 + ' ' + data.question2;

	if(data.question7 == 'No'){
		var registeredAns = ''
	}
	else{
		var registeredAns = 'registered'
	}
	///////////questions///////////
	//1- last name
	//2- first name
	//3- email address
	//4- disclosing parties name <- is this not the name of the person making the contract?????
	//5- type of legal entity- <le>
	//6- State- <dpState>
	//7- Are they Registered- <isR>
	//8- Registered State- <dpRstate>

    var inputs = [disclosingPartyName, /*data.question3,*/ data.question4, data.question5, data.question6, registeredAns, data.question8, dppossesive, rppossesive, dppronoun, rppronoun];
	var paragraph1 = 'Non Disclosure Agreement between <dp> and <r>';
	var paragraph2 = 'This Confidentiality Agreement (the "Agreement"), dated as of <(today)>("Effective Date"), is between <dp>,<a> <dpRstate> <isR> <le> located at <dpstate> ("Disclosing Party"), and <r>, <a> <rState> resident located at <r-loc>("Recipient").';
	var paragraph3 = '1. In connection with <p> (the "Purpose"), Disclosing Party may disclose to Recipient, or Recipient may otherwise receive access to, Confidential Information (as defined below). Recipient shall use the Confidential Information solely for the Purpose and, subject to Section 3, shall not disclose or permit access to Confidential Information other than to <itsdp!> affiliates and <itsdp!> or <<their(dp!)>> employees, and officers, directors, shareholders, attorneys, accountants and financial advisors (collectively, "Representatives") who: (a) need to know such Confidential Information for the Purpose; (b) know of the existence and terms of this Agreement; and (c) are bound by written confidentiality agreements no less protective of the Confidential Information than the terms contained herein. Recipient shall safeguard the Confidential Information from unauthorized use, access, or disclosure using at least the degree of care <itr!> uses to protect <itsr!> most sensitive information and no less than a reasonable degree of care. Recipient shall promptly notify Disclosing Party of any unauthorized use or disclosure of Confidential Information and use <itsr!> best efforts to cooperate with Disclosing Party to prevent further use or disclosure. Recipient will be responsible for any breach of this Agreement caused by <itsr!> Representatives.'
	var paragraph4 = '2. "Confidential Information" means all non-public, proprietary or confidential information relating to Disclosing Party\'s <p>, in oral, visual, written, electronic, or other tangible or intangible form, whether or not marked or designated as "confidential," and all notes, analyses, summaries, and other materials prepared by Recipient or any of <itsr!> Representatives that contain, are based on, or otherwise reflect, to any degree, any of the foregoing ("Notes"); provided, however, that Confidential Information does not include any information that: (a) is or becomes generally available to the public other than as a result of Recipient\'s or <itsr!> Representatives\' act or omission; (b) is obtained by Recipient or <itsr!> Representatives on a non-confidential basis from a third party that was not legally or contractually restricted from disclosing such information; (c) was in Recipient\'s or <itsr!> Representatives\' possession, as established by documentary evidence, before Disclosing Party\'s disclosure hereunder; or (d) was or is independently developed by Recipient or <itsr!> Representatives, as established by documentary evidence, without using any Confidential Information. Confidential Information also includes: (x) the facts that the parties are in discussions regarding the Purpose and that Confidential Information has been disclosed; and (y) any terms, conditions or arrangements discussed.'
	var paragraph5 = '3. If Recipient or any of <itsr!> Representatives is required by applicable law or a valid legal order to disclose any Confidential Information, Recipient shall, before such disclosure, notify Disclosing Party of such requirements so that Disclosing Party may seek a protective order or other remedy, and Recipient shall reasonably assist Disclosing Party therewith. If Recipient remains legally compelled to make such disclosure, <itr!> shall: (a) only disclose that portion of the Confidential Information that, in the written opinion of <itsr!> outside legal counsel, Recipient is required to disclose; and (b) use reasonable efforts to ensure that such Confidential Information is afforded confidential treatment.'
	var paragraph6 = '4. On the expiration of this Agreement or otherwise at Disclosing Party\'s request, Recipient shall within 2 weeks, at Disclosing Party\'s option, either return to Disclosing Party or destroy all Confidential Information in <itsdp!> and <itsdp!> Representatives\' possession other than Notes, and destroy all Notes, and certify in writing to Disclosing Party the destruction of such Confidential Information.'
	var paragraph7 = '5. Disclosing Party has no obligation under this Agreement to (a) disclose any Confidential Information or (b) negotiate for, enter into, or otherwise pursue the Purpose. Disclosing Party provides all Confidential Information without any representation or warranty, expressed or implied, as to the accuracy or completeness thereof, and Disclosing Party will have no liability to Recipient or any other person relating to Recipient\'s use of any of the Confidential Information or any errors therein or omissions therefrom.'
	var paragraph8 = '6. Disclosing Party retains <itsdp!> entire right, title, and interest in and to all Confidential Information, and no disclosure of Confidential Information hereunder will be construed as a license, assignment, or other transfer of any such right, title, and interest to Recipient or any other person.'
	var paragraph9 = '7. The rights and obligations of the parties under this Agreement expire <exp> after the Effective Date; provided that with respect to Confidential Information that is a trade secret under the laws of any jurisdiction, such rights and obligations will survive such expiration until, if ever, such Confidential Information loses <itsdp!> trade secret protection other than due to an act or omission of Recipient or <itsr!> Representatives.'
	var paragraph10 = '8. Recipient acknowledges and agrees that any breach of this Agreement will cause injury to Disclosing Party for which money damages would be an inadequate remedy and that, in addition to remedies at law, Disclosing Party is entitled to equitable relief as a remedy for any such breach.'
	var paragraph11 = '9. This Agreement and all matters relating hereto are governed by, and construed in accordance with, the laws of << Alabama(?-loc)>>, without regard to the conflict of laws provisions of such State. Any legal suit, action, or proceeding relating to this Agreement must be instituted in the federal or state courts located in <<Winston-Salem, Forsyth County, North Carolina(?-loc)>>. Each Party irrevocably submits to the exclusive jurisdiction of such courts in any such suit, action, or proceeding.'
	var paragraph12 = '10. All notices must be in writing and addressed to the relevant party at <itsr!> address set out in the preamble (or to such other address such party specifies in accordance with this Section 10). All notices must be personally delivered or sent prepaid by nationally recognized courier or certified or registered mail, return receipt requested, and are effective on actual receipt. '
	var paragraph13 = '11. This Agreement is the entire agreement of the parties regarding this subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. This Agreement may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties.'
	var paragraph14 = 'IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the Effective Date.'
	var paragraph15 = '<dp>'
	var paragraph16 = 'By ____________________________________'
	var paragraph17 = 'Name:  <dp-title>'
	var paragraph18	= 'Title:___________________________________________'
	var paragraph19 = '<r>'
	var paragraph20 = 'By ____________________________________'
	var paragraph21 = 'Name: <r-title> '
	var paragraph22 = 'Title:___________________________________________'
	var keys = ['<dp>', '<r>', '<le>', '<dpstate>', '<isR>', '<dpRstate>', '<itsdp!>', '<itsr!>', '<itdp!>', '<itr!>' ];


	contract = paragraph1 + '\n'+ '\n' + paragraph2 + '\n' +'\n' + paragraph3 + '\n' + '\n' + paragraph4 + '\n' + '\n' + paragraph5 + '\n' + '\n' + paragraph6 + '\n' + '\n' + paragraph7 + '\n' + '\n' + paragraph8 + '\n' + '\n' + paragraph9 + '\n' + '\n' + paragraph10 + '\n' + '\n' + paragraph11 + '\n' + '\n' + paragraph12 + '\n' + '\n' + paragraph13 + '\n' + '\n' + paragraph14 + '\n' + '\n' + paragraph15 + '\n' + '\n' + paragraph16 + '\n' + '\n' + paragraph17 + '\n' + '\n' + paragraph18 + '\n' + '\n' + paragraph19 + '\n' + '\n' + paragraph20 + '\n' + '\n' + paragraph21 + '\n' + '\n' + paragraph22
	//REPLACING PARAGRAPH 1//
	for( var i = 0; i < keys.length; i++) {
		var re = new RegExp(keys[i], 'g');
		contract = contract.replace(re, inputs[i]);
	}

	////////QUESTIONS NEEDED//////////






	//the purpose???????

	//when does it expire?
	//ask Raina about the state and location in p11
	//ask Raina about dp and r title

  	doc.y = 300;
  	doc.text(contract, 50, 50);

  	doc.pipe(res);
  	doc.end();
}
