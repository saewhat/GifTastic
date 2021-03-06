// dynamic button array
var topics = ["Avatar: The Last Airbender", "Samurai Jack", "Powerpuff Girls",  "Spongebob Squarepants", "Fairly OddParents", "Teen Titans", "Archer", "Jimmy Neutron", "Kim Possible", "The Boondocks"];

var button;
var topic = "";

// this function will create buttons from the 'topics' array
var createButton = function(){
    
    $("#buttonArea").empty();
    
    for (var i=0; i<topics.length; i++) {
        button = $("<button type= button>" + topics[i] + "</button>").addClass("btn btn-primary ml-2 mb-2").attr("data",topics[i]);
            $("#buttonArea").append(button);
    };
}

$("#buttonArea").on("click",".btn",function(){
    var cartoons = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoons + 
        "&api_key=MRdbFPL3mQjxO5iDgMSWJ1Cgls97KPfn&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function(response) {
        console.log(response);
        // this clears the page of GIFs before a new topic is selected
        $("#gifArea").empty();

        var results = response.data;

        for (var i = 0; i<results.length; i++) {

            // this will prevent GIFs rated PG-13 & R from showing
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var topicDiv = $("<div class='gifs'>");
                var rating = results[i].rating;

                var p = $("<p>").html("<i>Rating: </i>" + results[i].rating);
                var topicImage = $("<img>");

                // this adds the 'animation' attributes onto the GIFs so it can be toggled
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.addClass("gif");
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");

                topicDiv.append(p);
                topicDiv.append(topicImage);

                $("#gifArea").prepend(topicDiv);
            }

        };
    });
})

$("#gifArea").on("click",".gif",function(){
    event.preventDefault();
    var state = $(this).attr("data-state");
        if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
});

// this will add whatever was entered into the 'Add a Cartoon' field once submit is clicked onto the list of buttons
$("#submitButton").on("click",function(){
    event.preventDefault();

    topic = $("#cartoon-input").val().trim();
    topics.push(topic);
    console.log(topics);
    
    createButton();
})

createButton();