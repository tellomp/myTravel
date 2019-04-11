require("dotenv").config();
const request = require('request');
// import {fourSquareKey} from "../keys.js";
// console.log(fourSquareKey);
module.exports = function(app) {app.get("/modelsFoursquare", function(req, res) {
      var cityQuery = req.query.city;
      console.log("City: " + cityQuery);
      var interestQuery = req.query.interest;
      console.log("Interest: " + interestQuery);
      console.log(req);
      // var query = req.query.searchTerm;
      // console.log("searching for: " + query);
      // console.log("CLIENT_ID " + client_id + ", CLIENT_SECRET: " + client_secret);
  
      
  //     request({
  //         url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAaGyda-uJRFDt5wTXopSlBxERCa5GMq68&inputtype=textquery&fields=formatted_address,name,photos,user_ratings_total&input='+cityQuery+' '+interestQuery+' '+photo,
          
  //         method: 'GET'
  //       }, function(err, res, body) {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //           console.log(body);
  //           var obj = JSON.parse(body);
  //           console.log("\n\n\n");
  //           console.log(obj);
  //           if (obj.response){
  //             console.log(obj.response.groups[0].items[0].venue.location.city);
  //           }
  //         }
  //       });
       
  
    
  
  // });
  // }


 








// const request = require('request');


// module.exports = function(app) {app.get("/modelsFoursquare", function(req, res) {
//     var cityQuery = req.query.city;
//     console.log("City: " + cityQuery);
//     var interestQuery = req.query.interest;
//     console.log("Interest: " + interestQuery);

//     // var query = req.query.searchTerm;
//     // console.log("searching for: " + query);
//     // console.log("CLIENT_ID " + client_id + ", CLIENT_SECRET: " + client_secret);

    
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
            res.json(myJSON);
          }
        }
      });
     

    });
  }



// // res.groups[items.venue.location.city]



