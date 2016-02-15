"use strict"
const electron = require('electron');
const app = electron.app;

const globalShortcut = electron.globalShortcut;

const powerSaveBlocker = electron.powerSaveBlocker;
powerSaveBlocker.start('prevent-app-suspension');

const requireUncached = require('require-uncached');

var clicky = null;

app.on('ready', function() {

    var ret = globalShortcut.register('`', function() {
        if (clicky) {
            clicky.stopClicky();
            clicky = null;
        }
        else {
            let Clicky = requireUncached("./clicky.js").Clicky;
            clicky = new Clicky();
            clicky.startClicky();
        }
    });

    if (ret) {
        console.log("ready");
    }
    else {
        console.log('registration failed');
    }
});

app.on('will-quit', function() {

    if (clicky) {
        clicky.stopClicky();
        clicky = null;
    }

    // Unregister a shortcut.
    //globalShortcut.unregister('ctrl+x');

    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
});