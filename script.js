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
