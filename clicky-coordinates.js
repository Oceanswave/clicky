//this.topLocation = { x: 696, y: 330 }; //Where the "perk" location is.
const TopLocation = { x: 1169, y: 330 }; // Horizontal "perk" button

const Selectors = [
    //Left Selectors
    { x: 696, y: 480, enabled: false },
    { x: 696, y: 720, enabled: false },
    { x: 696, y: 930, enabled: false },
    { x: 696, y: 1160, enabled: false },
    //Right Selectors
    { x: 1577, y: 265, enabled: false },
    { x: 1577, y: 480, enabled: false },
    { x: 1577, y: 720, enabled: false },
    { x: 1577, y: 930, enabled: false },
    { x: 1577, y: 1160, enabled: false }
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

module.exports = {
    TopLocation: TopLocation,
    Selectors: Selectors,
    Locations: Locations
};