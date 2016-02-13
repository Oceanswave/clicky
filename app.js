const electron = require('electron');
const app = electron.app;

const globalShortcut = electron.globalShortcut;
const robot = require("robotjs");

const powerSaveBlocker = require('electron').powerSaveBlocker;
powerSaveBlocker.start('prevent-app-suspension');

var clickyInterval = null;

var randomInt = function (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var stopClicky = function() {
    if (clickyInterval) {
        console.log("stopping clicky...");
        clearInterval(clickyInterval);
        clickyInterval = null;
    }
};

var startClicky = function() {

    if (clickyInterval)
        return;

    console.log("starting clicky...");
    click();
};

var click = function() {

    clickyInterval = setInterval(function() {
        console.log(new Date(), "click!");
        robot.mouseClick();
    }, 75);
};

app.on('ready', function() {

    var ret = globalShortcut.register('`', function() {
        if (clickyInterval)
            stopClicky();
        else
            startClicky();
    });

    if (ret) {
        console.log("ready");
    }
    else {
        console.log('registration failed');
    }
});

app.on('will-quit', function() {

    stopClicky();

    // Unregister a shortcut.
    globalShortcut.unregister('ctrl+x');

    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});