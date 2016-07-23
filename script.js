function returnQuote(json) {
    document.getElementById("quote-text").innerHTML = json.quote;
    document.getElementById("author").innerHTML = json.author;
}


function getRandomQuote() {
    $.ajax({
        dataType: 'jsonp',
        url: 'http://localhost/Cytaty_Nauczycieli/getquote.php',
        jsonpCallback: "returnQuote",
        error: function() {
            console.log("Coś poszło nie tak przy losowaniu:(");
        }
    });
}

function insertQuote($quote, $author){
  console.log("insertQuote");
  $.ajax({
    data: {
      quote: $quote,
      author: $author
    },
      url: 'http://localhost/Cytaty_Nauczycieli/insertquote.php',
      error: function() {
          console.log("Coś poszło nie tak przy wstawianiu :(");
      },
      success: function(){
        console.log("Udało się wstawić!");
      }
  });
}

$(document).ready(function() {
    getRandomQuote();
    $("#generate-btn").on("click", function() {
        getRandomQuote();
    });
});
