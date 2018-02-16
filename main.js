window.onload = function() {
    Load();
    WakeDetection();
};

function Load() {
    
    athena.addCommands(wolframAlpha);
    athena.addCommands(wikipedia);
    athena.addCommands(dictionary);
    athena.addCommands(news);
    athena.addCommands(weather);
    athena.addCommands(query);
    athena.addCommands(clock);
    athena.addCommands(fallback);
}