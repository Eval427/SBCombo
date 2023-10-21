/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from "./settings";
import { movePP, moveText, savedStates } from './guiManager'

//Vars
let displayText = '';
let displayTextList = [];
let data = {
  5: ['a', 3, 0, 0],
  10: ['a', 3, 10, 0],
  15: ['1', 6, 10, 0],
  20: ['5', 6, 10, 15],
  25: ['5', 9, 10, 15],
  30: ['6', 9, 20, 15]
};
let ppText = ''

register('chat', (combo, num, type, event) => { //Combos b/w 5-30
  if (Settings.showText) {
    if (Settings.mode === 0) {
      displayText = `&${data[combo][0]}&l+${combo} &r&8+&b${data[combo][1]}✯ &8+&6${data[combo][2]} &8+&3${data[combo][3]}%`;
    } else {
      displayTextList = [`&7Current Combo: &${data[combo][0]}&l+${combo}&r&6`, `&8+&b${data[combo][1]} ✯ Magic Find&6`, `&8+&6${data[combo][2]} &7Coins per Kill&6`, `&8+&3${data[combo][3]}% &7Combat Exp`]
    }
  }

  if (Settings.deleteMessages) {
    cancel(event);
  }

  if (Settings.showPP) {
    ppText = "8"
    for (let i = 0; i < Number(combo) / 5; i++) {
    ppText += "="
    }
    ppText += "D"
  }
}).setCriteria("+${combo} Kill Combo +${num} ${type}");

register('chat', (combo, event) => { //Combos 30+
  if (Settings.showText) {
    if (Settings.mode === 0) {
      displayText = `&6&l+${combo} &r&8+&b9✯ &8+&620 &8+&315%`;
    } else {
      displayTextList = [`&7Current Combo: &6&l+${combo}&r`, `&8+&b9 ✯ Magic Find&6`, `&8+&620 &7Coins per Kill&6`, `&8+&315% &7Combat Exp`]
    }
  }

  if (Settings.deleteMessages) {
    cancel(event);
  }

  if (Settings.showPP) {
    ppText = "8"
    for (let i = 0; i < Number(combo) / 5; i++) {
    ppText += "="
    }
    ppText += "D"
  }
}).setCriteria('+${combo} Kill Combo');

register('chat', (combo, event) => { //Best Combo Tracker
  displayText = '';
  ppText = "";
  displayTextList = []
  if (Settings.trackBestCombo) {
    if (Number(combo) > savedStates.bestCombo) {
      ChatLib.chat(`&r&aYour combo of &d${combo}&a just beat your record of &6${savedStates.bestCombo}&a!`);
      savedStates.bestCombo = Number(combo);
    }
  }
  if (Settings.hideExpireMessage) {
    cancel(event);
  }
}).setCriteria("Your Kill Combo has expired! You reached a ${combo} Kill Combo!");

register("dragged", (dx, dy, x, y) => {
	if (moveText.isOpen()) {
		savedStates.coords[0] += dx
    savedStates.coords[1] += dy
	}

  if (movePP.isOpen()) {
    savedStates.ppCoords[0] += dx
    savedStates.ppCoords[1] += dy
  }
});

register("worldunload", () => {
	displayText = ""
});

register('renderOverlay', () => {
  if (Settings.showText) {
    if (moveText.isOpen()) {
      if (Settings.mode === 0) {
        Renderer.drawStringWithShadow("&a&l+5 &r&8+&b3✯ &8+&60 &8+&30%", savedStates.coords[0], savedStates.coords[1]);
      } else {
        Renderer.drawStringWithShadow('&7Current Combo: &6&l+30&r', savedStates.coords[0], savedStates.coords[1])
        Renderer.drawStringWithShadow('&8+&b9 ✯ Magic Find', savedStates.coords[0], savedStates.coords[1] + 10)
        Renderer.drawStringWithShadow('&8+&620 &7Coins per Kill', savedStates.coords[0], savedStates.coords[1] + 20)
        Renderer.drawStringWithShadow('&8+&315% &7Combat Exp', savedStates.coords[0], savedStates.coords[1] + 30)
      }
      Renderer.drawLine(Renderer.WHITE, savedStates.coords[0], 1, savedStates.coords[0], Renderer.screen.getHeight(), 0.5);
      Renderer.drawLine(Renderer.WHITE, Renderer.screen.getWidth(), savedStates.coords[1], 1, savedStates.coords[1], 0.5);
      Renderer.drawStringWithShadow(`x: ${Math.round(savedStates.coords[0])}, y: ${Math.round(savedStates.coords[1])}`, parseInt(savedStates.coords[0]) - 65, parseInt(savedStates.coords[1]) - 12)
    } else {
      if (Settings.mode === 0) {
        Renderer.drawStringWithShadow(displayText, savedStates.coords[0], savedStates.coords[1]);
      } else {
        for (i = 0; i < displayTextList.length; i++) {
          Renderer.drawStringWithShadow(displayTextList[i], savedStates.coords[0], savedStates.coords[1] + (10 * i))
        }
      }
    }
  }

  if (Settings.showPP) {
    if (movePP.isOpen()) {
      Renderer.drawStringWithShadow("8=====D", savedStates.ppCoords[0], savedStates.ppCoords[1]);
      Renderer.drawLine(Renderer.WHITE, savedStates.ppCoords[0], 1, savedStates.ppCoords[0], Renderer.screen.getHeight(), 0.5);
      Renderer.drawLine(Renderer.WHITE, Renderer.screen.getWidth(), savedStates.ppCoords[1], 1, savedStates.ppCoords[1], 0.5);
      Renderer.drawStringWithShadow(`x: ${Math.round(savedStates.ppCoords[0])}, y: ${Math.round(savedStates.ppCoords[1])}`, parseInt(savedStates.ppCoords[0]) - 65, parseInt(savedStates.ppCoords[1]) - 12)
    } else {
      Renderer.drawStringWithShadow(ppText, savedStates.ppCoords[0], savedStates.ppCoords[1]);
    }
  }
});

register("command", () => {Settings.openGUI();}).setName("sbcombo");