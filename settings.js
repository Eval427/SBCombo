import { movePP, moveText, savedStates } from "./guiManager";
import { @Vigilant, @TextProperty, @CheckboxProperty, @SwitchProperty, @SelectorProperty, @ButtonProperty } from 'Vigilance';

@Vigilant("SBCombo")
class Settings {
    @CheckboxProperty({
        name: 'Show Combo Text',
        description: 'Make the combo text visible or not',
        category: 'Display',
        subcategory: 'Display Settings',
        initialValue: true
    })
    showText = true;

    @CheckboxProperty({
        name: 'Delete Combo Chat Messages',
        description: 'Remove the combo messages from your chat',
        category: 'Display',
        subcategory: 'Display Settings',
        initialValue: true
    })
    deleteMessages = true;

    @SelectorProperty({
        name: 'Combo Text Mode',
        description: 'Chose between short and long combo text',
        category: 'Display',
        subcategory: 'Display Settings',
        options: ['Short  ', 'Long  ']
    })
    mode = 0;

    @ButtonProperty({
        name: 'Move Combo Text',
        description: 'Click and drag to move the combo text',
        category: 'Display',
        subcategory: 'Display Settings',
        placeholder: 'Move'
    })
    moveComboText() {
        moveText.open();
    }

    @CheckboxProperty({
        name: 'Track Best Combo',
        description: 'Tracks your best combo',
        category: 'Combo Tracker',
        subcategory: 'Best Combo Tracker',
        initialValue: true
    })
    trackBestCombo = true;

    @CheckboxProperty({
        name: 'Hide Expired Combo Message',
        description: 'Hides the expired combo message from chat',
        category: 'Combo Tracker',
        subcategory: 'Best Combo Tracker',
        initialValue: true
    })
    hideExpireMessage = true;

    @ButtonProperty({
        name: 'Show Best Combo',
        description: 'Click to see your best combo',
        category: 'Combo Tracker',
        subcategory: 'Best Combo Tracker',
        placeholder: 'Click to View'
    })
    showBestCombo() {
        moveText.close();
        if (savedStates.bestCombo < 10) {
            ChatLib.chat(`&aYour best combo of &6${savedStates.bestCombo}&a is pretty bad.`);
        } else if (10 < savedStates.bestCombo < 50) {
        ChatLib.chat(`&aYour best combo of &6${savedStates.bestCombo}&a is just okay.`);
        } else if (50 < savedStates.bestCombo < 100) {
        ChatLib.chat(`&aYour best combo of &6${savedStates.bestCombo}&a is pretty good!`);
        } else {
        ChatLib.chat(`&aYour best combo of &6${savedStates.bestCombo}&a is godly!!!`)
        }
    }

    @ButtonProperty({
        name: 'Reset Best Combo',
        description: 'Resets Your Best Combo to 0',
        category: 'Combo Tracker',
        subcategory: 'Best Combo Tracker',
        placeholder: 'Click to Reset'
    })
    resetBestCombo() {
        ChatLib.chat('&6Best Combo Reset!');
        savedStates.bestCombo = 0 ;
    }

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Display", "&aCreated by &9Debuggings&a, &6Blak_Dude&a, &fMPG1&a, and &5Altpapier");
        this.setCategoryDescription("Combo Tracker", "&aCreated by &9Debuggings&a, &6Blak_Dude&a, &fMPG1&a, and &5Altpapier")
        this.setSubcategoryDescription("Display", "Display Settings", "Change the Location and Look of the Combo Text")
        this.setSubcategoryDescription("Combo Tracker", "Best Combo Tracker", "View and Manage Your Best Combo Tracker")
    }
}

export default new Settings();