"use strict";
const electron = require('electron');
const  chokidar = require('chokidar');
const requireUncached = require('require-uncached');

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

app.on('ready', function () {

    let coordinates = requireUncached("./clicky-coordinates");
    
    chokidar.watch("./clicky-coordinates.js")
    .on('change', path => {
        coordinates = requireUncached("./clicky-coordinates");
    });

    let ret = globalShortcut.register('`', function () { 
        if (clicky) {
            clicky.stopClicky();
            clicky = null;
            Clicky = null;
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