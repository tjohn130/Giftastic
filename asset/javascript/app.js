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
        console.log(queryParam.q);
        queryParam.limit = "10";
        queryParam.rating = "g";
        urlquery = "https://api.giphy.com/v1/gifs/search?"+$.param(queryParam);

            $.ajax({
                url: urlquery,
                method: "GET",
            }).then(function(response){

                for(var j=0;j<response.data.length;j++){
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

    $("button[type='submit']").click(function(e){
        e.preventDefault()
        var newquery = $("#addquery").val()
        newquery = String(newquery)
        var newButton2 = $("<button>")
        topic.push(newquery);
        var datanum = topic.length - 1;
        newButton2.attr("data-number",datanum)

        .addClass("topicButton").bind("click",function(){
            
        var queryParam = {api_key: "19SOKo8StiKRg3T028H9ycDkZIe4Ssel"}
        queryParam.q = $(this).text();
        console.log(queryParam.q);
        queryParam.limit = "10";
        queryParam.rating = "g";
        urlquery = "https://api.giphy.com/v1/gifs/search?"+$.param(queryParam);

            $.ajax({
                url: urlquery,
                method: "GET",
            }).then(function(response){

                for(var j=0;j<response.data.length;j++){
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
        .text(newquery);
        $("#button").append(newButton2);
    })

    $("#refresh").click(function(){

    })

    $("#picture").on("click",".topicPicture",function(){
        var loopCheck = $(this).attr("data-loop");
        var imgStill = $(this).attr("data-still");
        var imgAnimate = $(this).attr("data-animate");
        console.log(loopCheck)
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
