function returnQuote(json){
  document.getElementById("quote-text").innerHTML = json.quote;
  document.getElementById("author").innerHTML = json.author+Math.floor(Math.random() * 20);
}


function getRandomQuote() {
    $.ajax({
        dataType: 'jsonp',
        url: 'http://localhost/RandomQuoteGenerator/getQuote.php',
        jsonpCallback: "returnQuote",
        error: function() {
        console.log("Coś poszło nie tak :(");
      }
    });
}

$(document).ready(function() {
    getRandomQuote();
    $("#generate-btn").on("click", function() {
        getRandomQuote();
    });
});
