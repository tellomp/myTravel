$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) 
  {
    $(".member-name").text(data.email);
    
  });



});

//everything that they are members of you have to include here.. you need to pass it in the api route in order to call it here