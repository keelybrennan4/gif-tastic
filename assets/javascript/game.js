// 1. global variables 
var topics = ["Happy", "Annoyed", "Excited", "Amused", "Content", "Cranky", "Stressed", "Relaxed", "Nervous", "Defeated", "Hopeful", "Impatient", "Paranoid", "Awesome", "Accomplished"];

// 2. create buttons in HTML by using a loop that appends a button for each string in the array
function renderButtons() {
    $("#moods-view").empty();
    for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
        newButton.addClass("mood");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#moods-view").append(newButton);
    }
}
// call function render buttons to display initial topics array
renderButtons();

//
$("#add-mood").on("click", function() {
    event.preventDefault();
    // grab the text from the input box and trim any extra spaces, then adds to the topics array 
    var topic = $("#mood-input").val().trim();
    topics.push(topic)
    console.log(topic);
    renderButtons();
})

//3. When the user clicks on of the mood buttons grab 10 static gifs from giphy api and places on page
    $(document).on("click", "button", function() {
    var x = $(this).data("name");
        console.log($(this));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=on0VHNWeZ9CD3439RIQId67SGJH7LLh7&limit=10";
    $.ajax({url: queryURL,
        method:"GET"
    })
    .then(function(response){
    console.log(response);
        var results = response.data;
               
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " +results[i].rating);
                
                //add attributes to gifs on page to set to animate or still 
                var topicImage = $("<img>");
                gifDiv.append(topicImage);
                gifDiv.append(p);
                $("#gif-area").prepend(gifDiv);
                var gifObj = response.data[i];
                var gif = gifObj.images;
                
                topicImage.attr({
                    src: gif.fixed_height_still.url,
                    "data-animate": gif.fixed_height.url,
                    "data-still" : gif.fixed_height_still.url,
                    "data-state": "still", 
                    class: "gif",
                });
               
                // gifs should change from still to animated when clicked, back to animated when clicked again. 
                $(topicImage).on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                });   
            };
    })
});
