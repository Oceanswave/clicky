"use strict";
const co = require("co");
const robot = require("robotjs");
const delay = require("delay");
const moment = require("moment");
const _ = require("lodash");

class Clicky {
    constructor(investmentScreenPositions) {
        if (!investmentScreenPositions)
            investmentScreenPositions = require("./investment-screen-positions");

        this._shouldStop = false;
        this.investments = investmentScreenPositions;
        this.mashPosition = investmentScreenPositions[1].mash;
        this.currentInvestment = 2;
    }

    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    startClicky(currentInvestment) {
        console.log("starting clicky...");

        if (!currentInvestment)
            this.currentInvestment = 2;
        else
            this.currentInvestment = currentInvestment;

        this._shouldStop = false;

        var fnClick = co.wrap(function* (self) {
            try {
                while (!self._shouldStop) {
                    try {
                        yield self.click();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
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
        let currentSelector = this.investments[this.currentInvestment].selector;
        let currentTrigger = this.investments[this.currentInvestment].trigger;
        let currentPurchase = this.investments[this.currentInvestment].purchase;

        if (currentSelector.enabled) {
            robot.moveMouse(currentSelector.x, currentSelector.y);
            yield delay(1);
            robot.mouseClick();
            robot.keyTap("space");
        }

        if (_.isNumber(this.currentInvestment)) {
            robot.moveMouse(this.mashPosition.x, this.mashPosition.y);
            yield delay(1);
            robot.mouseClick();
            robot.keyTap("space");
        }

        if (currentTrigger && currentTrigger.enabled) {
            let shouldClick = true;

            if (currentTrigger.nextClick)
                shouldClick = moment().isAfter(currentTrigger.nextClick);

            if (shouldClick) {
                robot.moveMouse(currentTrigger.x, currentTrigger.y);
                yield delay(1);
                robot.mouseClick();
                //robot.keyTap("space");
                currentTrigger.nextClick = moment().add(currentTrigger.delay, 'seconds');
            }
        }

        if (currentPurchase && currentPurchase.enabled) {
            robot.moveMouse(currentPurchase.x, currentPurchase.y);
            yield delay(1);
            robot.mouseClick();
        }

        if (_.isNumber(this.currentInvestment)) {
            this.currentInvestment++;
            if (this.currentInvestment > 10) {
                this.currentInvestment = 2;
            }
        }
    }

    static getMousePos() {
        return robot.getMousePos();
    }
}


exports.Clicky = Clicky;