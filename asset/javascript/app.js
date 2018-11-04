$(document).ready(function(){
    var topic = ["Bunny","Bears","Jojo","Nature","Anime","Food","Desserts","Candy","Movies","Spiderman","Parkour","Japan"]

    function pullButton(){
        $("#button").empty();
        
        for(var i=0;i<topic.length;i++){

            var newButton = $("<button>")
            newButton.attr("data-number", i)
            .addClass("topicButton")
            .text(topic[i]);

            $("#button").append(newButton);
        }
    }

    pullButton();

    $(".topicButton").click(function(){

        var queryParam = {api_key: "19SOKo8StiKRg3T028H9ycDkZIe4Ssel"}
        queryParam.q = $(this).text();
        queryParam.limit = "10";
        queryParam.rating = "g";
        urlquery = "https://api.giphy.com/v1/gifs/search?"+$.param(queryParam);

            $.ajax({
                url: urlquery,
                method: "GET",
            }).then(function(response){
            
                console.log(response)
                console.log(response.data[0].source_tld)

                for(var j=0;j<response.data.length;j++){
                    var imgsrcStill = response.data[j].images.original_still.url
                    var imgsrcAnimate = response.data[j].images.original.url
                    var imgRating = response.data[j].rating
                    console.log(imgsrcStill)
                    console.log(imgsrcAnimate)
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

    $("button[type='submit']").click(function(e){
        e.preventDefault()
        var newquery = $("#addquery").val()
        var newButton2 = $("<button>")
        topic.push(newquery);
        newButton2.addClass("topicButton")
        .text(newquery);
        $("#button").append(newButton2);
        console.log(topic);

        pullButton()
    })

    $("#refresh").click(function(){

    })

    $("#picture").on("click",".topicPicture",function(){
        var loopCheck = $(this).attr("data-loop");
        var imgStill = $(this).attr("data-still");
        var imgAnimate = $(this).attr("data-animate");
        console.log(loopCheck)
        console.log(imgAnimate+imgStill)
        //Stop
        if(loopCheck === "false"){
            $(this).attr("src", imgAnimate)
            .attr("data-loop", true);
            console.log(loopCheck);
        }
        else{
            console.log(loopCheck);
            $(this).attr("src", imgStill)
            .attr("data-loop", false);
        }
    })

})
