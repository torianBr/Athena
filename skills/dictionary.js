var dictionary = {
    '(*extraInput) meaning of (the word) *text': function(extraInput, text) {
        var dict = PearsonApis.dictionaries("eZbCFNFTGsILAAb90iq1E0QshLP56Hjp");
        var entries = dict.entries;

        var searchobj = {
            headword: text
        };
        entries.setDatasets("ldoce5", "laad3");
        var data = entries.search(searchobj);
        athena.speak(data.results[0].headword + ", " + data.results[0].senses[0].definition + ".");
    },

    '(*extraInput) definition of (the word) *text': function(extraInput, text) {
        var dict = PearsonApis.dictionaries("eZbCFNFTGsILAAb90iq1E0QshLP56Hjp");
        var entries = dict.entries;

        var searchobj = {
            headword: text
        };
        entries.setDatasets("ldoce5", "laad3");
        var data = entries.search(searchobj);
        athena.speak(data.results[0].headword + ", " + data.results[0].senses[0].definition + ".");
    },

    '(*extraInput) define (the word) *text': function(extraInput, text) {
        var dict = PearsonApis.dictionaries("eZbCFNFTGsILAAb90iq1E0QshLP56Hjp");
        var entries = dict.entries;

        var searchobj = {
            headword: text
        };
        entries.setDatasets("ldoce5", "laad3");
        var data = entries.search(searchobj);
        athena.speak(data.results[0].headword + ", " + data.results[0].senses[0].definition + ".");
    },

    '*text meaning (*extraInput)': function(text) {
        var dict = PearsonApis.dictionaries("eZbCFNFTGsILAAb90iq1E0QshLP56Hjp");
        var entries = dict.entries;

        var searchobj = {
            headword: text
        };
        entries.setDatasets("ldoce5", "laad3");
        var data = entries.search(searchobj);
        athena.speak(data.results[0].headword + ", " + data.results[0].senses[0].definition + ".");
    },

    '(*extraInput) does (the word) *text mean (*extraInput)': function(extraInput, text) {
        var dict = PearsonApis.dictionaries("eZbCFNFTGsILAAb90iq1E0QshLP56Hjp");
        var entries = dict.entries;

        var searchobj = {
            headword: text
        };
        entries.setDatasets("ldoce5", "laad3");
        var data = entries.search(searchobj);
        athena.speak(data.results[0].headword + ", " + data.results[0].senses[0].definition + ".");
    },

    '(*extraInput) the word *text means (*extraInput)': function(extraInput, text) {
        var dict = PearsonApis.dictionaries("eZbCFNFTGsILAAb90iq1E0QshLP56Hjp");
        var entries = dict.entries;

        var searchobj = {
            headword: text
        };
        entries.setDatasets("ldoce5", "laad3");
        var data = entries.search(searchobj);
        athena.speak(data.results[0].headword + ", " + data.results[0].senses[0].definition + ".");
    },
};

var PearsonApis = (function() {

    var Apis = {
        dictionaries: function(apikey) {
            return new Pearson(apikey).dictionaries();
        },
        travel: function(apikey) {
            return new Pearson(apikey).travel();
        },
        foodanddrink: function(apikey) {
            return new Pearson(apikey).foodanddrink();
        },
        ftarticles: function(apikey) {
            return new Pearson(apikey).ftarticles();
        }
    };

    function Pearson(apikey) {
        'use strict';
        this.apikey = apikey;
        this.base = "http://api.pearson.com/v2/"
        return this;
    };

    Pearson.prototype.dictionaries = function() {
        'use strict';
        this.api = "dictionaries";
        this.url = this.base + this.api + "/";
        this.entries = new Endpoint(this, "entries");
        return this;
    };

    Pearson.prototype.setDatasets = function() {

        var args;
        var split;
        var stripped;
        var args = Array.prototype.slice.call(arguments);
        split = args.join(",");
        stripped = split.replace(/\s+/g, "");
        this.dsets = stripped;
        return this;
    };

    Pearson.prototype.expandUrl = function(url) {
        'use strict';
        var itemUrl;
        var prepend = "http://api.pearson.com"
        if (typeof this.apikey === "undefined") {
            itemUrl = prepend + url
        } else {
            itemUrl = prepend + url + "?apikey=" + this.apikey;
        };
        return itemUrl;
    };

    function Endpoint(pearson, path) {
        this.pearson = pearson;
        this.path = path;
    };

    Endpoint.prototype.setDatasets = function() {
        var args;
        var split;
        var stripped;
        var args = Array.prototype.slice.call(arguments);
        split = args.join(",");
        stripped = split.replace(/\s+/g, "");
        this.pearson.dsets = stripped;
        return this;
    };

    Endpoint.prototype.search = function(json, offset, limit) {
        'use strict';
        var query;
        var fullUrl;
        if (typeof json === 'undefined') {
            json = {}
        }
        json.limit = limit || 10;
        json.offset = offset || 0;
        if (typeof this.pearson.apikey === "undefined") {
            query = $.param(json);
            this.query = query;
        } else {
            json.apikey = this.pearson.apikey;
            query = $.param(json);
            this.query = query;
        };
        if (typeof this.pearson.dsets === "undefined" || this.pearson.dsets == "") {
            fullUrl = this.pearson.url + this.path + "?" + query;
        } else {
            fullUrl = this.pearson.url + this.pearson.dsets + "/" + this.path + "?" + query;
        };
        return grab(fullUrl);
    };

    Endpoint.prototype.getById = function(Id) {
        'use strict';
        var fullUrl = this.pearson.url + this.path + "/" + Id;
        if (typeof this.pearson.apikey !== "undefined" && this.pearson.apikey != "") {
            fullUrl = fullUrl + "?apikey=" + this.pearson.apikey
        }
        return grab(fullUrl);
    };

    Endpoint.prototype.expandUrl = function(url) {
        'use strict';
        var itemUrl;
        var prepend = "http://api.pearson.com"
        if (typeof this.pearson.apikey === "undefined") {
            itemUrl = prepend + url
        } else {
            itemUrl = prepend + url + "?apikey=" + this.pearson.apikey;
        };
        return itemUrl;
    };

    function grab(url) {
        var result;
        $.ajax({
            url: url,
            type: 'GET',
            timeout: 1000,
            dataType: "json",
            async: false,
            crossDomain: true,
            success: function(data) {
                result = data;
            },
            error: function(x, t, m) {
                if (t === 'timeout') {
                    result = {
                        status: 500,
                        message: "Timeout error"
                    };
                } else {
                    result = x.responseText;
                }
            }
        });
        return result;
    };
    return Apis;
}());