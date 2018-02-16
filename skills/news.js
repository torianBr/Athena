/** 
    News Module
    --------------
    Developed by: Anubhav Kashyap
*/

var news = {
    '(*extraInput) tech(no)(logy) (*extraInput) news (*extraInput)': function() {
        getNews('https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=9203f45e5c994212a43821d18d247848').then(function(data) {
            athena.speak('Technology News. Headline 1. ' + data.articles[0].title + '. ' + data.articles[0].description + ' Headline 2. ' + data.articles[1].title + '. ' + data.articles[1].description + 'Headline 3. ' + data.articles[2].title + '. ' + data.articles[2].description + 'Headline 4. ' + data.articles[3].title + '. ' + data.articles[3].description + 'Headline 5. ' + data.articles[4].title + '. ' + data.articles[4].description);

        }, function(status) {
            athena.speak('Sorry, unable to fetch news.');
        });
    },

    '(*extraInput) tech(no)(logy) (*extraInput) headline(s) (*extraInput)': function() {
        getNews('https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=9203f45e5c994212a43821d18d247848').then(function(data) {
            athena.speak('Technology News. Headline 1. ' + data.articles[0].title + '. ' + data.articles[0].description + ' Headline 2. ' + data.articles[1].title + '. ' + data.articles[1].description + 'Headline 3. ' + data.articles[2].title + '. ' + data.articles[2].description + 'Headline 4. ' + data.articles[3].title + '. ' + data.articles[3].description + 'Headline 5. ' + data.articles[4].title + '. ' + data.articles[4].description);

        }, function(status) {
            athena.speak('Sorry, unable to fetch news.');
        });
    },

    '(*extraInput) news (*extraInput)': function() {
        getNews(' https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=9203f45e5c994212a43821d18d247848').then(function(data) {
            athena.speak('Headlines. Headline 1. ' + data.articles[0].title + '. ' + data.articles[0].description + ' Headline 2. ' + data.articles[1].title + '. ' + data.articles[1].description + 'Headline 3. ' + data.articles[2].title + '. ' + data.articles[2].description + 'Headline 4. ' + data.articles[3].title + '. ' + data.articles[3].description + 'Headline 5. ' + data.articles[4].title + '. ' + data.articles[4].description);
        }, function(status) {
            athena.speak('Sorry, unable to fetch news.');
        });
    },

    '(*extraInput) headline(s) (*extraInput)': function() {
        getNews(' https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=9203f45e5c994212a43821d18d247848').then(function(data) {
            athena.speak('Headlines. Headline 1. ' + data.articles[0].title + '. ' + data.articles[0].description + ' Headline 2. ' + data.articles[1].title + '. ' + data.articles[1].description + 'Headline 3. ' + data.articles[2].title + '. ' + data.articles[2].description + 'Headline 4. ' + data.articles[3].title + '. ' + data.articles[3].description + 'Headline 5. ' + data.articles[4].title + '. ' + data.articles[4].description);

        }, function(status) {
            athena.speak('Sorry, unable to fetch news.');
        });
    },
};

var getNews = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
};