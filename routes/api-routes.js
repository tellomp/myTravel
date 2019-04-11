// Requiring our models and passport as we've configured it
require("dotenv").config();
var db = require("../models");
var passport = require("../config/passport");
var unirest = require("unirest");
var request = require("request");
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      // this is what you can make unique
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });






  app.get("/api/flights/:origin/:destination/:outbound/:return", function(req, res) {
    console.log(req.params);


    var url="https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/";
    var originPlace= req.params.origin +"-sky";
    var destination= req.params.destination +"-sky";
    var outboundDate= req.params.outbound;
    var returnDate= req.params.return; 
     
    url+= originPlace + "/"+ destination + "/" + outboundDate + "/"+ returnDate;

    console.log(url);

unirest.get(url)
 .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
 .header("X-RapidAPI-Key", "484be930bfmshe1d3b695005a445p1bc458jsnf3dcffac49bc")
 .end(function (result) {
   console.log(result.status, result.headers, result.body);
   

   
   res.json(result.body);
 
 });
    })
    
    app.get("/modelsFoursquare", function(req, res) {
      var cityQuery = req.query.city;
      console.log("City: " + cityQuery);
      var interestQuery = req.query.interest;
      console.log("Interest: " + interestQuery);
      // console.log(req);
	  request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        //   ll: '40.7243,-74.0018',
          near: cityQuery,
          query: interestQuery,
          v: '20180323',
          limit: 10
        }
      }, function(err, callres, body) {
        if (err) {
          console.error(err);
        } else {
          // console.log(body);
          var obj = JSON.parse(body);
          // console.log("\n\n\n");
          // console.log(obj);
          if (obj.response && obj.response.groups && obj.response.groups[0].items){
            var listOfItems = obj.response.groups[0].items;
            var responseList = [];
            for (var i=0; i<listOfItems.length; i++){
              var currentItem = listOfItems[i];
              console.log(currentItem);
              var formattedAddress = currentItem.venue.location.formattedAddress;
              var name = currentItem.venue.name;
              var categoryList = currentItem.venue.categories[0].name;
              console.log(formattedAddress);
              console.log(name);
              console.log(categoryList);
              var formattedItem = { address: formattedAddress, name: name, category:  categoryList  };
              responseList.push(formattedItem);
            }
            var myJSON = JSON.stringify(responseList);
            console.log("returning the following information: " + myJSON);
            res.json(myJSON);
          }
          else {
            console.log("no return from server!");
          }
        }
      });
     

    });
    
};