var recognition = "false";

var wakeDetection = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition) ();

function WakeDetection() {
    
    wakeDetection.start();
    
    wakeDetection.onresult = function(event) { 
        var detection = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                detection += event.results[i][0].transcript;
            }
        }
        
        if (detection.includes("Athena")) {
            recognition = "true";
            wakeDetection.abort();
            Wake();
        }
    }
    
    wakeDetection.onend = function() {
        if(recognition == "false") {
            wakeDetection.start();
        } else if(recognition == "true") {
            wakeDetection.abort();
        }
    }
}

function Wake() {
    
    var wakeSound = new Audio('assets/sounds/wake.wav');
    
	athena.startRecognition({autoRestart: false, continuous: false});
    wakeSound.play();
    
    athena.addRecognitionCallback('result', function() {
        recognition = "false";
        WakeDetection();
        athena.removeRecognitionCallback('result');
    });
}