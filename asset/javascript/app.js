$(document).ready(function(){
    var topic = ["Bunny","Bears","Jojo","Nature","Anime","Food","Desserts","Candy","Movies","Spiderman","Parkour","Japan"]

    function pullButton(){
        
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
                    console.log(imgsrcStill)
                    console.log(imgsrcAnimate)
                    var newimg = $("<img>")
                    newimg.addClass("topicPicture")
                    .attr("src", imgsrcStill)
                    .attr("data-loop", false)
                    .attr("data-still", imgsrcStill)
                    .attr("data-animate",imgsrcAnimate);
                    $("#picture").prepend(newimg);
                }
            })  
            
    })

    $("#picture").on("click",".topicPicture",function(){
        var loopCheck = $(this).attr("data-loop");
        var imgStill = $(this).attr("data-still");
        var imgAnimate = $(this).attr("data-animate");
        console.log(loopCheck)
        console.log(imgAnimate+imgStill)
        //Stop
        if(loopCheck == false){
            $(this).attr("src", imgAnimate);
            console.log($(this).attr("src", imgAnimate))


        }
        
        
    })

})
