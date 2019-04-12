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
            var previousImages = [];
            //   nameInput.val("");
            for (var i=0; i<jsonData.length; i++){
                console.log(jsonData[i]);
                // console.log(data[i].name);
                var newDiv = $("<div>");
                var newImage = $("<img>");
                var category = " ";
                if (interest == "hotels" ){
                    category = "hotel";
                }
                else if (interest == "restaurant"){
                    category = "restaurant";
                }
                else if (interest == "coffee"){
                    category = "coffee";
                }
                else if (interest == "shopping"){
                    category = "shopping";
                }
                else if (interest == "museum"){
                    category = "museum";
                }
                
                var selectImage = Math.ceil(Math.random()*15);
                while(previousImages.includes(selectImage)) {
                    selectImage = Math.ceil(Math.random()*15);
                }
                previousImages.push(selectImage);
                newImage.attr("src", "/assets/images/" + category + selectImage + ".jpg");
                newDiv.append(newImage);
                var paragraph = $("<h4>");
                paragraph.text(jsonData[i].name);
                var paragraphAddress = $("<p>");
                paragraphAddress.text(jsonData[i].address)
                newDiv.append(paragraph);
                newDiv.append(paragraphAddress);
                $("#fs_container").append(newDiv);
               
            }
           
            

            $('#fs_container').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3
            });
                      
        });
    }
 
});