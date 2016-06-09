"use strict";
const co = require("co");
const robot = require("robotjs");
const delay = require("delay");
const moment = require("moment");

//this.topLocation = { x: 696, y: 330 }; //Where the "perk" location is.
const TopLocation = { x: 1169, y: 330 }; // Horizontal "perk" button

const Selectors = [
    //Left Selectors
    { x: 696, y: 480, enabled: true },
    { x: 696, y: 720, enabled: true },
    { x: 696, y: 930, enabled: true },
    { x: 696, y: 1160, enabled: true },
    //Right Selectors
    { x: 1577, y: 265, enabled: true },
    { x: 1577, y: 480, enabled: true },
    { x: 1577, y: 720, enabled: true },
    { x: 1577, y: 930, enabled: true },
    { x: 1577, y: 1160, enabled: true }
];

//The thinks you press to make the monies.
const Locations = [
    //Bonus Activation
    //{x: 1325, y: 350 },

    //Left Monies
    { x: 1025, y: 480, enabled: false },
    { x: 1025, y: 720, enabled: false },
    { x: 1025, y: 930, enabled: false },
    { x: 1025, y: 1160, enabled: false },
    //Right Monies
    { x: 1975, y: 265, enabled: false, delay: 16 },
    { x: 1975, y: 480, enabled: false, delay: 20 },
    { x: 1975, y: 720, enabled: false, delay: 35 },
    { x: 1975, y: 930, enabled: false, delay: 25 },
    { x: 1975, y: 1160, enabled: false, delay: 32 },
    //Left Buys
    // {x: 1025, y: 602 }
    //Right Buys
    //{ x: 1950, y: 1280 }
];

class Clicky {
    constructor() {
        this._shouldStop = false;
        this.currentIndex = 0;
    }

    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    startClicky() {
        console.log("starting clicky...");
        this._shouldStop = false;

        var fnClick = co.wrap(function* (self) {
            try {
                while (!self._shouldStop) {
                    yield self.click();
                }
            }
            catch (ex) {
                throw ex;
            }
        });

        fnClick(this).then(function () {
        }, function (err) {
            console.log(err);
        });

    }

    stopClicky() {
        console.log("stopping clicky...");
        this._shouldStop = true;
    }

    *click() {
        let currentSelector = Selectors[this.currentIndex];
        let currentLocation = Locations[this.currentIndex];

        if (currentSelector.enabled) {
            robot.moveMouse(currentSelector.x, currentSelector.y);
            yield delay(1);
            robot.mouseClick();
            robot.keyTap("space");
        }

        robot.moveMouse(TopLocation.x, TopLocation.y);
        yield delay(1);
        robot.mouseClick();
        robot.keyTap("space");

        if (currentLocation.enabled) {
            let shouldClick = true;

            if (currentLocation.nextClick)
                shouldClick = moment().isAfter(currentLocation.nextClick);

            if (shouldClick) {
                robot.moveMouse(currentLocation.x, currentLocation.y);
                yield delay(1);
                robot.mouseClick();
                //robot.keyTap("space");
                currentLocation.nextClick = moment().add(currentLocation.delay, 'seconds');
            }
        }

        this.currentIndex++;
        if (this.currentIndex > Locations.length - 1) {
            this.currentIndex = 0;
        }
    }

    static getMousePos() {
        return robot.getMousePos();
    }

    static toggleSelector(ix) {
        Selectors[ix].enabled = !Selectors[ix].enabled;
    }
}


exports.Clicky = Clicky;