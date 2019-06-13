$(document).on("click", ".gif", function()
{
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    console.log("adfadf");
    switch(state)
    {
        case "still":
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            break;
        case "animate":
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            break;
        default:
            break;
    }



});

$(document).on("click", "button", function()
{
    var search = "";
    $("#gStorage").html("");
    
    if(!$(this).hasClass("stored"))//if button has not been made
    {
        search = $("#uInput").val();

        var bStorage = $("#storage");
        var btn = (`<button class= stored data-name = ${search}>` + search);

        bStorage.append(btn);


    }
    else//if the clicked button has already been made
        search = $(this).attr("data-name");

    console.log(search);

    var queryurl = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=sMVkigthnV55D3zCEcY2G1pWAuVXE7OO&limit=10";
    
    $.ajax({
        url: queryurl,
        method: "GET"
    }).then(function(response)
    {
        console.log(response);
        var results = response.data;

        var sepDiv = $(`<tr id="gifPB">`);
        for (var i = 0; i < results.length; i++) 
        {

            var row = $("<td>")

            var p = $("<p>").text("Rating: " + results[i].rating);
            var animalImage = $(`<img src= ${results[i].images.fixed_height.url} data-still=${results[i].images.original_still.url} data-animate= ${results[i].images.fixed_height.url} data-state=animate class=gif>`);
            row.append(p, animalImage);

            if(i % 3 === 0 )
            {
                sepDiv = new $(`<tr id="gifPB">`);

                console.log(i, i %3);
            }
            sepDiv.append(row);
            $("#gStorage").append(sepDiv);


        }
        // sepDiv.append(row);


         
         
    });
});
