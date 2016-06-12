"use strict";
const electron = require('electron');
const chokidar = require('chokidar');
const requireUncached = require('require-uncached');
const monitor = require('active-window');

//Electron related
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const powerSaveBlocker = electron.powerSaveBlocker;
powerSaveBlocker.start('prevent-app-suspension');

let Clicky = null;
let clicky = null;

// app.dock is not defined when running
// electron in a platform other than OS X
if (app.dock) {
    app.dock.hide();
}

//Monitor the active process; if not adcap, stop.
monitor.getActiveWindow(window => {

    if (window.app !== "adventure-capitalist" && clicky) {
        console.log(`Stopping, current window is now ${window.app}`);
        clicky.stopClicky();
        clicky = null;
        Clicky = null;
    }

}, -1, 1);

//Monitor changes to the coordinates file and auto-reload if it changes.
let coordinates = requireUncached("./clicky-coordinates");

chokidar.watch("./clicky-coordinates.js")
    .on('change', path => {
        coordinates = requireUncached("./clicky-coordinates");
    });

app.on('ready', function () {

    let ret = globalShortcut.register('`', function () {
        if (clicky) {
            clicky.stopClicky();
            clicky = null;
            Clicky = null;

            //TODO: Also clear timeouts.
        }
        else {
            Clicky = requireUncached("./clicky.js").Clicky;
            clicky = new Clicky(coordinates);
            clicky.startClicky();
        }
    });

    globalShortcut.register('Shift+`', function () {
        let Clicky = requireUncached("./clicky.js").Clicky;
        console.log(Clicky.getMousePos());
    });

    for (let i = 0; i < 9; i++) {
        globalShortcut.register(`${i + 1}`, function () {
            toggleClickySelector(i);
        });

        globalShortcut.register(`Shift+${i + 1}`, function () {
            toggleClickyLocation(i);
        });
    }

    let toggleClickySelector = function (ix) {
        console.log(`Toggling Selector ${ix + 1}: ${!coordinates.Selectors[ix].enabled}`);
        coordinates.Selectors[ix].enabled = !coordinates.Selectors[ix].enabled;
    };

    let toggleClickyLocation = function (ix) {
        console.log(`Toggling Location ${ix + 1}: ${!coordinates.Locations[ix].enabled}`);
        coordinates.Locations[ix].enabled = !coordinates.Locations[ix].enabled;
    };

    if (ret) {
        console.log("ready");
    }
    else {
        console.log('registration failed');
    }
});

app.on('will-quit', function () {

    if (clicky) {
        clicky.stopClicky();
        clicky = null;
    }

    // Unregister a shortcut.
    //globalShortcut.unregister('ctrl+x');

    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});