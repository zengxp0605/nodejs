var testMouse = function () {
    // Move the mouse across the screen as a sine wave.
    var robot = require("robotjs");
    // Speed up the mouse.
    robot.setMouseDelay(2);

    var twoPI = Math.PI * 2.0;
    var screenSize = robot.getScreenSize();
    var height = (screenSize.height / 2) - 10;
    var width = screenSize.width;

    for (var x = 0; x < width; x++) {
        y = height * Math.sin((twoPI * x) / width) + height;
        robot.moveMouse(x, y);
        //setTimeout(testScreen, 0);
    }
}

var timer = null;

var testClick = function () {
    // Move the mouse across the screen as a sine wave.
    var robot = require("robotjs");

    function _start() {
        timer = setInterval(function () {
            //robot.moveMouse(x, y);
            var mouse = robot.getMousePos();

            if (mouse.x > 500 ) {
                console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
                clearInterval(timer);
                timer = null;
                return;
            }

            robot.mouseClick();
        }, 50);
    }

    setInterval(function () {
        if (!timer) {
            var mouse = robot.getMousePos();
            if (mouse.x < 500 && mouse.y < 500) {
                console.log('重新开始');
                _start();
            }
        }
    }, 5000);

    _start();
}



var testScreen = function () {
    // Get pixel color under the mouse.
    var robot = require("robotjs");

    // Get mouse position.
    var mouse = robot.getMousePos();

    // Get pixel color in hex format.
    var hex = robot.getPixelColor(mouse.x, mouse.y);
    console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);
}

// testMouse();

testClick();