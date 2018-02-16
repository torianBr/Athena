var clock = {

    '(*extraInput) timer (*extraInput) :min minute(s) (*extraInput) :sec second(s) (*extraInput)': function(extraInput, extraInput, min, extraInput, sec) {
        athena.speak('Alright. Timer set.');

        var timer;
        var timerSound = new Audio('assets/sounds/timer.mp3');
        var time = parseFloat(min) * 60 + parseFloat(sec);

        timer = setTimeout(function() {
            athena.speak('Time up!');
            timerSound.play();
            timerSound.volume = 0.2;
        }, time * 1000);
    },

    '(*extraInput) timer (*extraInput) :min minute(s) (*extraInput)': function(extraInput, extraInput, min) {
        athena.speak('Alright. Timer set.');

        var timer;
        var timerSound = new Audio('assets/sounds/timer.mp3');
        var time = parseFloat(min) * 60;

        timer = setTimeout(function() {
            athena.speak('Time up!');
            timerSound.play();
            timerSound.volume = 0.2;
        }, time * 1000);
    },

    '(*extraInput) timer (*extraInput) :sec second(s) (*extraInput)': function(extraInput, extraInput, sec) {
        athena.speak('Alright. Timer set.');

        var timer;
        var timerSound = new Audio('assets/sounds/timer.mp3');

        timer = setTimeout(function() {
            athena.speak('Time up!');
            timerSound.play();
            timerSound.volume = 0.2;
        }, sec * 1000);
    },

    '(*extraInput) time (*extraInput)': function() {
        var date = new Date();
        var time = date.toLocaleTimeString('en-GB', {
            hour: "numeric",
            minute: "numeric"
        });
        athena.speak('The time is ' + time);
    },

    '(*extraInput) date (*extraInput)': function() {
        var date = new Date();
        var dates = ["0", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        athena.speak('Today is the' + dates[date.getDate()] + ' of ' + months[date.getMonth()] + ', ' + days[date.getDay()]);
    },

    '(*extraInput) day (*extraInput)': function() {
        var date = new Date();
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        athena.speak('Today is ' + days[date.getDay()]);
    },
};