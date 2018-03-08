// 1. global variables 
var topics = ["happy", "sad", "angry", "sick", "excited", "amused", "calm", "content", "annoyed", "cranky", "stressed", "relaxed", "nervous", "defeated", "uncertain", "funny", "hopeful", "impatient", "paranoid", "awesome", "accomplished", "shitty", "pissed"];

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

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();
