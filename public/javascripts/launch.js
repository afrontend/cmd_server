function installTerminalCmd() {
  var $terminalCmd = $('#terminalCmd');
  $terminalCmd.click(function (event) {
    if (event) {
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
  });
}

function installVimCmd() {
  var $vimCmd = $('#vimCmd');
  var filename = $vimCmd.attr("data-filename");
  $vimCmd.click(function (event) {
    $.ajax({
      type: "get",
      dataType: "json",
      url: "http://localhost:3000/apis/vim?filename=" + filename,
      cache: false,
      success: function (data) { },
      error: function (xhr, status, err) { }
    });
  });
}

function installCmd() {
  console.log("installCmd");
  installTerminalCmd();
  installVimCmd();
}

$(function () {
  console.log( "ready!" );
  installCmd();
});

