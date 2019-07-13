$(document).ready(function(){
    // Array for the #button id
    var topic = ["Bunny","Bears","Jojo","Nature","Anime","Food","Desserts","Candy","Movies","Spiderman","Parkour","Japan"]
    // Function adds buttons elements to #button id 
    function pullButton(){
        $("#button").empty();
        for (var i=0;i<topic.length;i++){
            var newButton = $("<button>")

            newButton.attr("data-number", i)
            .addClass("topicButton")
            .text(topic[i]);
            $("#button").append(newButton);
        }
    }
    pullButton();
    //Runs API call on the button press from #button id
    $(".topicButton").click(function(){
        //Builds the query search
        var queryParam = {api_key: "19SOKo8StiKRg3T028H9ycDkZIe4Ssel"}
        var addRating = $("input:radio[name='addrating']:checked").val()
        var addLimit = $("[name='addlimit']").val()

        addLimit = String(addLimit)
        addRating = String(addRating)
        queryParam.q = $(this).text();
        queryParam.limit = addLimit;
        queryParam.rating = addRating;
        urlquery = "https://api.giphy.com/v1/gifs/search?"+$.param(queryParam);
        //API Call
        $.ajax({
            url: urlquery,
            method: "GET",
        }).then(function(response) {
            //Pulls data from API response
            for (var j=0;j<response.data.length;j++) {
                var imgsrcStill = response.data[j].images.original_still.url
                var imgsrcAnimate = response.data[j].images.original.url
                var imgRating = response.data[j].rating
                var newp = $("<p>")
                var newimg = $("<img>")

                newimg.addClass("topicPicture")
                .attr("src", imgsrcStill)
                .attr("width","300px")
                .attr("data-loop", false)
                .attr("data-still", imgsrcStill)
                .attr("data-animate",imgsrcAnimate);
                newp.append(newimg).append("<p class='text-center'> Rating: "+imgRating+"</p>");
                $("#picture").prepend(newp);
            }
        })  
    })
    //API call that add a new query button
    $("button[type='submit']").click(function(e){
        e.preventDefault()
        var newquery = $("#addquery").val()
        var newButton2 = $("<button>")
        var datanum = topic.length - 1;
        var addRating = $("input:radio[name='addrating']:checked").val()
        var addLimit = $("[name='addlimit']").val()

        addLimit = String(addLimit)
        addRating = String(addRating)
        newquery = String(newquery)
        topic.push(newquery);
        newButton2.attr("data-number",datanum)
        .addClass("topicButton").bind("click",function() {
            var queryParam = {api_key: "19SOKo8StiKRg3T028H9ycDkZIe4Ssel"}
            queryParam.q = $(this).text();
            queryParam.limit = addLimit;
            queryParam.rating = addRating;
            urlquery = "https://api.giphy.com/v1/gifs/search?"+$.param(queryParam);
            $.ajax({
                url: urlquery,
                method: "GET",
            }).then(function(response){
                for (var j=0;j<response.data.length;j++) {
                    var imgsrcStill = response.data[j].images.original_still.url
                    var imgsrcAnimate = response.data[j].images.original.url
                    var imgRating = response.data[j].rating
                    var newp = $("<p>")
                    var newimg = $("<img>")

                    newimg.addClass("topicPicture")
                    .attr("src", imgsrcStill)
                    .attr("width","300px")
                    .attr("data-loop", false)
                    .attr("data-still", imgsrcStill)
                    .attr("data-animate",imgsrcAnimate);
                    newp.append(newimg).append("<p class='text-center'> Rating: "+imgRating+"</p>");
                    $("#picture").prepend(newp);
                }
            })  
        }).text(newquery);
        $("#button").append(newButton2);
    })
    //Clear the pages
    $("#refresh").click(function(e){
        e.preventDefault()
        $("input#addquery").val('')
        $("#picture").empty();
        $("#button").empty();
        topic = [];
    })
    //Animates the picture on click
    $("#picture").on("click",".topicPicture",function(){
        var loopCheck = $(this).attr("data-loop");
        var imgStill = $(this).attr("data-still");
        var imgAnimate = $(this).attr("data-animate");
        //Stop
        if (loopCheck === "false"){
            $(this).attr("src", imgAnimate)
            .attr("data-loop", true);
        }
        else{
            $(this).attr("src", imgStill)
            .attr("data-loop", false);
        }
    })
})
