// $(".submitButton").on("click", function(event) {
//     event.preventDefault();
//     var newCity = obj.response.groups[0].items[0].venue.location.city
//     var input = 
//     {
//         city: $("#placeChosen").val().trim(),
//         pointOfInterest: $("#thingsOfInterest").val().trim()
//     }
    
// });
$(document).ready(function() {
    console.log("on page load");
    var urlParams =new URLSearchParams(window.location.search);
    var city = urlParams.get("city");
    var interest = urlParams.get("interest");
    if (city){
        getResults(city, interest);
    }
    console.log(city);
    function getResults(city, interest) {
        $.get("/modelsFoursquare", {city:city,interest:interest}, function(data) {
            console.log(data);
            var jsonData = JSON.parse(data);
            
            //   nameInput.val("");
            for (var i=0; i<jsonData.length; i++){
                console.log(jsonData[i]);
                // console.log(data[i].name);
                var newDiv = $("<div>");
                var newImage = $("<img>");
                var selectImage = Math.ceil(Math.random()*13);
                newImage.attr("src", "/assets/images/hotel" + selectImage + ".jpg");
                newImage.attr("src", "/assets/images/restaurant" + selectImage + ".jpg");
                newDiv.append(newImage);
                var paragrhaph = $("<p>");
                paragrhaph.text(jsonData[i].name);
                newDiv.append(paragrhaph);
                $("#container").append(newDiv);
               
            }
           
            

            $('#container').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3
            });
                      
        });
    }
 
});