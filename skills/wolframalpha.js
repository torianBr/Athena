var wolframAlpha = {
    '(*extraInput) Wolfram Alpha *input': function(extraInput, input) {
        $.ajax({
            type: "GET",
            url: "https://api.wolframalpha.com/v2/query?input=" + input + "&format=plaintext&output=JSON&podindex=2&appid=T77VJY-THYXUW9LX2&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                athena.speak(data.queryresult.pods["0"].subpods["0"].plaintext);
            }
        });
    },

    '(*extraInput) search (for) *text (in)(on) Wolfram Alpha': function(extraInput, text) {
        $.ajax({
            type: "GET",
            url: "https://api.wolframalpha.com/v2/query?input=" + input + "&format=plaintext&output=JSON&podindex=2&appid=T77VJY-THYXUW9LX2&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                athena.speak(data.queryresult.pods["0"].subpods["0"].plaintext);
            }
        });
    },
};