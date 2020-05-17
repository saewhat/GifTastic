var topics = ["Avatar: The Last Airbender", "Samurai Jack", "Powerpuff Girls",  "Spongebob Squarepants", "Fairly OddParents", "Teen Titans", "Archer", "The Adventures of Jimmy Neutron", "Kim Possible", "The Boondocks"];

var button;
var newTopics = "";

// this function will create buttons from the 'topics' array
var createButton = function(){

    for (var i=0; i<topics.length; i++) {
        button = $("<button type= button>" + topics[i] + "</button>").addClass("btn btn-primary ml-2 mb-2").attr("data",topics[i]);
            $("#buttonArea").append(button);
    };
}

$("#buttonArea").on("click",function(){
    var cartoons = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search" + cartoons + "&api_key=MRdbFPL3mQjxO5iDgMSWJ1Cgls97KPfn";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var results = reponse.data;

        for (var i = 0; i<results.length; i++) {
            var topicDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);
                
                var topicImage = $("<img>");

                topicImage.attr("src", results[i].images.fixed_height.url);

                topicDiv.append(p);
                topicDiv.append(topicImage);

                $("#gifArea").prepend(topicDiv);


        }
    })
})

createButton();