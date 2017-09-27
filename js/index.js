var breakLength = 5;
var sessionLength = 25;
var timerTimeRemainingInSecs = sessionLength * 60;
var timerActive = false;
var isSession = true; // vs break
var timerInterval

$('#break-add').on('click', function() {
  if(breakLength < 15) {
    breakLength += 1;
    $('#break-length').text(breakLength);
    if(!isSession) {
      timerTimeRemainingInSecs = breakLength * 60;
      $('#timer-time').text(breakLength + ":00");
    }
  }
});

$('#break-subtract').on('click', function() {
  if(breakLength > 1) {
    breakLength -= 1;
    $('#break-length').text(breakLength);
    if(!isSession) {
      timerTimeRemainingInSecs = breakLength * 60;
      $('#timer-time').text(breakLength + ":00");
    }
  }
});

$('#session-add').on('click', function() {
  if(sessionLength < 120) {
    sessionLength += 1;
    timerTimeRemainingInSecs = sessionLength * 60;
    $('#session-length').text(sessionLength);
    $('#timer-time').text(sessionLength + ":00");
  }
});

$('#session-subtract').on('click', function() {
  if(sessionLength > 1) {
    sessionLength -= 1;
    timerTimeRemainingInSecs = sessionLength * 60;
    $('#session-length').text(sessionLength);
    $('#timer-time').text(sessionLength + ":00");
  }
});

$('#timer').on('click', function() {
  if(!timerActive) {
    var display = $('#timer-time');
    disableSessionLengthButtons();
    disableBreakLengthButtons();
    startTimer(timerTimeRemainingInSecs - 1, display);
    //timerInterval = setInterval(timer, 1000);
  } else {
    clearInterval(timerInterval);
    if (isSession) {
      enableSessionLengthButtons();
    }
    enableBreakLengthButtons();
  }
  timerActive = !timerActive;
});

// from https://stackoverflow.com/a/20618517/5884811
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.text(minutes + ":" + seconds);
    
    if(isSession) {
      var backgroundWhitePercent = (timerTimeRemainingInSecs/(sessionLength*60)) * 100;
      var timerColor = "#A2DED0";
    } else {
      var backgroundWhitePercent = (timerTimeRemainingInSecs/(breakLength*60)) * 100;
      var timerColor = "#EC644B";
    }
    $('#timer').css({"background": "linear-gradient(gray " + backgroundWhitePercent + "%, " + timerColor + " 0%)"});
    timerTimeRemainingInSecs--;
    
    if (--timer < 0) {
      if(isSession) {
        timer = breakLength * 60;
        timerTimeRemainingInSecs = breakLength * 60;
        $('#timer-text').text("Break!");
      } else {
        timer = sessionLength * 60;
        timerTimeRemainingInSecs = sessionLength * 60;
        $('#timer-text').text("Session");
      }
      isSession = !isSession;
    }
  }, 10);
}

function disableSessionLengthButtons() {
  $('#session-add').prop('disabled', true);
  $('#session-subtract').prop('disabled', true);
}

function enableSessionLengthButtons() {
  $('#session-add').prop('disabled', false);
  $('#session-subtract').prop('disabled', false);
}

function disableBreakLengthButtons() {
  $('#break-add').prop('disabled', true);
  $('#break-subtract').prop('disabled', true);
}

function enableBreakLengthButtons() {
  $('#break-add').prop('disabled', false);
  $('#break-subtract').prop('disabled', false);
}

function addOneToLength(lengthLabelId, lengthVar) {
  var prevBreakLength = parseInt($('#break-length').text());
  breakLength = prevBreakLength + 1;
  $('#break-length').text(breakLength);
}