$(document).ready(function(){

    var displayedButtons = ["jet ski", "canoe", "pontoon"];

    function renderButtons(){ 

        $("#buttons").empty();

        for (var i = 0; i < displayedButtons.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("vessel-name", displayedButtons[i]); 
            newButton.text(displayedButtons[i]); 
            $("#buttons").append(newButton); 
        }
    }

    $("#clickSubmitBtn").on("click", function(){

        var input = $("#vessel").val().trim();
        form.reset();
        displayedButtons.push(input);
                
        renderButtons();

        return false;
    })


    function displayImg(){

        $("#images").empty();
        var input = $(this).attr("vessel-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dFvCKxa7i16VqeR2IdykSdB9dKJEUXr3";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var j = 0; j < limit; j++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#images").append(displayDiv);
            }
        });
    }


    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }


    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});