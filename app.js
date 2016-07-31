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
// monitor.getActiveWindow(window => {

//     if (window.app !== "adventure-capitalist" && clicky) {
//         console.log(`Stopping, current window is now ${window.app}`);
//         clicky.stopClicky();
//         clicky = null;
//         Clicky = null;
//     }

// }, -1, 0.1);

//Monitor changes to the coordinates file and auto-reload if it changes.
let investmentScreenPositions = requireUncached("./investment-screen-positions");

chokidar.watch("./investment-screen-positions.js")
    .on('change', path => {
        investmentScreenPositions = requireUncached("./investment-screen-positions");
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
            clicky = new Clicky(investmentScreenPositions);
            clicky.startClicky();
        }
    });

    globalShortcut.register('Control+`', function () {
        if (clicky) {
            clicky.stopClicky();
            clicky = null;
            Clicky = null;

            //TODO: Also clear timeouts.
        }
        else {
            Clicky = requireUncached("./clicky.js").Clicky;
            clicky = new Clicky(investmentScreenPositions);
            clicky.startClicky("microManager");
        }
    }) ;

    globalShortcut.register('Shift+`', function () {
        let Clicky = requireUncached("./clicky.js").Clicky;
        console.log(Clicky.getMousePos());
    });

    for (let investmentNumber = 1;investmentNumber < 11; investmentNumber++) {
        let key = investmentNumber - 1;
        if (investmentNumber === 1)
            key = 0;

        globalShortcut.register(`${key}`, function () {
            toggleInvestmentSelector(investmentNumber);
        });

        globalShortcut.register(`Shift+${key}`, function () {
            toggleInvestmentTrigger(investmentNumber);
        });

        globalShortcut.register(`Control+${key}`, function () {
            toggleInvestmentPurchase(investmentNumber);
        });
    }

    let toggleInvestmentSelector = function (investmentNumber) {
        console.log(`Toggling Selector for investment #${investmentNumber}: ${!investmentScreenPositions[investmentNumber].selector.enabled}`);
        investmentScreenPositions[investmentNumber].selector.enabled = !investmentScreenPositions[investmentNumber].selector.enabled;
    };

    let toggleInvestmentTrigger = function (investmentNumber) {
        console.log(`Toggling Trigger for investment # ${investmentNumber}: ${!investmentScreenPositions[investmentNumber].trigger.enabled}`);
        investmentScreenPositions[investmentNumber].trigger.enabled = !investmentScreenPositions[investmentNumber].trigger.enabled;
    };

    let toggleInvestmentPurchase = function (investmentNumber) {
        console.log(`Toggling Purchasing for investment # ${investmentNumber}: ${!investmentScreenPositions[investmentNumber].purchase.enabled}`);
        investmentScreenPositions[investmentNumber].purchase.enabled = !investmentScreenPositions[investmentNumber].purchase.enabled;
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