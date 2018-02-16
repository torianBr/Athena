var speech = new Audio();
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) { 
    define([], function () {
      return (root.athena = factory(root));
    });
  } else if (typeof module === 'object' && module.exports) { 
    module.exports = factory(root);
  } else { // Browser globals
    root.athena = factory(root);
  }
}(typeof window !== 'undefined' ? window : this, function (root, undefined) {
  'use strict';

  var athena;

  var SpeechRecognition = root.SpeechRecognition ||
                          root.webkitSpeechRecognition ||
                          root.mozSpeechRecognition ||
                          root.msSpeechRecognition ||
                          root.oSpeechRecognition;

  if (!SpeechRecognition) {
    return null;
  }

  var commandsList = [];
  var recognition;
  var callbacks = { start: [], error: [], end: [], soundstart: [], result: [], resultMatch: [], resultNoMatch: [], errorNetwork: [], errorPermissionBlocked: [], errorPermissionDenied: [] };
  var autoRestart;
  var lastStartedAt = 0;
  var autoRestartCount = 0;
  var debugState = false;
  var debugStyle = 'font-weight: bold; color: #00f;';
  var pauseListening = false;
  var isListening = false;

  var optionalParam = /\s*\((.*?)\)\s*/g;
  var optionalRegex = /(\(\?:[^)]+\))\?/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#]/g;
  var commandToRegExp = function(command) {
    command = command.replace(escapeRegExp, '\\$&')
                  .replace(optionalParam, '(?:$1)?')
                  .replace(namedParam, function(match, optional) {
                    return optional ? match : '([^\\s]+)';
                  })
                  .replace(splatParam, '(.*?)')
                  .replace(optionalRegex, '\\s*$1?\\s*');
    return new RegExp('^' + command + '$', 'i');
  };

  var invokeCallbacks = function(callbacks, ...args) {
    callbacks.forEach(function(callback) {
      callback.callback.apply(callback.context, args);
    });
  };

  var isInitialized = function() {
    return recognition !== undefined;
  };

  var logMessage = function(text, extraParameters) {
    if (text.indexOf('%c') === -1 && !extraParameters) {
      console.log(text);
    } else {
      console.log(text, extraParameters || debugStyle);
    }
  };

  var initIfNeeded = function() {
    if (!isInitialized()) {
      athena.init({}, false);
    }
  };

  var registerCommand = function(command, callback, originalPhrase) {
    commandsList.push({ command, callback, originalPhrase });
    if (debugState) {
      logMessage('Command successfully loaded: %c'+originalPhrase, debugStyle);
    }
  };

  var parseResults = function(results) {
    invokeCallbacks(callbacks.result, results);
    var commandText;
    for (let i = 0; i<results.length; i++) {
      commandText = results[i].trim();
      if (debugState) {
        logMessage('Speech recognized: %c'+commandText, debugStyle);
      }

      for (let j = 0, l = commandsList.length; j < l; j++) {
        var currentCommand = commandsList[j];
        var result = currentCommand.command.exec(commandText);
        if (result) {
          var parameters = result.slice(1);
          if (debugState) {
            logMessage('command matched: %c'+currentCommand.originalPhrase, debugStyle);
            if (parameters.length) {
              logMessage('with parameters', parameters);
            }
          }
          currentCommand.callback.apply(this, parameters);
          invokeCallbacks(callbacks.resultMatch, commandText, currentCommand.originalPhrase, results);
          return;
        }
      }
    }
    invokeCallbacks(callbacks.resultNoMatch, results);
  };

  athena = {

    init: function(commands, resetCommands = true) {
      if (recognition && recognition.abort) {
        recognition.abort();
      }

      recognition = new SpeechRecognition();

      recognition.maxAlternatives = 5;
      recognition.continuous = root.location.protocol === 'http:';

      recognition.lang = 'en-US';

      recognition.onstart = function() {
        isListening = true;
        invokeCallbacks(callbacks.start);
      };

      recognition.onsoundstart = function() {
        invokeCallbacks(callbacks.soundstart);
      };

      recognition.onerror = function(event) {
        invokeCallbacks(callbacks.error, event);
        switch (event.error) {
        case 'network':
          invokeCallbacks(callbacks.errorNetwork, event);
          break;
        case 'not-allowed':
        case 'service-not-allowed':
          autoRestart = false;
          if (new Date().getTime()-lastStartedAt < 200) {
            invokeCallbacks(callbacks.errorPermissionBlocked, event);
          } else {
            invokeCallbacks(callbacks.errorPermissionDenied, event);
          }
          break;
        }
      };

      recognition.onend = function() {
        isListening = false;
        invokeCallbacks(callbacks.end);
        if (autoRestart) {
          var timeSinceLastStart = new Date().getTime()-lastStartedAt;
          autoRestartCount += 1;
          if (autoRestartCount % 10 === 0) {
            if (debugState) {
              logMessage('Speech Recognition is repeatedly stopping and starting.');
            }
          }
          if (timeSinceLastStart < 1000) {
            setTimeout(function() {
              athena.start({ paused: pauseListening });
            }, 1000-timeSinceLastStart);
          } else {
            athena.start({ paused: pauseListening });
          }
        }
      };

      recognition.onresult = function(event) {
        if(pauseListening) {
          if (debugState) {
            logMessage('Speech heard, but athena is paused');
          }
          return false;
        }
          
        var SpeechRecognitionResult = event.results[event.resultIndex];
        var results = [];
        for (let k = 0; k<SpeechRecognitionResult.length; k++) {
          results[k] = SpeechRecognitionResult[k].transcript;
        }

        parseResults(results);
      };

      if (resetCommands) {
        commandsList = [];
      }
      if (commands.length) {
        this.addCommands(commands);
      }
    },

    startRecognition: function(options) {
      initIfNeeded();
      options = options || {};
      if (options.paused !== undefined) {
        pauseListening = !!options.paused;
      } else {
        pauseListening = false;
      }
      if (options.autoRestart !== undefined) {
        autoRestart = !!options.autoRestart;
      } else {
        autoRestart = true;
      }
      if (options.continuous !== undefined) {
        recognition.continuous = !!options.continuous;
      }

      lastStartedAt = new Date().getTime();
      try {
        recognition.start();
      } catch(e) {
        if (debugState) {
          logMessage(e.message);
        }
      }
    },

    abortRecogniton: function() {
      autoRestart = false;
      autoRestartCount = 0;
      if (isInitialized()) {
        recognition.abort();
      }
    },
      
    debug: function(newState = true) {
      debugState = !!newState;
    },

    setLanguage: function(language) {
      initIfNeeded();
      recognition.lang = language;
    },

    addCommands: function(commands) {
      var cb;

      initIfNeeded();

      for (let phrase in commands) {
        if (commands.hasOwnProperty(phrase)) {
          cb = root[commands[phrase]] || commands[phrase];
          if (typeof cb === 'function') {
            registerCommand(commandToRegExp(phrase), cb, phrase);
          } else if (typeof cb === 'object' && cb.regexp instanceof RegExp) {
            registerCommand(new RegExp(cb.regexp.source, 'i'), cb.callback, phrase);
          } else {
            if (debugState) {
              logMessage('Can not register command: %c'+phrase, debugStyle);
            }
            continue;
          }
        }
      }
    },

    removeCommands: function(commandsToRemove) {
      if (commandsToRemove === undefined) {
        commandsList = [];
      } else {
        commandsToRemove = Array.isArray(commandsToRemove) ? commandsToRemove : [commandsToRemove];
        commandsList = commandsList.filter(command => {
          for (let i = 0; i<commandsToRemove.length; i++) {
            if (commandsToRemove[i] === command.originalPhrase) {
              return false;
            }
          }
          return true;
        });
      }
    },
      
    addRecognitionCallback: function(type, callback, context) {
      var cb = root[callback] || callback;
      if (typeof cb === 'function' && callbacks[type] !== undefined) {
        callbacks[type].push({callback: cb, context: context || this});
      }
    },
      
    removeRecognitionCallback: function(type, callback) {
      var compareWithCallbackParameter = function(cb) {
        return cb.callback !== callback;
      };
      for (let callbackType in callbacks) {
        if (callbacks.hasOwnProperty(callbackType)) {
          if (type === undefined || type === callbackType) {
            if (callback === undefined) {
              callbacks[callbackType] = [];
            } else {
              callbacks[callbackType] = callbacks[callbackType].filter(compareWithCallbackParameter);
            }
          }
        }
      }
    },

    trigger: function(sentences) {
      if(!athena.isListening()) {
        if (debugState) {
          if (!isListening) {
            logMessage('Cannot trigger while athena is aborted');
          } else {
            logMessage('Speech heard, but athena is paused');
          }
        }
        return;
      }

      if (!Array.isArray(sentences)) {
        sentences = [sentences];
      }

      parseResults(sentences);
    },
      
    speak: function(text) {
        speech.src = "https://code.responsivevoice.org/getvoice.php?t="+text; 
        speech.play();
    }
  };

  return athena;

}));