function clickHandler(event) {
  console.log("clickHandler");
  if (event) {
    var $terminalCmd = $('#terminalCmd');
    var rect = $terminalCmd.position();
    console.log('rect: ' + JSON.stringify(rect, null, 2));
    var diffX = event.screenX - event.clientX;
    var diffY = event.screenY - event.clientY;
    var alpha = 5;
    var optionJson = JSON.stringify({
        x: (rect.left + diffX + alpha).toFixed(0),
        y: (rect.top + diffY + alpha).toFixed(0)
    });
    console.log('optionJson: ' + JSON.stringify(optionJson, null, 2));
    var optionString = encodeURIComponent(optionJson);
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://localhost:3000/apis/terminal?option=" + optionString,
        cache: false,
        success: function (data) { },
        error: function (xhr, status, err) { }
    });
  } else {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://localhost:3000/apis/terminal",
        cache: false,
        success: function (data) { },
        error: function (xhr, status, err) { }
    });
  }
}

function installCmd() {
  console.log("installCmd");
  var $terminalCmd = $('#terminalCmd');
  $terminalCmd.click(clickHandler);
}

function startAnnyYang() {
  if (annyang) {
    console.log("startAnnyYang");
    // Let's define a command.
    var commands = {
      'terminal': clickHandler
    };
    // Add our commands to annyang
    //annyang.setLanguage("ko");
    annyang.addCommands(commands);
    // Start listening.
    annyang.start();
  }
}

$(function () {
    startAnnyYang();
    console.log( "ready!" );
    installCmd();
});

