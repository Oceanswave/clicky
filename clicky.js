"use strict";
const co = require("co");
const robot = require("robotjs");
const delay = require("delay");
const moment = require("moment");

class Clicky {
    constructor(coordinates) {
        if (!coordinates)
            coordinates = require("./clicky-coordinates");

        
        this._shouldStop = false;
        this.coordinates = coordinates;
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
        let currentSelector = this.coordinates.Selectors[this.currentIndex];
        let currentLocation = this.coordinates.Locations[this.currentIndex];

        if (currentSelector.enabled) {
            robot.moveMouse(currentSelector.x, currentSelector.y);
            yield delay(1);
            robot.mouseClick();
            robot.keyTap("space");
        }

        robot.moveMouse(this.coordinates.TopLocation.x, this.coordinates.TopLocation.y);
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
        if (this.currentIndex > this.coordinates.Locations.length - 1) {
            this.currentIndex = 0;
        }
    }

    static getMousePos() {
        return robot.getMousePos();
    }
}


exports.Clicky = Clicky;