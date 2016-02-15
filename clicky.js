"use strict";
const robot = require("robotjs");

class Clicky {
    constructor() {
        this._clickyInterval = null;
    }

    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    startClicky()
    {

        if (this._clickyInterval)
            return;

        console.log("starting clicky...");
        this.click();
    }

    stopClicky()
    {
        if (this._clickyInterval) {
            console.log("stopping clicky...");
            clearInterval(this._clickyInterval);
            this._clickyInterval = null;
        }
    }

    click()
    {

        this._clickyInterval = setInterval(function() {
            console.log(new Date(), "click!");
            robot.mouseClick();
            robot.keyTap("space");
            robot.keyTap("enter");
        }, 50);
    }

    get isClicking()
    {
        return !!this._clickyInterval;
    }
}


exports.Clicky = Clicky;