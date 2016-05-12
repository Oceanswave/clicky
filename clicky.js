"use strict";
const co = require("co");
const robot = require("robotjs");
const delay = require("delay");

class Clicky {
    constructor() {
        this._shouldStop = false;

        this.topLocation = { x: 696, y: 330 }; //Where the "perk" location is. x: 1169 for the horizontal button.
        this.locations = [
            //Bonus Activation
            {x: 1325, y: 350 },
            //Left Selectors
            //{ x: 696, y: 480 },
            //{ x: 696, y: 720 },
            //{ x: 696, y: 930 },
            //{ x: 696, y: 1160 },
            //Right Selectors
            //{ x: 1577, y: 265 },
            //{ x: 1577, y: 480 },
            //{ x: 1577, y: 720 },
            //{ x: 1577, y: 930 },
            //{ x: 1577, y: 1160 }
            //Left Monies
           //{ x: 1025, y: 720 }
           //{ x: 1025, y: 930 }
            //Right Monies
            //{ x: 1975, y: 265 }
            //{ x: 1975, y: 720 },
            //{ x: 1975, y: 930 },
            { x: 1975, y: 1160 },
            //Left Buys
            // {x: 1025, y: 602 }
            //Right Buys
            { x: 1950, y: 1280 }
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
        if (this.locations.length > 0) {
            var current = this.locations[this.currentIndex];

            robot.moveMouse(current.x, current.y);
            yield delay(1);
            robot.mouseClick();
            robot.keyTap("space");
        }
        
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