// 1. global variables 
var topics = ["Happy", "Annoyed", "Excited", "Amused", "Content", "Cranky", "Stressed", "Relaxed", "Nervous", "Defeated", "Uncertain", "Hopeful", "Impatient", "Paranoid", "Awesome", "Accomplished"];

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
    $("#add-mood").on("click", function(event) {
        event.preventDefault();

        // grab the text from the input box and trim any extra spaces, then adds to the topics array 
        var topic = $("#mood-input").val().trim();
        topics.push(topic)
    // call function render buttons 
    renderButtons();
    });

    // Calling the renderButtons function at least once to display the initial buttons
    renderButtons();

//3. When the user clicks on of the mood buttons grab 10 static gifs from giphy api and places on page
$("button").on("click", function() {
    var x = $(this).data("name");
    console.log(x);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=on0VHNWeZ9CD3439RIQId67SGJH7LLh7&limit=10";
    $.ajax({url: queryURL,method:"GET"})
        .done(function(response){
        var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " +results[i].rating);
                console.log("Rating: " + results[i].rating);
                var topicImage = $("<img>");
                topicImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(topicImage);
                $("#gif-area").prepend(gifDiv);
          }
        });


    });




