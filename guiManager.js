/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

//Literally all this file is for is to stop circular exporting/importing between main.js and settings.js
//You cannot export a varaible to settings.js and import the Settings into main.js

import PVObject from "PersistentData";

export const savedStates = new PVObject('SBCombo', {
    bestCombo: 0,
    coords: [30, 40],
});

export let moveText = new Gui();