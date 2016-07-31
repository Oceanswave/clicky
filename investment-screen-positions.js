// Coordinates assume 1440x810 screen resolution.

const Investments = {
    microManager: {
        selector: {
            x: 2475, y: 883, enabled: true
        }
    },
    /**
     * Left side investments: 
     */
    1: {
        //On events, this is where the investment selector is.
        selector: {
            x: 696, y: 330, enabled: false //Since no events have a selector for Investment #1, this is the button next to the "mash"
        },
        //On events, this is where the "Mash" button is.
        mash: {
            //x: 1169, y: 330,
            x: 696, y: 330
        },
        //Position that triggers the investment.
        trigger: {  
            x: 1025, y: 265, enabled: false
        },
        //Position that purchases an investment.
        purchase: {
            x: 1030, y: 330, enabled: false
        },
        //Describes the investment icon region that contains the quantity purchased of the investment.
        quantity: {
            x: 1260, y: 440,
            w: 460, h: 400, //This height is 45px smaller
            ocr: {
                x: 1380, y: 730,
                w: 285, h: 90  
            }
        }
    },
    2: {
        selector: {
            x: 696, y: 480, enabled: false
        },
        trigger: {
            x: 1025, y: 480, enabled: false
        },
        purchase: {
             x: 1030, y: 610, enabled: false
        },
        quantity: {
            x: 1260, y: 840,
            w: 460, h: 445,
            ocr: {
                x: 1380, y: 1175,
                w: 285, h: 90
            }
        }
    },
    3: {
        selector: {
            x: 696, y: 720, enabled: false
        },
        trigger: {
            x: 1025, y: 720, enabled: false
        },
        purchase: {
            x: 1030, y: 1300, enabled: false
        },
        quantity: {
            x: 1260, y: 1285,
            w: 460, h: 445,
            ocr: {
                x: 1380, y: 1620,
                w: 285, h: 90
            }
        }
    },
    4: {
        selector: {
            x: 696, y: 930, enabled: false
        },
        trigger: {
            x: 1025, y: 930, enabled: false
        },
        purchase: {
        },
        quantity: {
            x: 1260, y: 1730,
            w: 460, h: 445,
            ocr: {
                x: 1380, y: 2065,
                w: 285, h: 90
            }
        }
    },
    5: {
        selector: {
            x: 696, y: 1160, enabled: false
        },
        trigger: {
            x: 1025, y: 1160, enabled: false
        },
        purchase: {
        },
        quantity: {
            x: 1260, y: 2175,
            w: 460, h: 445,
            ocr: {
                x: 1380, y: 2510,
                w: 285, h: 90
            }
        }
    },

    /**
     * Right side investments:
     */
    6: {
        selector: {
            x: 1577, y: 265, enabled: false
        },
        trigger: {
            x: 1975, y: 265, enabled: false, delay: 16
        },
        purchase: {
        },
        quantity: {
            x: 3020, y: 395,
            w: 460, h: 445,
            ocr: {
                x: 3140, y: 730,
                w: 285, h: 90
            }
        }
    },
    7: {
        selector: {
            x: 1577, y: 480, enabled: false
        },
        trigger: {
            x: 1975, y: 480, enabled: false, delay: 20
        },
        purchase: {
        },
        quantity: {
            x: 3020, y: 840,
            w: 460, h: 445,
            ocr: {
                x: 3140, y: 1175,
                w: 285, h: 90
            }
        }
    },
    8: {
        selector: {
            x: 1577, y: 720, enabled: false
        },
        trigger: {
            x: 1975, y: 720, enabled: false, delay: 35
        },
        purchase: {
        },
        quantity: {
            x: 3020, y: 1285,
            w: 460, h: 445,
            ocr: {
                x: 3140, y: 1620,
                w: 285, h: 90
            }
        }
    },
    9: {
        selector: {
            x: 1577, y: 930, enabled: false
        },
        trigger: {
            x: 1975, y: 930, enabled: false, delay: 25
        },
        purchase: {
        },
        quantity: {
            x: 3020, y: 1730,
            w: 460, h: 445,
            ocr: {
                x: 3140, y: 2065,
                w: 285, h: 90
            }
        }
    },
    10: {
        selector: {
            x: 1577, y: 1160, enabled: false
        },
        trigger: {
            x: 1975, y: 1160, enabled: false, delay: 32
        },
        purchase: {
        },
        quantity: {
            x: 3020, y: 2175,
            w: 460, h: 445,
            ocr: {
                x: 3140, y: 2510,
                w: 285, h: 90
            }
        }
    }
};

module.exports = Investments;