    var query = {
        '(*extraInput) who (*extraInput) (is) (was) (were) (are) *input': function(extraInput, extraInput, input) {
            $.ajax({
                type: "GET",
                url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&iwurl=1&titles=" + input + "&utf8=1&exsentences=3&exintro=1&explaintext=1&callback=?",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data, textStatus, jqXHR) {
                    $.each(data.query.pages, function(i, item) {
                        if (data.query.pages["-1"] || item.extract == "" || item.extract.includes("may refer to") || item.extract.includes("this is a redirect")) {
                            $.ajax({
                                type: "GET",
                                url: "https://api.wolframalpha.com/v2/query?input=" + input + "&format=plaintext&output=JSON&podindex=2&appid=T77VJY-THYXUW9LX2&callback=?",
                                contentType: "application/json; charset=utf-8",
                                async: false,
                                dataType: "json",
                                success: function(data, textStatus, jqXHR) {
                                    if (!data.queryresult.success || data.queryresult.pods["0"].subpods["0"].plaintext.includes("data not available"))
                                        athena.speak("I am sorry, I did not understand.");
                                    else athena.speak(data.queryresult.pods["0"].subpods["0"].plaintext);
                                },
                            });
                        } else {
                            athena.speak(item.extract);
                        }
                    });
                }
            });
        },

        '(*extraInput) what (*extraInput) (is) (was) (were) (are) (the) *input': function(extraInput, extraInput, input) {
            $.ajax({
                type: "GET",
                url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&iwurl=1&titles=" + input + "&utf8=1&exsentences=3&exintro=1&explaintext=1&callback=?",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data, textStatus, jqXHR) {
                    $.each(data.query.pages, function(i, item) {
                        if (data.query.pages["-1"] || item.extract == "" || item.extract.includes("may refer to") || item.extract.includes("this is a redirect")) {
                            $.ajax({
                                type: "GET",
                                url: "https://api.wolframalpha.com/v2/query?input=" + input + "&format=plaintext&output=JSON&podindex=2&appid=T77VJY-THYXUW9LX2&callback=?",
                                contentType: "application/json; charset=utf-8",
                                async: false,
                                dataType: "json",
                                success: function(data, textStatus, jqXHR) {
                                    if (!data.queryresult.success || data.queryresult.pods["0"].subpods["0"].plaintext.includes("data not available"))
                                        athena.speak("I am sorry, I did not understand.");
                                    else athena.speak(data.queryresult.pods["0"].subpods["0"].plaintext);
                                },
                            });
                        } else {
                            athena.speak(item.extract);
                        }
                    });
                }
            });
        },

        '(*extraInput) when *input': function(extraInput, input) {
            $.ajax({
                type: "GET",
                url: "https://api.wolframalpha.com/v2/query?input=" + input + "&format=plaintext&output=JSON&podindex=2&appid=T77VJY-THYXUW9LX2&callback=?",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data, textStatus, jqXHR) {
                    if (!data.queryresult.success || data.queryresult.pods["0"].subpods["0"].plaintext.includes("data not available"))
                        athena.speak("I am sorry, I did not understand.");
                    else athena.speak(data.queryresult.pods["0"].subpods["0"].plaintext);
                },
            });
        },

        '(*extraInput) why *input': function(extraInput, input) {
            $.ajax({
                type: "GET",
                url: "https://api.wolframalpha.com/v2/query?input=" + input + "&format=plaintext&output=JSON&podindex=2&appid=T77VJY-THYXUW9LX2&callback=?",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data, textStatus, jqXHR) {
                    if (!data.queryresult.success || data.queryresult.pods["0"].subpods["0"].plaintext.includes("data not available"))
                        athena.speak("I am sorry, I did not understand.");
                    else athena.speak(data.queryresult.pods["0"].subpods["0"].plaintext);
                },
            });
        },

        '(*extraInput) where *input': function(extraInput, input) {
            $.ajax({
                type: "GET",
                url: "https://api.wolframalpha.com/v2/query?input=" + input + "&format=plaintext&output=JSON&podindex=2&appid=T77VJY-THYXUW9LX2&callback=?",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data, textStatus, jqXHR) {
                    if (!data.queryresult.success || data.queryresult.pods["0"].subpods["0"].plaintext.includes("data not available"))
                        athena.speak("I am sorry, I did not understand.");
                    else athena.speak(data.queryresult.pods["0"].subpods["0"].plaintext);
                },
            });
        },
    };