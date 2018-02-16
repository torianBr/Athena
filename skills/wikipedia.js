/** 
    Wikipedia Module
    --------------
    Developed by: Anubhav Kashyap
*/

var wikipedia = {
    '(*extraInput) article (on) (about) *input': function(extraInput, input) {
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&iwurl=1&titles=" + input + "&utf8=1&exsentences=3&exintro=1&explaintext=1&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                $.each(data.query.pages, function(i, item) {
                    if (data.query.pages["-1"] || item.extract == "" || item.extract.includes("may refer to") || item.extract.includes("this is a redirect")) {
                        athena.speak("I wasn't able to find an article on that topic.");
                    } else {
                        athena.speak(item.extract);
                    }
                });
            }
        });
    },

    '(*extraInput) Wikipedia *input': function(extraInput, input) {
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&iwurl=1&titles=" + input + "&utf8=1&exsentences=3&exintro=1&explaintext=1&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                $.each(data.query.pages, function(i, item) {
                    if (data.query.pages["-1"] || item.extract == "" || item.extract.includes("may refer to") || item.extract.includes("this is a redirect")) {
                        athena.speak("I wasn't able to find an article on that topic.");
                    } else {
                        athena.speak(item.extract);
                    }
                });
            }
        });
    },

    '(*extraInput) (search) (for) *input (in)(on) Wikipedia': function(extraInput, input) {
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&iwurl=1&titles=" + input + "&utf8=1&exsentences=3&exintro=1&explaintext=1&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                $.each(data.query.pages, function(i, item) {
                    if (data.query.pages["-1"] || item.extract == "" || item.extract.includes("may refer to") || item.extract.includes("this is a redirect")) {
                        athena.speak("I wasn't able to find an article on that topic.");
                    } else {
                        athena.speak(item.extract);
                    }
                });
            }
        });
    },
};