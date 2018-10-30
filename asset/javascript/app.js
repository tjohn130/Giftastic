var topic = ["Bunny","Bears","Jojo","Nature","Anime","Food","Desserts","Candy","Movies","Spiderman","Parkour","Japan"]



urlquery = "https://api.giphy.com/v1/gifs/search?q="+topic[0]+"&limit=20&rating=g&api_key=19SOKo8StiKRg3T028H9ycDkZIe4Ssel";

$.ajax({
    url: urlquery,
    method: "GET",
}).then(function(response){

})