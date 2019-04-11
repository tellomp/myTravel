$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);

  });



});

function onClick() {  
  $("#add-btn").on("click", function (event) {
    event.preventDefault();

    var newFlightSearch = {
      originPlace: $("#originPlace").val().trim(),
      destination: $("#destination").val().trim(),
      outboundDate: $("#outboundDate").val().trim(),
      returnDate: $("#returnDate").val().trim()
    };

    console.log(newFlightSearch);


    $.ajax("/api/flights/" + newFlightSearch.originPlace + "/" + newFlightSearch.destination + "/" + newFlightSearch.outboundDate + "/" + newFlightSearch.returnDate, {
      type: "GET",
    }).then(function (userFlightInfo) {
      console.log(userFlightInfo);

      console.log(userFlightInfo.Places[0].CityName);
       console.log(userFlightInfo.Carriers)
   

  
       var fewQuotes = userFlightInfo.Quotes.slice(0, 6);
      
      for (let i = 0; i < fewQuotes.length; i++) {

      var quoteDiv = $("<div class = 'col-xs-6'></div>");
      var quote = fewQuotes[i]; 
      var direct = quote.Direct;
      var departureCity = userFlightInfo.Places[0].CityName;
      var destinationCity = userFlightInfo.Places[1].CityName;
      var outboundCarrierName = userFlightInfo.Carriers.find(c => c.CarrierId == quote.OutboundLeg.CarrierIds[0])
      console.log('outboundCarrierName', outboundCarrierName);
     var inboundCarrierName = userFlightInfo.Carriers.find(c => c.CarrierId == quote.InboundLeg.CarrierIds[0])
      console.log('inboundCarrierName', inboundCarrierName);
      var departureDate = quote.OutboundLeg.DepartureDate;
      var returnDate= quote.InboundLeg.DepartureDate;
      var minPrice = quote.MinPrice;


      quoteDiv.append("Direct:" + " " + direct);
      quoteDiv.append("Departure City:" + " " + departureCity);
      quoteDiv.append("Destination City:" + " " + destinationCity);
      quoteDiv.append("Departure Date:" + " " +departureDate);
      quoteDiv.append("Return Date:" + ""+ returnDate);
      quoteDiv.append("Direct:" + " " + direct);
      quoteDiv.append("Outbound Carrier:" + " " + outboundCarrierName.Name);
      quoteDiv.append("Inbound Carrier:" + " " + inboundCarrierName.Name);
      quoteDiv.append("Price:" + " " + minPrice);
      $("#quoteSection").append(quoteDiv);
  
      }
              
    }).catch(function (err) {
      if (err) {
        console.log(err);
      }
    })
  });

};

onClick ();

//everything that they are members of you have to include here.. you need to pass it in the api route in order to call it here