"use strict";
const co = require("co");
const robot = require("robotjs");
const delay = require("delay");

class Clicky {
    constructor() {
        this._shouldStop = false;

        this.topLocation = { x: 1169, y: 330 };
        this.locations = [
            { x: 696, y: 480 },
            //{ x: 696, y: 720 },
            { x: 696, y: 930 },
            //{ x: 696, y: 1160 },
            //Right Selectors
            //{ x: 1577, y: 265 },
            { x: 1577, y: 480 },
            { x: 1577, y: 720 },
            { x: 1577, y: 930 },
            { x: 1577, y: 1160 }
            //Right Monies
            //{ x: 1975, y: 720 },
            //{ x: 1975, y: 930 },
            //{ x: 1975, y: 116  0 }
            //Right Buys
            //{ x: 1935, y: 1282 }
        ];
        this.currentIndex = 0;
    }

    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    startClicky()
    {
        console.log("starting clicky...");
        this._shouldStop = false;

        var fnClick = co.wrap(function*(self){
            try {
                while(!self._shouldStop) {
                    yield self.click();
                }
            }
            catch(ex) {
                throw ex;
            }
        });

        fnClick(this).then(function() {
        }, function(err){
            console.log(err);
        });

    }

    stopClicky()
    {
        console.log("stopping clicky...");
        this._shouldStop = true;
    }

    *click()
    {
        var current = this.locations[this.currentIndex];

        robot.moveMouse(current.x, current.y);
        yield delay(1);
        robot.mouseClick();
        robot.keyTap("space");

        robot.moveMouse(this.topLocation.x, this.topLocation.y);
        yield delay(1);
        robot.mouseClick();
        robot.keyTap("space");

        this.currentIndex++;
        if (this.currentIndex > this.locations.length - 1)
            this.currentIndex = 0;
    }

    static getMousePos() {
        return robot.getMousePos();
    }
}


exports.Clicky = Clicky;