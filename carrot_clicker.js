/*
The Base of the Game is the Objects used to easily store data. 
The core Object is the player. The player object Stores Global Variables not Atributed to another character.
The Character Class Object stores information on each Ingame Character. Currently the active Characters are Boomer_Bill, Belle_Boomerette, and Gregory
*/

// Error message if game hasnt loaded in 1 second
let loadCheck = false;
setTimeout(() => {
    if(loadCheck == false) {
        toast('Game crash', 'The game has taken more than 1 second to load. It\'s likely that an error has occured, causing either a partial or full game crash. Feel free to contact us if you see this.', 'red', true, false, false, false, () => {
            openDialog(...dialog.clearsave)
        },
        'Delete Save Data',
        );
    }
}, 1000);

//variables to prevent spamclicking
var n = 0;

/*------------Page Setup---------------*/
//#region


// HTML

// Overlays
const mcContainer             = dom('mouse_confetti');
const elInfoDropdown          = dom('info_dropdown');

// Game
const mainCarrot              = dom("main_carrot");
const elMainPrestigePotential = dom("main_prestige_potential");
const elPrestigePotential     = dom('prestige_potential');
const Basic_Info              = dom("Basic_Info");
const elCarrotCount           = dom("Carrot_Count");
const elClickSpeed            = dom("click_speed");
const elCPC                   = dom("cpc");
const elCPS                   = dom("cps");
const elCashCount             = dom("cash_count");
const elGoldenCarrotCount     = dom("golden_carrot_count");
const elTips                  = dom("Tip");

// Characters and Hoes
const elCharacterUpCost = {
    bill:  dom("UpBillCost"),
    belle: dom("UpBelleCost"),
    greg:  dom("UpGregCost")
};
const elCharacterLevel = {
    bill:  dom("Bill_lvl"),
    belle: dom("Belle_lvl"),
    greg:  dom("Greg_lvl") 
};
const elHoes = {
    bill: [
        dom("bill_wooden_hoe"),
        dom("bill_stone_hoe"),
        dom("bill_iron_hoe"),
        dom("bill_gold_hoe"),
        dom("bill_diamond_hoe"),
        dom("bill_netherite_hoe")
    ],
    belle: [
        dom("belle_wooden_hoe"),
        dom("belle_stone_hoe"),
        dom("belle_iron_hoe"),
        dom("belle_gold_hoe"),
        dom("belle_diamond_hoe"),
        dom("belle_netherite_hoe")
    ],
    greg: [
        dom("greg_wooden_hoe"),
        dom("greg_stone_hoe"),
        dom("greg_iron_hoe"),
        dom("greg_gold_hoe"),
        dom("greg_diamond_hoe"),
        dom("greg_netherite_hoe")
    ]
}

const elHoeCount = {
    bill: [
        dom("Bill_Wooden_Hoe_Number"),
        dom("Bill_Stone_Hoe_Number"),
        dom("Bill_Iron_Hoe_Number"),
        dom("Bill_Gold_Hoe_Number"),
        dom("Bill_Diamond_Hoe_Number"),
        dom("Bill_Netherite_Hoe_Number")
    ],
    belle: [
        dom("Belle_Wooden_Hoe_Number"),
        dom("Belle_Stone_Hoe_Number"),
        dom("Belle_Iron_Hoe_Number"),
        dom("Belle_Gold_Hoe_Number"),
        dom("Belle_Diamond_Hoe_Number"),
        dom("Belle_Netherite_Hoe_Number")
    ],
    greg: [
        dom("Greg_Wooden_Hoe_Number"),
        dom("Greg_Stone_Hoe_Number"),
        dom("Greg_Iron_Hoe_Number"),
        dom("Greg_Gold_Hoe_Number"),
        dom("Greg_Diamond_Hoe_Number"),
        dom("Greg_Netherite_Hoe_Number")
    ]
}
const elHoePrices = {
    wooden:     dom("wooden_hoe_price"),
    stone:      dom("stone_hoe_price"),
    iron:       dom("iron_hoe_price"),
    gold:       dom("gold_hoe_price"),
    diamond:    dom("diamond_hoe_price"),
    netherite:  dom("netherite_hoe_price")
};
const elMainProgressContainer = dom('main_progress_container');
const elMainProgressBar = dom('main_progress_bar');
const elGregProgress = dom("Greg_Progress");
const elCharles = {
    charlesTooltip: dom("charlestooltip"),
    prices: {
        improveWorkingConditions: dom("ImproveWorkingConditions"),
        betterHoes:               dom("BetterHoes"),
        decreaseWages:            dom("DecreaseWages"),
    },
    shop: {
        improveWorkingConditions: dom("ImproveWorkingConditions_button"),
        betterHoes:               dom("BetterHoes_button"),
        decreaseWages:            dom("DecreaseWages_button"),
    }
}
const tomeEffect = {
    iwc: dom('iwc_effect'),
    bh:  dom('bh_effect'),
    dww: dom('dww_effect'),
}
const tomeCount = {
    iwc: dom('iwc_count'),
    bh:  dom('bh_count'),
    dww: dom('dww_count'),
}

// Settings elements
const elFunTipsSlider = dom("FunTipsSlider");
const elFunTipsSlider_label = dom("FunTipsSliderLabel");

const elDisableKeybinds = dom('disable_keybinds');
const elEnableSounds = dom('enable_sounds');
const elEnableMusic = dom('enable_music');
const elEnableCarrotSounds = dom('enable_carrot_sounds');

const elVolumeMaster = dom('volume_master');
const elVolumeMaster_label = dom('volume_master_percent');
const volumeMasterDropdown = dom('volume_master_dropdown');
const vmdImage = dom('volume_master_dropdown_img');
const elEnableMainProgress = dom('enable_main_progress');
//#endregion

/*-------------Local Storage and Characters-------------*/
//#region

// Creates Characters 
/** Creates Character objects */
class Character{
    /** Characters Atributes
     * @param {String} nickname Shortened name
     * @param {String} Type Character profession
     * @param {String} img 
     * @param {Number} lvl Starting level
     * @param {Number} lvlupPrice Starting level up price
     * @param {*} scaling The way level up prices scale
     * @param {Array} Hoes Blank hoe array
     */
    constructor(nickname, type, img, lvl, lvlupPrice, scaling, Hoes) {
        this.nickname=nickname;
        this.type=type;
        this.img=img;
        this.lvl=lvl;
        this.lvlupPrice=lvlupPrice;
        this.scaling=scaling;
        this.Hoes=Hoes;
    }
}
// Default Values Stored in a Player Object
const playerPrestigeTemplate = {
    carrots: 0,
    click_carrots: 0,
    idle_carrots: 0,
    bonus_carrots: 0,

    // cash: 0,
    falling_carrots_grabbed: 0,

    // golden_carrots: 0,
    // prestige_count: 0,
    clicks: 0,
    hoes: {
        crafted: [0, 0, 0, 0, 0, 0],
        craftedTotal: 0,
    },
};
const default_player = {
    data_version: 10, // needs to be incremented by 1 any time any game object is changed
    // time_last_saved: false,

    // Progress
    carrots: 0,
    cpc: 1,
    cps: 0,
    equippedHoes: 0,
    cash: 0,

    // Best
    clickSpeedRecord: 0,
    fallingConsecRecord: 0,

    // Prestige
    pages: 0,
    golden_carrots: 0,
    prestige_potential: 0,
    prestige_available: false,

    // Current prestige
    prestige: JSON.parse(JSON.stringify(playerPrestigeTemplate)),

    // Lifetime stats
    lifetime: {
        carrots: 0,
        click_carrots: 0,
        idle_carrots: 0,
        bonus_carrots: 0,

        cash: 0,
        falling_carrots_grabbed: 0,

        golden_carrots: 0,
        prestige_count: 0,
        clicks: 0,
        hoes: {
            crafted: [0, 0, 0, 0, 0, 0],
            craftedTotal: 0,
        },
        tomes_bought: 0,
    },

    // Unlocked characters
    characters: {
        bill: true,
    },

    // Achievements
    achievements: {},
    internal: 0,

    // Unlockables
    themes: [
        'theme_dark',
        'theme_light',
        'theme_oled'
    ],
    cosmetics: {
        'bundle':   ['default'],
        'farmable': ['default'],
        'bill':     ['default'],
        'belle':    ['default'],
        'greg':     ['default'],
        'charles':  ['default'],
        'carl':     ['default'],
        'six':      ['default'],
        'tools':    ['default'],
    },
    // New indicators
    new_theme: false,
    new_cosmetic: false,

    // inventory: [
        
    // ],

    flags: {},
}

// Tool durability values (hardmode)
// const toolDurability = [140, 800, 3200, 12000, 24000, 64000];

// Character Defaults
const Default_Boomer_Bill = new Character(
    "bill", "Farmer", './assets/characters/Boomer_Bill.png',
    1, 100,
    {

    },
    [0,0,0,0,0,0],
);
const Default_Belle_Boomerette = new Character("belle","Farmer",'./assets/characters/BelleBommerette.png',0,200,{},[0,0,0,0,0,0]);
const Default_Gregory          = new Character("greg","Blacksmith",'./assets/characters/Gregory.png',0,5000,{},[0,0,0,0,0,0]);
Default_Gregory.HoePrices = [15000,600000,60000000,7000000000,500000000000,100000000000000];
Default_Gregory.crafting = false; // whether or not he is currently crafting
const Default_Charles = {
    // Info
    name: "Charles",
    nickname: "charles",
    type: "Scholar",
    img: './assets/characters/Charles.png',

    // Shop
    tome:{
        improveWorkingConditions:{
            value: 0,
            price: 1,
            max:   22025,
        },
        decreaseWages:{
            value: 0,
            price: 1,
            max:   false,
        },
        betterHoes:{
            value: 0,
            price: 1,
            max:   false,
        }
    }
}
const Default_Carl = {
    nickname: "carl",
    type: "Artist",
    img: './assets/characters/Carl.png',

    // Shop
    shop: {
        theme: {
            'theme_classic': {
                currency: 'cash',
                price: 16,
                available: true,
                bought: false,
            },
            'theme_bw': {
                currency: 'cash',
                price: 6,
                available: false,
                bought: false,
            },
            'theme_terminal': {
                currency: 'cash',
                price: 12,
                available: false,
                bought: false,
            },
            'theme_chatapp': {
                currency: 'cash',
                price: 5,
                available: false,
                bought: false,
            },
            'theme_camo': {
                currency: 'cash',
                price: 3,
                available: false,
                bought: false,
            },
            'theme_red': {
                currency: 'cash',
                price: 5,
                available: false,
                bought: false,
            },
            'theme_green': {
                currency: 'cash',
                price: 5,
                available: false,
                bought: false,
            },
            'theme_blue': {
                currency: 'cash',
                price: 5,
                available: false,
                bought: false,
            },
            // 'theme_custom': {
            //     currency: 'cash',
            //     price: 80,
            //     available: false,
            //     bought: false,
            // },
        },
        cosmetic: {
            // Bundle
            'bundle/cookie': {
                currency: 'cash',
                price: 16,
                available: false,
                bought: false,
            },
            'bundle/xmas': {
                currency: 'cash',
                price: 25,
                available: false,
                bought: false,
            },
            'bundle/plumber': {
                currency: 'cash',
                price: 16,
                available: false,
                bought: false,
            },

            // Farmable
            'farmable/pixel_carrot': {
                currency: 'cash',
                price: 8,
                available: false,
                bought: false,
            },
            'farmable/pixel_golden_carrot': {
                currency: 'cash',
                price: 10,
                available: false,
                bought: false,
            },
            'farmable/blockgame_potato': {
                currency: 'cash',
                price: 5,
                available: false,
                bought: false,
            },
            'farmable/pineapple': {
                currency: 'cash',
                price: 20,
                available: false,
                bought: false,
            },
            'farmable/ascii_color': {
                currency: 'cash',
                price: 2,
                available: false,
                bought: false,
            },
            'farmable/ascii': {
                currency: 'cash',
                price: 2,
                available: false,
                bought: false,
            },

            // Carrot variants
            'farmable/alien_carrot': {
                currency: 'cash',
                price: 3,
                available: false,
                bought: false,
            },
            'farmable/demon_carrot': {
                currency: 'cash',
                price: 3,
                available: false,
                bought: false,
            },
            'farmable/ghost_carrot': {
                currency: 'cash',
                price: 3,
                available: false,
                bought: false,
            },
            'farmable/rainbow_carrot': {
                currency: 'cash',
                price: 3,
                available: false,
                bought: false,
            },

            // Bill
            'bill/business_bill': {
                currency: 'cash',
                price: 5,
                available: false,
                bought: false,
            },
            'bill/biker_bill': {
                currency: 'cash',
                price: 5,
                available: false,
                bought: false,
            },
            
            // Carl
            'carl/joker_carl': {
                currency: 'cash',
                price: 8,
                available: false,
                bought: false,
            },

            // Tools
            'tools/fertilizer': {
                currency: 'cash',
                price: 5,
                available: false,
                bought: false,
            },
        }
    },
}
Default_Carl.shop.theme.keys =    Object.keys(Default_Carl.shop.theme);
Default_Carl.shop.cosmetic.keys = Object.keys(Default_Carl.shop.cosmetic);
const Default_Six = {
    // Info
    name: "",
    nickname: "",
    type: "",
    img: './assets/characters/???.png',

    // Shop info (Static)
    shop: {
        'clickrate': {
            name:      'Golden Mouse',
            desc:      'Increases hold-to-click speed by 1',
            img:       './assets/items/mouse_2.png',
            currency:  'cash',
            price:     [5, 10, 25, 45, 70, 100, 135],
            value:     [3,  4,  5,  6,  7,   8,   9],
            written:   '@ clicks/s',
        },
        'belle_bonus': {
            name:      'Synergy Drink',
            desc:      'Increases belle\'s output while the carrot is being clicked',
            img:       './assets/items/synergy.png',
            currency:  'cash',
            price:     [24, 32, 40, 50,   65,  80,  95, 120, 150, 185],
            value:     [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
            written:   '+@%',
        },
        // 'greg_slots': {
        //     name:      'greg_slots',
        //     desc:      'Gives Greg an additional slot, which allows multiple tools to be crafted at once.',
        //     img:       './assets/achievements/missing.png',
        //     currency:  'cash',
        //     price:     [200],
        //     value:     [2],
        //     written:   '@ slots',
        // },
        'greg_speed': {
            name:      'Propane Tank',
            desc:      'Increases Greg\'s crafting speed',
            img:       './assets/items/propane.png',
            currency:  'cash',
            price:     [ 38, 53,  74, 92, 121, 133, 169, 204],
            value:     [1.5,  2, 2.5,  3, 3.5,   4, 4.5,   5],
            written:   '@x',
        },
        'greg_min_start': {
            name:      'Credit Card',
            desc:      'Allows Greg to craft a tool before you can afford it. Percent value is how much of the tool\'s cost you need to start crafting.',
            img:       './assets/items/credit.png',
            currency:  'cash',
            price:     [40, 47, 54, 61, 68],
            value:     [90, 80, 70, 60, 50],
            written:   '@%',
        },
        'falling_bonus': {
            name:      'Cistern',
            desc:      'Increases falling carrot rewards',
            img:       './assets/items/cistern.png',
            currency:  'cash',
            price:     [60, 112, 163, 252, 309],
            value:     [20,  40,  60,  80, 100],
            written:   '+@%',
        },
        'page_bonus': {
            name:      'Origami',
            desc:      'Increases the prestige buff from tome pages',
            img:       './assets/items/origami.png',
            currency:  'cash',
            price:     [100, 133, 167, 202, 240, 281, 324, 363, 415, 471],
            value:     [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,   2],
            written:   '+@%/page',
        },
        'spacebar_click': {
            name:      'Magic Keyboard',
            desc:      'Allows the use of spacebar and click at the same time',
            img:       './assets/items/keyboard_2.png',
            currency:  'cash',
            price:     [200],
            value:     [true],
            written:   '',
        },
        // 'paperclip': {
        //     name:      'Paperclip',
        //     desc:      '???',
        //     img:       './assets/achievements/missing.png',
        //     currency:  'cash',
        //     price:     [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        //     value:     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //     written:   '',
        // },
        // 'fake_trophy': {
        //     name:      'Fake Trophy',
        //     desc:      'It\'s plastic.',
        //     img:       './assets/achievements/missing.png',
        //     currency:  'cash',
        //     price:     [350],
        //     value:     [true],
        //     written:   '',
        // },
        // Dreamcatcher?
    },
    // Shop player data
    data: {
        'clickrate': {
            available: true,
            level: 0,
            value: 2,
        },
        'belle_bonus': {
            available: true,
            level: 0,
            value: 0,
        },
        // 'greg_slots': {
        //     available: true,
        //     level: 0,
        //     value: 1,
        // },
        'greg_speed': {
            available: true,
            level: 0,
            value: 1,
        },
        'greg_min_start': {
            available: true,
            level: 0,
            value: 100,
        },
        'falling_bonus': {
            available: true,
            level: 0,
            value: 0,
        },
        'page_bonus': {
            available: true,
            level: 0,
            value: 1,
        },
        'spacebar_click': {
            available: true,
            level: 0,
            value: false,
        },
        // 'paperclip': {
        //     available: true,
        //     level: 0,
        //     value: 0,
        // },
        // 'fake_trophy': {
        //     available: false,
        //     level: 0,
        //     value: false,
        // },
    },
}
Default_Six.shop.keys =    Object.keys(Default_Six.shop);

/** Temporary (?) shorthand function */
function getCharObj(char) {
    switch(char) {
        case 'bill':    return Default_Boomer_Bill;
        case 'belle':   return Default_Belle_Boomerette;
        case 'greg':    return Default_Gregory;
        case 'charles': return Default_Charles;
        case 'carl':    return Default_Carl;
        case 'six':     return Default_Six;
    }
}

// Used when determining how many characters there are
const chars = [
    'bill',
    'belle',
    'greg',
    'charles',
    'carl',
    // 'six',
];

/** Return number of available shop items
 * @returns Number
 */
function carlItemsAvailable() {
    let c = 0;
    // Themes
    let theme_keys = Default_Carl.shop.theme.keys;
    for(i = 0; i < theme_keys.length; i++) { if(Carl.shop.theme[theme_keys[i]].available == true) c++; }
    // Cosmetics
    let cosm_keys = Default_Carl.shop.cosmetic.keys;
    for(i = 0; i < cosm_keys.length; i++) { if(Carl.shop.cosmetic[cosm_keys[i]].available == true) c++; }
    return c;
}

/** Returns true if available or bought
 * @param {string} type 
 * @param {number} item 
 * @returns Boolean
 */
function carlShopQuery(type, item) {
    console.warn(`carlShopQuery(${type}, ${item})`);
    try {
        if(Carl.shop[type][item].available == true
            || Carl.shop[type][item].bought == true
        ) { return true; }
        else { return false};
    } catch (error) {
        console.log('carlShopQuery: invalid query- item or type not found');
        return false;
    }
}

/** Returns completion of trinkets */
function sixCompletion() {
    let keys = Default_Six.shop.keys;
    let comTotal = 0;
    let maxTotal = 0;
    for(i = 0; i < keys.length; i++) {
        let key = keys[i];
        comTotal += Six?.data[key]?.level;
        maxTotal += Default_Six.shop[key].price.length;
    }
    return `${comTotal}/${maxTotal}`;
}


// Assigns the Local storage
var player;
var playerCharKeys;
var Boomer_Bill;
var Belle_Boomerette;
var Gregory;
var Charles;
var Carl;
var Six;

// Use savedata if available, otherwise use default
// console.log('[Autosave] Player has savedata, importing...');
player           = localStorage.getObject("player")  || default_player;
Boomer_Bill      = localStorage.getObject("Bill")    || Default_Boomer_Bill;
Belle_Boomerette = localStorage.getObject("Belle")   || Default_Belle_Boomerette;
Gregory          = localStorage.getObject("Greg")    || Default_Gregory;
Charles          = localStorage.getObject("Charles") || Default_Charles;
Carl             = localStorage.getObject("Carl")    || Default_Carl;
Six              = localStorage.getObject("Six")     || Default_Six;

// Objects to save in localstorage
const saveList = {
    "player":    player,
    "Bill":      Boomer_Bill,
    "Belle":     Belle_Boomerette,
    "Greg":      Gregory,
    "Charles":   Charles,
    "Carl":      Carl,
    "Six":       Six,
    "tips_seen": tips,
}
const saveListKeys = Object.keys(saveList);
var preventSaveGame = false;
/** Saves objects data to Local Storage */
function saveGame() {
    if(preventSaveGame == true || player.flags['cookies_accepted'] != true) return;
    // player.time_last_saved = Date.now();
    for(let i = 0; i < saveListKeys.length; i++) {
        let key = saveListKeys[i];
        let obj = saveList[key];
        localStorage.setObject(key, obj);
    }
}

// Autosave
var autosave = 
setInterval(() => {
    saveGame();
}, 5000);

// Save before unload (does not work for some browsers/devices)
window.addEventListener('beforeunload', () => { saveGame(); });

//#endregion

/*--------------Settings----------------*/
//#region 

/** If sounds are turned off, grey out individual sound toggles */
function optionSoundsDisable(state) {
    // Carrot sounds
    if(state == false) {
        elEnableMusic.disabled = true;
        elEnableCarrotSounds.disabled = true;
        stopMusic();
    } else {
        elEnableMusic.disabled = false;
        elEnableCarrotSounds.disabled = false;
    }
}
/** Fill out settings page options */
function fillSettingsPage() {
    // Gameplay
    dom('tutorial_messages').checked = settings.tutorial_messages;
    dom('carl_shop_toasts').checked = settings.carl_shop_toasts;
    dom('cosmetic_auto_equip').checked = settings.cosmetic_auto_equip;
    // Fun tips
    elFunTipsSlider.value = settings.fun_tip_percentage;
    eInnerText(elFunTipsSlider_label, elFunTipsSlider.value);

    dom('full_numbers').checked = settings.full_numbers;
    dom('compact_achievements').checked = settings.compact_achievements;
    dom('achievements_grid').checked = settings.achievements_grid;
    elEnableMainProgress.checked = settings.enableMainProgress;
    dom('confetti_effects').checked = settings.confetti_effects;
    elEnableSounds.checked = settings.enableSounds;
    optionSoundsDisable(settings.enableSounds);

    let vol = settings.master_volume * 100
    elVolumeMaster.value = vol;
    volumeMasterDropdown.value = vol;
    elEnableMusic.checked = settings.enableMusic;
    elEnableCarrotSounds.checked = settings.enableCarrotSounds;
    eInnerText(elVolumeMaster_label, `${settings.master_volume * 100}%`);
    volume = settings.master_volume;

    // Autosave
    // Update autosave variable
    if(settings.autosave_interval != default_settings.autosave_interval) {
        dom('autosave_interval').value = settings.autosave_interval;
        clearInterval(autosave);
        autosave = setInterval(() => {
            saveGame();
        }, settings.autosave_interval * 1000);
    }

    // Notification time
    if(settings.notificationLength != default_settings.notificationLength) {
        dom('notificationLength').value = settings.notificationLength;
    }

    // Disable keybinds
    if(settings.disableKeybinds != default_settings.disableKeybinds) {
        elDisableKeybinds.checked = settings.disableKeybinds;
    }

    optionSoundsDisable(settings.enableSounds);
}
/** Save settings object in localStorage */
function saveSettings() {
    if(player.flags['cookies_accepted'] != true) return;
    localStorage.setObject("settings", settings);
}
/** Reset settings to defaults */
function resetSettings(dialog=false) {
    settings = JSON.parse(JSON.stringify(default_settings));
    saveSettings();
    fillSettingsPage();

    if(!dialog) return;
    toast('Settings Reset', 'All settings returned to defaults');
}

// Default keybinds
const keybinds_default = {
    // Gameplay
    key_carrot: 'Spacebar',
    key_multibuy: 'Shift',
    key_bill_lvlup: '1',
    key_belle_lvlup: '2',
    key_greg_lvlup: '3',
    key_craft_0: '4',
    key_craft_1: '5',
    key_craft_2: '6',
    key_craft_3: '7',
    key_craft_4: '8',
    key_craft_5: '9',
    // modifier_equip: 'Shift',

    // Interface
    key_cleartoasts: 'X',
    key_prestige: 'P',
    key_inventory: 'E',
}
keybinds_default['keys'] = Object.keys(keybinds_default);

// Default settings object
const default_settings = {
    notificationLength: 6,      // number - Time in seconds
    disableKeybinds: false,     // boolean
    autosave_interval: 5,

    tutorial_messages: true,    // boolean
    carl_shop_toasts: true,     // boolean
    cosmetic_auto_equip: false, // boolean

    master_volume: 0.8,           // number - Between 0 and 1
    enableSounds: true,         // boolean
    enableMusic: false,         // boolean
    enableCarrotSounds: false,  // boolean

    full_numbers: false,        // boolean
    enableMainProgress: true,   // boolean
    confetti_effects: true,     // boolean

    // UI
    theme: 'theme_dark',        // string
    cosmetics: {
        farmable: 'default',
        bill: 'default',
        belle: 'default',
        greg: 'default',
        charles: 'default',
        carl: 'default',
        tools: 'default',
    },
    openpanel: null,            // string
    cosmetics_grid: true,       // boolean
    achievements_grid: false,   // boolean
    compact_achievements: false,// boolean
    fun_tip_percentage: 50,     // number - between 0 and 100

    keybinds: keybinds_default, // object
}

var settings;

playerCharKeys   = Object.keys(player.characters);

// Settings object
if(localStorage.getObject("settings") != null) {
    // Save found
    console.log('[Settings] SETTINGS localStorage object found!');
    settings = localStorage.getObject('settings');
} else {
    // Create from default
    console.log('[Settings] No localStorage object found, creating...');
    resetSettings();
    saveSettings();
}


// Clear localStorage
function clearSave() {
    preventSaveGame = true;
    ClearLocalStorage();
}

//#endregion

/* ----------------------Functions------------------------*/
//#region

// Multibuy
const multibuy = [1,10,100]; // multibuy multipliers
var mbsel      = 0;          // multi-buy selector
/** Cycles multibuy amount */
function multibuySpin() {
    if(multibuy[multibuy.length-1] > multibuy[mbsel]) { mbsel++; }
    else { mbsel=0; }

    // Update page
    characterPrices();
    characterButtons();
    updateHoePrices();
    DisplayAllHoes();
    updateCharlesShop();
    eInnerText(dom("multibuy"), multibuy[mbsel] + "x");

    // Tutorial message
    if(player.flags['tutorial_multibuy'] != true) {
        toast('Tutorial: Multibuy', 'Press shift, or click the 10x indicator in the status bar to cycle multibuy. Multibuy allows you to level up more characters, craft and equip tools more tools at once.', '', false, true,);
        player.flags['tutorial_multibuy'] = true;
    }
}

/** Clears localStorage
 * @param {Boolean} disableReload 
 */
function ClearLocalStorage(disableReload) {
    console.log('Clearing local storage');
    window.scrollTo(0, 0);
    
    localStorage.clear();
    if(disableReload) return;
    location.reload();
}

/** Gives a random number between 0 and max
 * @param {number} max 
 * @returns Random Number
 */
function r(max) { return Math.floor(Math.random() * max); }

/** Shorthand for adding/removing a CSS class to/from an element
 * @param {node} element HTML element
 * @param {string} classname CSS class name
 * @param {boolean} state true = add, false = remove
 */
function style(element, classname, state) {
    if(state) { element.classList.add(classname); }
    else { element.classList.remove(classname); }
}

// Store click speed
var clickSpeed = 0;
var clickSpeedBest = 0;
var clickArray = [];

/** Earn carrots function
 * @param {number} amount Amount of carrots to be earned
 * @param {string} type Can be click, idle, or bonus. For statistics.
 * @param {boolean} useMousePos If the number popup should appear at mouse position or not
 */
function earnCarrots(amount, type, useMousePos = false) {
    if(type == 'bonus') { popupHandler(useMousePos, DisplayRounded(amount, 1), 'falling'); }

    player.carrots += amount;
    player.prestige.carrots += amount;
    player.lifetime.carrots += amount;

    // Type
    switch(type) {
        // Click
        case 'click':
            player.prestige.click_carrots += amount
            player.prestige.clicks ++;

            player.lifetime.click_carrots += amount;
            player.lifetime.clicks ++;
            break;
        // Idle
        case 'idle':
            player.prestige.idle_carrots += amount;
            player.lifetime.idle_carrots += amount;
            break;
        // Bonus
        case 'bonus':
            player.prestige.bonus_carrots += amount;
            player.lifetime.bonus_carrots += amount;

            player.prestige.falling_carrots_grabbed++;
            player.lifetime.falling_carrots_grabbed++;
            break;
    }

    carrotCount();
    characterButtons();
    // DisplayAllHoes();
    calculatePrestigePotential();
}

/** Earn currency
 * @param {number} amount Amount of cash to be earned
 * @param {string} type 'bonus' will use mouse position
 */
function earnCash(amount, type) {
    if(type == 'bonus') {
        popupHandler(true, amount, 'cash');
    } else {
        popupHandler(false, amount, 'cash');
    }

    player.cash += amount;
    player.lifetime.cash += amount;

    cashCount(true);
}

// Carrot event listeners
var holdDelay;
var holdClock;
mainCarrot.addEventListener('mousedown',    () => { holdStart(); });
mainCarrot.addEventListener('touchstart',   () => { holdStart(); });
/** Holding down clicks carrots
 * @param {Boolean} useMousePos 
 */
function holdStart(useMousePos = true) {
    clearTimeout(holdDelay);
    holdDelay = setTimeout(() => {
        clearInterval(holdClock)
        holdClock = setInterval(() => {
            if(document.hidden) { clearInterval(holdClock); return; }
            onClick(useMousePos, 'click');
            // mainCarrot.click(); // alternative
        }, 1000 / (Six.data.clickrate.value || 2)); // replace with clicks per second
    }, 250);
}
mainCarrot.addEventListener('mouseup',      () => { holdStop(); });
mainCarrot.addEventListener('mouseout',     () => { holdStop(); });
mainCarrot.addEventListener('touchend',     () => { holdStop(); });
mainCarrot.addEventListener('touchcancel',  () => { holdStop(); });
window.onblur = () => { holdStop(); }
/**
 * Stops Clciking on release
 */
function holdStop() {
    clearTimeout(holdDelay);
    clearInterval(holdClock);
}

// Carrot click
mainCarrot.addEventListener('click', () => { onClick(true, 'click'); });
var clickMethod = -1; // -1 = any, 0 = click, 1 = key
var clickMethodTimer;
/** Carrot Click
 * @param {Boolean} useMousePos Whether or not to use the mouse position for the number popup
 * @param {String} method For statistics (unused)
 * @param {Number} source To prevent spacebar & click from being used simultaneously
 * @returns 
 */
function onClick(useMousePos, method='click', source=0) {
    // Prevent click/spacebar at the same time
    if(clickMethod == -1) {
        clickMethod = source;
        clearTimeout(clickMethodTimer);
        clickMethodTimer = setTimeout(() => { clickMethod = -1; }, 1000);
    }
    if(clickMethod != source && clickMethod != -1 && !Six.data.spacebar_click.value) return;

    // Grant carrots
    earnCarrots(player.cpc, 'click');
    fallingConsecutive = 0;

    // Trinkets
    cpsbuff = 5;

    // Page stuff
    carrotCount();
    popupHandler(useMousePos, DisplayRounded(Math.floor(player.cpc,2), 1, 10000, unitsShort));
    mouseConfetti([1, 2], ccCarrot);

    // Click speed
    clickSpeedHandler(true);

    // Falling carrots
    fallingCarrot();

    // Sound effect
    if(
        settings.enableSounds == false
        || settings.enableCarrotSounds == false
    ) return;
    randomSound('crunch', 95);
}

// Falling carrots
var fallingCarrotPromiser = 0;
var fallingID = 0;
var fallingActive = 0;
var fallingFrenzy = false;
var fallingConsecutive = 0;
const fallingCarrotsArea = dom('fallingCarrotsArea');
/** Creates a falling carrot */
function fallingCarrot() {
    // Roll
    let roll = Math.ceil((Math.random() * 100));
    let rollchance = 1; // 1% chance
    if(roll <= rollchance && fallingActive < 4 || fallingFrenzy == true || fallingCarrotPromiser >= 100) {
        fallingCarrotPromiser = 0;
    } else {
        fallingCarrotPromiser++;
        return;
    }
    
    // Create element
    var element = document.createElement("img");
    
    // 6% chance the drop is money instead
    let type = Math.ceil(Math.random() * 100) <= 6 ? 'cash' : 'carrot';

    element.src = type == 'carrot' ? cosmetics.farmable[settings.cosmetics.farmable].image : './assets/cash.png';
    element.classList.add('falling_carrot');
    if(Math.floor(Math.random() * 2) == 0) { element.classList.add('mirror'); }
    element.id = fallingID;
    fallingID++;
    fallingActive++;

    let amount;

    if(type == 'carrot') {
        // Carrot reward
        // Between 500% and 2000% of player's CPC
        let rewardVariation = (Math.ceil((Math.random() * 1500)) + 500) / 100;
        rewardVariation *= ((Six.data.falling_bonus.value / 100) + 1) || 1;
        amount = Math.round(player.cpc * rewardVariation);
    } else if(type == 'cash') {
        // Cash reward
        // Starts between:    5-10
        // After 1b lifetime: 5-13
        // After 1t lifetime: 8-16
        // After 1q lifetime: 12-24
        let max = 5; // maximum, minus the minimum
        let min = 5; // minimum, added after
        if(player.lifetime.carrots >= 1000000000)       { max =  8; }
        if(player.lifetime.carrots >= 1000000000000)    { min =  8; }
        if(player.lifetime.carrots >= 1000000000000000) { min = 12; max = 12; }
        amount = Math.ceil((Math.random() * max)) + min;
    }

    // Set onclick function
    element.onclick = () => { catchCarrot(element.id, type, amount); };

    // Positioning
    let randomX = Math.floor((Math.random() * 324));
    element.style.left = randomX + "px";

    // To page
    fallingCarrotsArea.append(element);

    element.classList.add('bright_200');

    setTimeout(() => {
        if(dom(element.id) != null) {
            dom(element.id).remove();
            fallingActive--;
        }
    }, 2600);

    /** Grant reward when falling carrot is caught */
    function catchCarrot(id, type, amount) {
        dom(id).remove();
        fallingActive--;
        fallingConsecutive++;
        if(fallingConsecutive > player.fallingConsecRecord || player.fallingConsecRecord == undefined) {
            player.fallingConsecRecord = fallingConsecutive;
        }

        if(type == 'carrot') {
            if(player.flags['hardcore']) amount *= -1;
            earnCarrots(amount, 'bonus', true);
            mouseConfetti([6, 8], ccCarrot, 300);
        } else if(type == 'cash') {
            earnCash(amount, 'bonus');
            mouseConfetti([8, 10], ccGold, 300);
        }

        clickSpeedHandler(true);
        fallingCarrot(); // Roll again
    }
}

/* ----------------------Page Manipulation Functions------------------------*/
//#region 
const elPrestigeStats = dom('this_prestige_stats');

/** Updates carrot count on the page */
function carrotCount() {
    count = settings.full_numbers != true ?
    DisplayRounded(Math.floor(player.carrots), 3, 1000000) : numCommas(Math.floor(player.carrots));
    eInnerText(elCarrotCount, count);
}
/** Updates player.cash on the page */
function cashCount(flash = true) {
    eInnerText(elCashCount, numCommas(player.cash));
    if(characterQuery('carl')) { updateCarlsShop(); }
    if(characterQuery('six'))  { updateSixsShop(); }

    // Flash
    if(flash != true) return;
    dom('list_cash').classList.add('flash_cash');
    setTimeout(() => { dom('list_cash').classList.remove('flash_cash'); }, 2000);
}
/** Updates character level up prices on the page */
function characterPrices() {
    // Update page
    eInnerText(
        elCharacterUpCost.bill,
        `${DisplayRounded(CharacterLevelUpPrice(Boomer_Bill, multibuy[mbsel], "query"), 1)}`,
    );
    eInnerText(
        elCharacterUpCost.belle,
        `${DisplayRounded(CharacterLevelUpPrice(Belle_Boomerette, multibuy[mbsel], "query"), 1)}`,
    );
    eInnerText(
        elCharacterUpCost.greg,
        `${DisplayRounded(CharacterLevelUpPrice(Gregory, multibuy[mbsel], "query"), 1)}`,
    );
    
    // Character levels
    eInnerText(elCharacterLevel.bill, `Lvl: ${numCommas(Boomer_Bill.lvl,1)}`);
    eInnerText(elCharacterLevel.belle, `Lvl: ${numCommas(Belle_Boomerette.lvl,1)}`);
    eInnerText(elCharacterLevel.greg, `Lvl: ${numCommas(Gregory.lvl)}`);
}
/** Updates CPC and CPS values on the page */
function updateCPC(flash=true) {
    let cpc;
    let cps;

    // Belle bonus display
    let star = '';
    if(cpsbuff == 0 || Six.data.belle_bonus.value == 0 || player.cps == 0) {
        cps = player.cps;
    } else {
        cps = player.cps * ((Six.data.belle_bonus.value / 100) + 1) || 0;
        star = '*';
    }

    // Full numbers or not
    if(settings.full_numbers != true) {
        cpc = DisplayRounded(Math.floor(player.cpc),2);
        cps = DisplayRounded(Math.floor(cps),2) + star;
    } else {
        cpc = numCommas(Math.floor(player.cpc));
        cps = numCommas(Math.floor(cps)) + star;;
    }
    eInnerText(elCPC, cpc);
    eInnerText(elCPS, cps);
}
/** Updates character's upgrade buttons to be grayed out if it's too expensive */
function characterButtons() {
    if(player.carrots >= Boomer_Bill.lvlupPrice) { dom('Bill_level_up').classList.remove('grayedout'); }
    else { dom('Bill_level_up').classList.add('grayedout'); }
    if(player.carrots >= Belle_Boomerette.lvlupPrice) { dom('Belle_level_up').classList.remove('grayedout'); }
    else { dom('Belle_level_up').classList.add('grayedout'); }
    if(player.carrots >= Gregory.lvlupPrice) { dom('Greg_level_up').classList.remove('grayedout'); }
    else { dom('Greg_level_up').classList.add('grayedout'); }
}
/** Updates Hoe prices on the page */
function updateHoePrices() {
    eInnerText(elHoePrices.wooden,    `${DisplayRounded(HoeCost(0,multibuy[mbsel]),1)}`);
    eInnerText(elHoePrices.stone,     `${DisplayRounded(HoeCost(1,multibuy[mbsel]),1)}`);
    eInnerText(elHoePrices.iron,      `${DisplayRounded(HoeCost(2,multibuy[mbsel]),1)}`);
    eInnerText(elHoePrices.gold,      `${DisplayRounded(HoeCost(3,multibuy[mbsel]),1)}`);
    eInnerText(elHoePrices.diamond,   `${DisplayRounded(HoeCost(4,multibuy[mbsel]),1)}`);
    eInnerText(elHoePrices.netherite, `${DisplayRounded(HoeCost(5,multibuy[mbsel]),1)}`);
}
/** Updates Charles' shop content */
function updateCharlesShop() {
    // Highlight when affordable
    style(elCharles.shop.improveWorkingConditions, 'cant_afford', (Charles.tome.improveWorkingConditions.price >= player.golden_carrots));
    style(elCharles.shop.betterHoes, 'cant_afford', (Charles.tome.betterHoes.price >= player.golden_carrots));
    style(elCharles.shop.decreaseWages, 'cant_afford', (Charles.tome.decreaseWages.price >= player.golden_carrots));

    // Update tome prices
    eInnerText(elCharles.prices.improveWorkingConditions, `${numCommas(CharlesUpgradePrices(Charles.tome.improveWorkingConditions,multibuy[mbsel],"query"))} Golden Carrots`);
    eInnerText(elCharles.prices.betterHoes, `${numCommas(CharlesUpgradePrices(Charles.tome.betterHoes,multibuy[mbsel],"query"))} Golden Carrots`);
    eInnerText(elCharles.prices.decreaseWages, `${numCommas(CharlesUpgradePrices(Charles.tome.decreaseWages,multibuy[mbsel],"query"))} Golden Carrots`);

    // Update tome effects
    eInnerText(tomeEffect.iwc, `+${110 * Charles.tome.improveWorkingConditions.value}%`);
    eInnerText(tomeEffect.bh,  `+?%`);
    eInnerText(tomeEffect.dww, `-?%`);

    // Update tome counts
    eInnerText(tomeCount.iwc, `Owned: ${numCommas(Charles.tome.improveWorkingConditions.value)}`);
    eInnerText(tomeCount.bh,  `Owned: ${numCommas(Charles.tome.betterHoes.value)}`);
    eInnerText(tomeCount.dww, `Owned: ${numCommas(Charles.tome.decreaseWages.value)}`);

    // Debugging tooltip
    eInnerText(elCharles.charlesTooltip,
        ` ${Math.floor(Charles.tome.improveWorkingConditions.value)}%\n
        BH: ${Math.floor(Charles.tome.betterHoes.value)}%\n
        DWW: ${(DecreaseWagesEffects()*100).toFixed(2)}%`);
}

/** Updates golden carrot count on the page. Won't run if prestige_available is false */
function updateGC() {
    if(player.prestige_available != true) return;
    eInnerText(elGoldenCarrotCount, 'Golden Carrots: ' + DisplayRounded(player.golden_carrots, 2));
}

var carlShopData = {};
/** Updates Carl's shop affordability highlighting */
function updateCarlsShop() {
    let keys = Object.keys(carlShopData);
    for(let sd = 0; sd < keys.length; sd++) {
        let element = dom(`carl_shop_${keys[sd]}`);
        let price = carlShopData[keys[sd]];
        style(element, 'cant_afford', (player.cash < price));
    }
}
/** Updates Six's shop affordability highlighting */
function updateSixsShop() {
    let keys = Default_Six.shop.keys;
    try {
        for(i = 0; i < keys.length; i++) {
            let key = keys[i];
            if(!Six.data[key].available) continue;
            var element = dom(`six_shop_${keys[i]}`);
            let price = Default_Six.shop[key].price[Six.data[key].level];
            style(element, 'cant_afford', (player.cash < price));
        }
    } catch (error) {
        // console.error(error);
    }

}
/** Unhides the prestige section in statistics */
function showPrestigeStats() {
    elPrestigeStats.classList.add('unremove');
}
const elPageCount = dom('page_count');
/** Displays number of pages */
function pagesCount(flash=true) {
    elPageCount.innerText = numCommas(player.pages);

    // Flash
    if(flash != true) return;
    dom('list_pages').classList.add('flash_white');
    setTimeout(() => { dom('list_pages').classList.remove('flash_white'); }, 2000);
}
const elMainIcon = dom('main_icon');
/** Changes the Icon at the top of the page dynamically */
function updateMainIcon() {
    // Harmode
    if(player.flags['hardcore'] == true) {
        elMainIcon.src   = './assets/easter_egg.png';
        elMainIcon.title = 'Hardmode';
    }
    // Gold Medal
    else if(achieveQuery('all_achievements')) {
        elMainIcon.src   = './assets/medal_spin.gif';
        elMainIcon.title = '100% Completion';
    }
    // Silver Medal
    else if(achieveQuery('all_normal_achievements')) {
        elMainIcon.src   = './assets/medal_silver_transparent.gif';
        elMainIcon.title = 'All normal achievements complete';
    }
    // Bronze Medal
    else if(achieveQuery('50_percent_achievements')) {
        elMainIcon.src   = './assets/medal_bronze_transparent.gif';
        elMainIcon.title = '50% Completion';
    }
    // Golden Carrot
    else if(achieveQuery('1_prestige')) {
        elMainIcon.src   = './assets/theme/pixel_golden_carrot.png';
        elMainIcon.title = 'Prestiged';
    }
    // Dev mode
    else if(isDebug()) {
        elMainIcon.src   = './assets/items/keyboard_2.png';
        elMainIcon.title = 'Dev mode';
    }
    // Default
    else {
        elMainIcon.src   = './assets/pixel_carrot_32x.png';
        elMainIcon.title = 'Carrot Clicker';
    }
}
const elPrestigeMenuGCCount = dom('prestige_menu_gc_count');
const elPrestigeMenuTPCount = dom('prestige_menu_tp_count');
/** Updates the prestige menu */
function updatePrestigeMenu() {
    eInnerText(elPrestigeMenuGCCount, DisplayRounded(player.golden_carrots));
    eInnerText(elPrestigeMenuTPCount, numCommas(player.pages));
    eInnerText(elPrestigePotential, DisplayRounded(player.prestige_potential.toFixed(0),2));
}


setInterval(() => {
    clickSpeedHandler(false);
}, 1000);
/**
 * Click speed handler
 * @param {boolean} clicked 
 */
function clickSpeedHandler(clicked = false) {
    if(clicked == true) { clickArray.push(Date.now()); }

    // Purge clicks older than 1 second
    for(let i = 0; i < clickArray.length; i++) {
        if(clickArray[i] < Date.now() - 3000) {
            // Check if there is only 1 left or not because splice doesn't work with arrays with 1 value
            if(clickArray.length != 1) { clickArray.splice(i, i); }
            else { clickArray = []; }
        };
    }

    clickSpeed = Math.floor(clickArray.length / 3); // Update click speed
    if(clickSpeedBest < clickSpeed) { clickSpeedBest = clickSpeed; }
    if(clickSpeedBest > player.clickSpeedRecord) { player.clickSpeedRecord = clickSpeedBest; } // Record
    if(clickSpeed == 0) { clickSpeedBest = 0; } // Reset best on 0

    // Update page
    // if(n != 0) return;
    eInnerText(elClickSpeed, `${clickSpeed}/${clickSpeedBest} clicks per second`);
}

//#endregion

/** Carrots per click */
var cpsbuff = 0;
var cpsInterval = setInterval(CarrotsPerSecond, 100);
function CarrotsPerSecond() {
    let cps = player.cps;
    if(cps <= 0) return;
    if(cpsbuff != 0) {
        cps *= ((Six.data.belle_bonus.value / 100) + 1) || 1;
        cpsbuff--;
    }
    earnCarrots(cps/10, 'idle');

    // Might want to change this but it seems to be fine   for now
    // Note: this being here is the only reason the counter gets updated immediately, if this gets removed it needs to go in every function that changes carrot count or in the main game loop
    carrotCount();
}

/** Calculates price for Characters
 * @param {object} character Character object
 * @param {number} amount Multibuy amount
 * @param {string} mode Can be: "query" or "apply"
 * @returns New Character Level up Price
 */
function CharacterLevelUpPrice(character=Boomer_Bill, amount=1, mode="query"){
    // console.log(`CharacterLevelUpPrice(${character.nickname}, ${amount}, ${mode})`);
    let r = character.lvlupPrice;
    let r2=0;

    function multibuyPrice(PriceIncrease) {
        r += (1 - DecreaseWagesEffects()) * Math.floor(r * PriceIncrease);
        if(amount==1){
            r2=r;
            return;
        }
        r2 += r; 
        // console.log(`multibuyPrice(${PriceIncrease})\nr = ${r}\nr2 = ${r2}`);
    }
    // Multibuy loop
    if(amount==1){
        // Gregory
        if(character==Gregory){
            if(Gregory.lvl+i<50){
                multibuyPrice(0.14);
            }else{
                multibuyPrice(0.21);
            }
        }
        // Belle
        else if(character==Belle_Boomerette){
            if(Belle_Boomerette.lvl+i<75){
                multibuyPrice(0.11);
            }else if(Belle_Boomerette.lvl+i<100&&Belle_Boomerette.lvl+i>=75){
                multibuyPrice(0.12)
            }else{
                multibuyPrice(0.08)
            }   
        }
        // Bill
        else if(character==Boomer_Bill){
            if(Boomer_Bill.lvl+i<75){
                multibuyPrice(0.11);
            }else if(Boomer_Bill.lvl+i<100&&Boomer_Bill.lvl+i>=75){
                multibuyPrice(0.13);
            }else{
                multibuyPrice(0.09);
            }
            
        }
    }else{
        for(i=1; i<amount; i++){
            // Gregory
            if(character==Gregory){
                if(Gregory.lvl+i<50){
                    multibuyPrice(0.14);
                }else{
                    multibuyPrice(0.22);
                }
            }
            // Belle
            else if(character==Belle_Boomerette){
                if(Belle_Boomerette.lvl+i<75){
                    multibuyPrice(0.07);
                }else if(Belle_Boomerette.lvl+i<100&&Belle_Boomerette.lvl+i>=75){
                    multibuyPrice(0.06)
                }else{
                    multibuyPrice(0.08)
                }   
            }
            // Bill
            else if(character==Boomer_Bill){
                if(Boomer_Bill.lvl+i<75){
                    multibuyPrice(0.11);
                }else if(Boomer_Bill.lvl+i<100&&Boomer_Bill.lvl+i>=75){
                    multibuyPrice(0.13);
                }else{
                    multibuyPrice(0.09);
                }
                
            }
        }
    }
    
    // Apply
    if(mode=="apply") character.lvlupPrice = Math.floor(r);
    return amount == 1 ? character.lvlupPrice : r2;
}

/** Levels up characters
 * @param {Object} character Character object
 * @param {Number} amount Multibuy amount
 * @returns If unable to level up
 */
function LevelUp(character=Boomer_Bill, amount=1) {
    if(characterQuery(character.nickname) == false) return;
    if(player.carrots >= CharacterLevelUpPrice(character, amount)) {
        character.lvl += amount;
        player.carrots -= CharacterLevelUpPrice(character,amount);
        CharacterLevelUpPrice(character, amount, "apply");

        // Update page
        carrotCount();
        characterPrices();
        characterButtons();
        updateCPC();
        if(character==Boomer_Bill){player.cpc=Calculate_Carrots(Boomer_Bill);}
        if(character==Belle_Boomerette){player.cps=Calculate_Carrots(Belle_Boomerette);}

        // Animation
        mouseConfetti([2, 3], ccGold);
    }
}
// function LevelUp(character=Boomer_Bill, amount=1) {
//     // var array=[];
//     // var multiplier = 1.11;
//     // for(i=1;i<=amount;i++){
//     //     array.push((1-DecreaseWagesEffects)*(multiplier*array[i-1]))
//     // }
    
//     if(characterQuery(character.nickname) == false) return;
//     if(player.carrots >= r) {
//         character.lvl += amount;
//         player.carrots -= r;
//         character.lvlupPrice=array[amount];

//         // Update page
//         carrotCount();
//         characterPrices();
//         characterButtons();
//         updateCPC();
//         if(character==Boomer_Bill){player.cpc=Calculate_Carrots(Boomer_Bill);}
//         if(character==Belle_Boomerette){player.cps=Calculate_Carrots(Belle_Boomerette);}

//         // Animation
//         mouseConfetti([2, 3], ccGold);
//     }
// }

/** Performs a prestige, which gives Golden Carrots and resets attributes
 * @returns If unable to Prestige
 */
function Prestige() {
    console.log('Prestiging...');

    if(player.prestige_potential < 1) {
        console.warn('Insufficient prestige potential');
        toast('Cannot Prestige', 'Insufficient prestige potential. Try again later.');
        return;
    }

    window.scrollTo(0, 0);
    clearInterval(cpsInterval);

    // Statistics
    player.prestige = JSON.parse(JSON.stringify(playerPrestigeTemplate));
    // Give golden carrots
    player.golden_carrots += player.prestige_potential;
    player.lifetime.golden_carrots += player.prestige_potential;
    player.lifetime.prestige_count += 1;

    // Reset characters to default
    [
        Boomer_Bill.lvlupPrice,
        Belle_Boomerette.lvlupPrice,
        Gregory.lvlupPrice
    ] = [
        Default_Boomer_Bill.lvlupPrice,
        Default_Belle_Boomerette.lvlupPrice,
        Default_Gregory.lvlupPrice
    ];
    [
        Boomer_Bill.lvl,
        Belle_Boomerette.lvl,
        Gregory.lvl
    ] = [
        Default_Boomer_Bill.lvl,
        Default_Belle_Boomerette.lvl,
        Default_Gregory.lvl
    ];
    for(i=0;i<6;i++){
        Boomer_Bill.Hoes[i] = 0;
        Belle_Boomerette.Hoes[i] = 0;
        Gregory.Hoes[i]=0;
        Gregory.HoePrices[i] = Default_Gregory.HoePrices[i];
    }
    player.equippedHoes=0;
    player.carrots = 0;
    cpsInterval = setInterval(CarrotsPerSecond, 100);
    tips.tracker=0;

    // Save
    saveGame();

    // Tutorial message
    if(player.lifetime.prestige_count == 1) {
        let toaster = toast('Tutorial: Golden Carrots', 'Now that you\'ve prestiged, you\'ll want to buy some tomes. Visit Charles\' shop to see what tomes are available to you.', '', true, false, false, true, () => { closeToast(toaster); }, "Got it");
    }

    // Recalculate & update prestige potential
    calculatePrestigePotential();
    seeButton('prestige');

    // Update page
    carrotCount();
    characterPrices();
    characterButtons();
    updateCharlesShop();
    // updatePrestigeMenu();
    showPrestigeStats();

    // calculate CPC and CPS
    player.cpc = Calculate_Carrots(Boomer_Bill);
    player.cps = Calculate_Carrots(Belle_Boomerette);
}
/** Calculates Carrots Per Click or Per Second Based on inputing Bill or Belle
 * @param {Object} character 
 * @returns Carrots per Click or Carrots per Second
 */
function Calculate_Carrots(character) {
    let bH=1+Charles.tome.betterHoes.value/100 // Calculate betterHoes bonus
    let Zcheck2 = Charles.tome.improveWorkingConditions.value > 0 ? 0:1; // Zcheck Checks to see if result in 0 Carrots Per
    // Calculates Hoe Values
    let modifier = 10;
    let cpHoes = (1*bH*(character.Hoes[0]) + 1);
    for(let i = 1; i < character.Hoes.length; i++) {
        cpHoes += (modifier*bH*character.Hoes[i]);
        modifier *= 10;
    }
    
    // Returns proper value for Carrots Per
    if(cpHoes>0) return (1.1 * Charles.tome.improveWorkingConditions.value+Zcheck2)*character.lvl*cpHoes;
    else return (1.1 * Charles.tome.improveWorkingConditions.value+Zcheck2)*character.lvl;
}

/** Calculates the prestige potential and updates the page */
function calculatePrestigePotential() {
    player.prestige_potential = Math.floor(
        5 * Math.pow(0.00000001 * player.prestige.carrots, 0.45) * (1 + (player.pages * (Six.data.page_bonus.value || 1)/100))
    );

    // Update page
    if(!settings.full_numbers) { eInnerText(elMainPrestigePotential, DisplayRounded(player.prestige_potential.toFixed(0),2)); }
    else { eInnerText(elMainPrestigePotential, numCommas(player.prestige_potential.toFixed(0))); }
    if(prestigeMenuOpen) { eInnerText(elPrestigePotential, DisplayRounded(player.prestige_potential.toFixed(0),2)); }

    // Make button glow if prestiging will double lifetime
    if(
        (player.lifetime.golden_carrots == 0 && player.prestige_potential >= 20)
        || (player.lifetime.golden_carrots != 0 && player.prestige_potential > player.lifetime.golden_carrots)
    )
    { dom('prestige_menu_button').classList.add('glowing'); }
    else { dom('prestige_menu_button').classList.remove('glowing'); }
}

//#endregion

/*---------------------Charles Functions------------------*/
//#region 
/** Calculates and optionally sets the prices for Charles' tomes
 * @param {*} tome Example: Charles.tome.improveWorkingConditions
 * @param {number} amount 
 * @param {string} mode Options: "query" or "apply"
 * @returns The calculated price
 */
function CharlesUpgradePrices(tome=Charles.tome.improveWorkingConditions, amount=1, mode="query"){
    let r = tome.price;
    let r2 = tome.price;
    
    function multibuyPrice(PriceIncrease) {
        // console.log(r+=Math.ceil(r*PriceIncrease));

        if(Math.floor(r*PriceIncrease)==0){
            r+=Math.ceil(r*PriceIncrease);
        }else{
            r+=Math.floor(r*PriceIncrease);
        }
       
        r2+=r;
        if(amount==1){
            r2=r;
        }   
    }
    if(amount==1){
        //decreaseWages
        if(tome==Charles.tome.decreaseWages){
            if(Charles.tome.decreaseWages.price+i<=50){
                multibuyPrice(0.001);
            }else{
                multibuyPrice(0.039);
            }
        }
        //improveWorkingConditions
        else if(tome==Charles.tome.improveWorkingConditions){
            if(Charles.tome.improveWorkingConditions.price+i<50){
                multibuyPrice(0.001);
            }else{
                multibuyPrice(0.039);
            }
        }
        //betterHoes
        else if(tome==Charles.tome.betterHoes){
            if(Charles.tome.betterHoes.price+i<75){
                multibuyPrice(0.001);
            }else{
                multibuyPrice(0.039);
            }
            
        }
    }else{
        for(i=1; i<amount; i++){
        
    }
    }
    // for(i=0;i<=amount;i++){
    //     if(tome==Charles.tome.decreaseWages){
    //        multibuyPrice(0.01); 
    //     }
    //     if(tome==Charles.tome.improveWorkingConditions){
    //         multibuyPrice(0.01);
    //     }
    //     if(tome==Charles.tome.betterHoes){
    //         multibuyPrice(0.01);
    //     }
    // }
    if(mode=="apply"){tome.price=r2}
    if(amount==1){return tome.price}
    return r2;
}

/** Buy tome
 * @param {*} tome Example: Charles.tome.improveWorkingConditions
 * @param {number} amount 
 * @returns 
 */
function BuyTome(tome=Charles.tome.improveWorkingConditions, amount=1) {
    if(tome.max != undefined && tome.max != false && tome.value + amount > tome.max) {
        toast('Maximum tomes reached', 'You can only have 22025 Decrease Wages tomes', '', false, true);
        return;
    }
    if(player.golden_carrots >= CharlesUpgradePrices(tome,amount)) {
        tome.value += amount;
        player.lifetime.tomes_bought ++;
        player.golden_carrots -= CharlesUpgradePrices(tome,amount);
        CharlesUpgradePrices(tome,amount,"apply");

        // Recalculate
        player.cpc = Calculate_Carrots(Boomer_Bill);
        player.cps = Calculate_Carrots(Belle_Boomerette);

        // Update page
        updateCharlesShop();
        updateCPC();
        updateGC();
        mouseConfetti([3, 8], ccWhite);
    }
}

/** Calculates Decrease Wages Effect
 * @returns Percentage of wage off
 */
function DecreaseWagesEffects(){
    if(Charles.tome.decreaseWages.value<1000){
        return((Math.pow(Math.log(Charles.tome.decreaseWages.value+1),3)/318.114));
    }else if(Charles.tome.decreaseWages.value<1000){
        return((Math.pow(Math.log(Charles.tome.decreaseWages.value+1),2)/69.077553));
    }else{
        return (Math.log(Charles.tome.decreaseWages.value+1)/10);
    }
}
//#endregion


/*-----------Hoe Functions--------------*/
//#region

/** Stores The Correct Hoe Price
 * @param {number} type 
 * @param {number} amount 
 * @param {string} mode Options: "query" or "apply"
 * @returns Calculated hoe cost
 */
function HoeCost(type=0,amount=1,mode="query"){
    var p = Gregory.HoePrices[type];
    var p2 = 0;
    if(amount==1){
        if(mode=="apply"){
            Gregory.HoePrices[type]+=(0.02*p);
        }
        return p;
    }
    for(j=0;j<amount;j++){
        p+=(0.02*p);
        p2+=p;     
    }

    if(mode=="apply"){
        Gregory.HoePrices[type]=p;
    }
    return p2;
}

/** Returns tool image src given a tool ID
 * @param {number} type 
 * @returns Image source
 */
function hoeImg(type) {
    return cosmetics['tools'][settings.cosmetics.tools][type];
}

/** Greg level test */
function gregLevelTest(type, minusone = true) {
    let modifier = -1;
    if(minusone == false) modifier = 0;

    if(type == 0) {
        if(Gregory.lvl == 0) return true;
        return false;
    }
    if(Gregory.lvl >= (type*25)) return false;
    return true;
}

/** Craft tool (Greg)
 * @param {number} type Tool ID
 * @param {number} amount Amount to craft
 * @param {number} progress Value given if the game is started and an unfinished crafting job is found in the save file
 * @returns If a condition for crafting (such as cost) is not met
 */
function CreateHoe(type=0, amount=1, progress=0) {
    // Greg unlock check
    if(characterQuery('greg') == false) return;

    // Return if a hoe is already in progress
    if(n==1){
        // toast("Greg is busy", "Wait until he is done crafting", '', false, true);
        return;
    }

    // Checks if Greg is Experienced Enough to Purchase a Hoe.
    if(gregLevelTest(type)) {
        let required = type >= 1 ? (type*25) : 1;
        toast("Unable to craft", `Greg too inexperienced. Greg must be at least Level: ${required} to create this tool`, '', false, true);
        return;
    }

    // Checks to see if Greg Can Hold more of this Type
    if(Gregory.Hoes[type]+amount-1>= Gregory.lvl){
        toast("Insufficient upgrades", "You must upgrade Greg to hold more tools of that type", '', false, true);
        return;
    }
    
    let price = HoeCost(type,amount);
    // Checks if Hoe is Too expensive
    if(price * ((Six.data.greg_min_start.value || 100) / 100) > player.carrots && progress == 0) {
        toast("Too expensive!", "That tool is currently too expensive", '', false, true);
        return;
    }

    // Craft hoe
    if(n==0){
        n=1; 
        HoeCost(type,amount,"apply"); 
        //Creates Hoe And Displays Progress Bar
        var i = 0;
        if (i == 0) {
            i = 1;
            var p = progress;
            var id = setInterval(frame, 100);

            // Main progress bar
            if(settings.enableMainProgress == true) {
                elMainProgressContainer.classList.add('status_tidbit_in');
            }
            dom('main_progress_image').src = hoeImg(type);
            
            // Greg info
            dom('greg_progress_image').src = hoeImg(type);
            dom('greg_crafting_info').classList.remove('inactive');
            dom('greg_crafting_info').title = 'Crafting...';
            // mouseConfetti([1, 4], ccWhite);

            function frame() {
                // Done crafting
                if(p >= price) {
                    clearInterval(id);
                    i = 0;
                    player.carrots+=p-price;
                    p = 0;
                    elGregProgress.style.width = "0%";
                    if(settings.enableMainProgress == true) {
                        elMainProgressBar.style.width = "0%";
                    }
                    elMainProgressContainer.classList.remove('status_tidbit_in');
                    dom('greg_crafting_info').classList.add('inactive');
                    dom('greg_crafting_info').title = 'Idle';

                    Gregory.Hoes[type]+=amount;
                    n=0;

                    // Statistics
                    player.prestige.hoes.crafted[type] += amount;
                    player.prestige.hoes.craftedTotal += amount;

                    player.lifetime.hoes.crafted[type] += amount;
                    player.lifetime.hoes.craftedTotal += amount;

                    Gregory.crafting = false;
                }
                // While crafting
                else {
                    let adjust = ((Six.data.greg_speed.value / 100) || 0.01) * player.carrots;
                    p += adjust;
                    player.carrots -= adjust;

                    // Progress bar
                    elGregProgress.style.width = `${Math.ceil(100*(p/price))}%`;
                    if(settings.enableMainProgress == true) {
                        elMainProgressBar.style.width  = `${Math.ceil(100*(p/price))}%`;
                    }
                    // eInnerText(elClickSpeed, `${DisplayRounded(p)}/${DisplayRounded(price)}`);
                    Gregory.crafting = [type, amount, p]; // Save crafting progress in case of page refresh
                }

            }
        }

        // Update page
        DisplayAllHoes();
        updateHoePrices();
    }
}

/** Equips a tool to a Character
 * @param {object} character Character object
 * @param {number} type Tool ID
 * @param {number} amount 
 * @returns If there is any reason that hoe type can't be equipped
 */
function EquipHoe(character=Boomer_Bill, type=0, amount=1){
    // Greg unlock check
    if(characterQuery('greg') == false) return;

    // Ensure Gregory has enough to give
    if(Gregory.Hoes[type] >= amount){
        // Check if Greg is high enough level to equip
        if(character.Hoes[type]+amount-1>=Gregory.lvl) {
            toast("Insufficient upgrades", "You must upgrade Greg to hold more tools of that type", '', false, true);
            n=0;
            return;
        }

        // Equip
        player.equippedHoes += amount;
        character.Hoes[type] += amount;
        Gregory.Hoes[type] -= amount;
        if(character==Boomer_Bill){player.cpc=Calculate_Carrots(Boomer_Bill);}
        if(character==Belle_Boomerette){player.cps=Calculate_Carrots(Belle_Boomerette);}

        // Update page
        updateCPC();
        DisplayAllHoes();

        // Animate
        // var from =      elHoes['greg'][type];
        // var to =        elHoes[character.nickname][type];
        // var rect_from = from.getBoundingClientRect();
        // var rect_to =   to.getBoundingClientRect();

        // // Create
        // var clone = document.createElement('img');
        // clone.src = from.src;

        // // Move to start
        // clone.style.transform = `translate(${rect_from.left}px, ${rect_from.top}px)`;
        // clone.className = 'toolicon';
        // mcContainer.append(clone);

        // // Move to destination
        // setTimeout(() => {
        //     console.log(clone.style.transform);
        //     clone.style.transform = `translate(${rect_to.left.toFixed(1)}px, ${rect_to.top.toFixed(1)}px))`;
        //     console.log(clone.style.transform);
        //     console.log(`translate(${rect_to.left}px, ${rect_to.top}px))`);
        //     clone.style.width = '32px';
        //     clone.style.hoeImg = '32px';
        // }, 20);

        // Delete
        // setTimeout(() => {
        //     clone.remove();
        // }, 500);
    }
}

/** Update all tools on page */
function DisplayAllHoes() {
    for(i = 0; i < 6; i++) {
        DisplayHoe(Boomer_Bill, i);
        DisplayHoe(Belle_Boomerette, i);
        DisplayHoe(Gregory, i);
    }
}
/** Updates tool affordability highlighting */
function DisplayHoe(character, type) {
    let charString = character.nickname;
    let count = elHoeCount[charString][type];
    let img = elHoes[charString][type];

    // Bill & Belle hoes
    if(charString == 'bill' || charString == 'belle') {
        // Remove blackout and set innertext
        // Greg has a hoe to give
        if(Gregory.Hoes[type] >= 1) {
            img.classList.remove('blackedout');
            img.classList.add('glowing');
        } else {
            img.classList.remove('glowing');
            img.classList.add('blackedout');
        }
    }
    // Greg hoes
    else if(charString == 'greg') {
        // Can afford and is unlocked
        if(
            !gregLevelTest(type, false)
            && Gregory.HoePrices[type] * ((Six.data.greg_min_start.value || 100) / 100) <= player.carrots
        ) {
            img.classList.remove('blackedout');
            img.classList.remove('grayedout');
            eInnerText(count, '');
        }
        // Greg's lvl is sufficient but can't afford
        else if(!gregLevelTest(type, false)) {
            img.classList.add('grayedout');
            img.classList.remove('blackedout');
        }
        // Blacked out
        else {
            img.classList.add('blackedout');
        }
    }


    // Number
    if(character.Hoes[type] == Gregory.lvl && Gregory.lvl != 0) {
        eInnerText(count, 'MAX');
        img.classList.remove('blackedout');
        img.classList.remove('grayedout');
        // count.classList.add('toolfull');
    }
    else if(character.Hoes[type] >= 1) {
        // Not full, show number
        // count.classList.remove('toolfull');
        img.classList.remove('blackedout');
        img.classList.remove('grayedout');
        eInnerText(count, `x${character.Hoes[type]}`);
    } else {
        // Hide number
        // count.classList.remove('toolfull');
        eInnerText(count, '');
    }
}

/** Makes the prestige button visible to the player */
function seeButton(button = 'prestige') {
    if(button == 'prestige') {
        updateGC();
        dom("prestige-section").classList.add('visible');
        dom('prestige_menu_button').disabled = false;
        dom('prestige_menu_button').title = "Prestige";
        dom('prestige_menu_button_img').src = `./assets/icons/pixel_carrot_white.png`; 
    } else if(button == 'hardmode') {
        dom('difficulty_menu_button').classList.remove('hidden');
        dom('difficulty_menu_button').classList.remove('position_absolute');
    }
}


//#endregion

// Game loop (temporary)
setInterval(() => {
    carrotCount();
    updateCPC();
    DisplayAllHoes();
}, 250);


/*-----------------Statistics-----------------*/
//#region 

// Lifetime Statistics Panel
const elStatistics = dom('statistics');
// const statLoading = elStatistics.innerHTML;
const statsNumbers = {
    // Prestige
    prestige_carrots:            dom('prestige_carrots'),
    prestige_carrots_clicked:    dom('prestige_carrots_clicked'),
    prestige_carrots_idled:      dom('prestige_carrots_idled'),
    prestige_carrots_bonus:      dom('prestige_carrots_bonus'),
    prestige_clicks:             dom('prestige_clicks'),
    prestige_falling_carrots_grabbed: dom('prestige_falling_carrots_grabbed'),
    prestige_hoes_crafted_total: dom('prestige_hoes_crafted_total'),
    prestige_hoes_crafted_0:     dom('prestige_hoes_crafted_0'),
    prestige_hoes_crafted_1:     dom('prestige_hoes_crafted_1'),
    prestige_hoes_crafted_2:     dom('prestige_hoes_crafted_2'),
    prestige_hoes_crafted_3:     dom('prestige_hoes_crafted_3'),
    prestige_hoes_crafted_4:     dom('prestige_hoes_crafted_4'),
    prestige_hoes_crafted_5:     dom('prestige_hoes_crafted_5'),

    // Lifetime
    lifetime_carrots:                 dom('lifetime_carrots'),
    lifetime_carrots_clicked:         dom('lifetime_carrots_clicked'),
    lifetime_carrots_idled:           dom('lifetime_carrots_idled'),
    lifetime_carrots_bonus:           dom('lifetime_carrots_bonus'),
    lifetime_golden_carrots:          dom('lifetime_golden_carrots'),
    lifetime_golden_carrots_spent:    dom('lifetime_golden_carrots_spent'),
    lifetime_prestige:                dom('lifetime_prestige'),
    lifetime_cash:                    dom('lifetime_cash'),
    lifetime_cash_spent:              dom('lifetime_cash_spent'),
    lifetime_clicks:                  dom('lifetime_clicks'),
    lifetime_falling_carrots_grabbed: dom('lifetime_falling_carrots_grabbed'),
    lifetime_hoes_crafted_total:      dom('lifetime_hoes_crafted_total'),
    lifetime_hoes_crafted_0:          dom('lifetime_hoes_crafted_0'),
    lifetime_hoes_crafted_1:          dom('lifetime_hoes_crafted_1'),
    lifetime_hoes_crafted_2:          dom('lifetime_hoes_crafted_2'),
    lifetime_hoes_crafted_3:          dom('lifetime_hoes_crafted_3'),
    lifetime_hoes_crafted_4:          dom('lifetime_hoes_crafted_4'),
    lifetime_hoes_crafted_5:          dom('lifetime_hoes_crafted_5'),
    lifetime_clickspeedrecord:        dom('lifetime_clickspeedrecord'),

    stat_themes:                      dom('stat_themes'),
    stat_cosmetics:                   dom('stat_cosmetics'),
    stat_trinkets:                    dom('stat_trinkets'),
    // stat_cosmetics_bundle:            dom('stat_cosmetics_bundle'),
    // stat_cosmetics_farmable:          dom('stat_cosmetics_farmable'),
    // stat_cosmetics_bill:              dom('stat_cosmetics_bill'),
    // stat_cosmetics_belle:             dom('stat_cosmetics_belle'),
    // stat_cosmetics_greg:              dom('stat_cosmetics_greg'),
    // stat_cosmetics_charles:           dom('stat_cosmetics_charles'),
    // stat_cosmetics_carl:              dom('stat_cosmetics_carl'),
    // stat_cosmetics_tools:             dom('stat_cosmetics_tools'),

    stat_achievements:                dom('stat_achievements'),
}
function loadStatistics() {

    // Prestige
    statsNumbers.prestige_carrots.innerText                 = numCommas(player.prestige.carrots.toFixed(0));
    statsNumbers.prestige_carrots_clicked.innerText         = numCommas(player.prestige.click_carrots.toFixed(0));
    statsNumbers.prestige_carrots_idled.innerText           = numCommas(player.prestige.idle_carrots.toFixed(0));
    statsNumbers.prestige_carrots_bonus.innerText           = numCommas(player.prestige.bonus_carrots.toFixed(0));
    statsNumbers.prestige_clicks.innerText                  = numCommas(player.prestige.clicks);
    statsNumbers.prestige_falling_carrots_grabbed.innerText = numCommas(player.prestige.falling_carrots_grabbed);
    statsNumbers.prestige_hoes_crafted_total.innerText      = numCommas(player.prestige.hoes.craftedTotal);
    statsNumbers.prestige_hoes_crafted_0.innerText          = numCommas(player.prestige.hoes.crafted[0]);
    statsNumbers.prestige_hoes_crafted_1.innerText          = numCommas(player.prestige.hoes.crafted[1]);
    statsNumbers.prestige_hoes_crafted_2.innerText          = numCommas(player.prestige.hoes.crafted[2]);
    statsNumbers.prestige_hoes_crafted_3.innerText          = numCommas(player.prestige.hoes.crafted[3]);
    statsNumbers.prestige_hoes_crafted_4.innerText          = numCommas(player.prestige.hoes.crafted[4]);
    statsNumbers.prestige_hoes_crafted_5.innerText          = numCommas(player.prestige.hoes.crafted[5]);

    // Lifetime
    statsNumbers.lifetime_carrots.innerText                 = numCommas(player.lifetime.carrots.toFixed(0));
    statsNumbers.lifetime_carrots_clicked.innerText         = numCommas(player.lifetime.click_carrots.toFixed(0)) ;
    statsNumbers.lifetime_carrots_idled.innerText           = numCommas(player.lifetime.idle_carrots.toFixed(0));
    statsNumbers.lifetime_carrots_bonus.innerText           = numCommas(player.lifetime.bonus_carrots.toFixed(0));

    statsNumbers.lifetime_golden_carrots.innerText          = numCommas(player.lifetime.golden_carrots);
    statsNumbers.lifetime_golden_carrots_spent.innerText    = numCommas(player.lifetime.golden_carrots - player.golden_carrots);
    statsNumbers.lifetime_prestige.innerText                = numCommas(player.lifetime.prestige_count);
    
    statsNumbers.lifetime_cash.innerText                    = numCommas(player.lifetime.cash);
    statsNumbers.lifetime_cash_spent.innerText              = numCommas(player.lifetime.cash - player.cash);
    statsNumbers.lifetime_clicks.innerText                  = numCommas(player.lifetime.clicks);
    statsNumbers.lifetime_falling_carrots_grabbed.innerText = numCommas(player.lifetime.falling_carrots_grabbed);
    statsNumbers.lifetime_hoes_crafted_total.innerText      = player.lifetime.hoes.craftedTotal;
    statsNumbers.lifetime_hoes_crafted_0.innerText          = player.lifetime.hoes.crafted[0];
    statsNumbers.lifetime_hoes_crafted_1.innerText          = player.lifetime.hoes.crafted[1];
    statsNumbers.lifetime_hoes_crafted_2.innerText          = player.lifetime.hoes.crafted[2];
    statsNumbers.lifetime_hoes_crafted_3.innerText          = player.lifetime.hoes.crafted[3];
    statsNumbers.lifetime_hoes_crafted_4.innerText          = player.lifetime.hoes.crafted[4];
    statsNumbers.lifetime_hoes_crafted_5.innerText          = player.lifetime.hoes.crafted[5];
    statsNumbers.lifetime_clickspeedrecord.innerText        = player.clickSpeedRecord;

    statsNumbers.stat_themes.innerText = `${Object.keys(player.themes).length - 3}/${Object.keys(themes).length - 3} (${percentage(Object.keys(player.themes).length - 3, Object.keys(themes).length - 3).toFixed(0)}%)`;
    statsNumbers.stat_cosmetics.innerText =  `${playerCosmeticsCount()}/${totalCosmetics} (${percentage(playerCosmeticsCount(), totalCosmetics).toFixed(0)}%)`;
    statsNumbers.stat_trinkets.innerText = `${sixCompletion()} (${percentage(...sixCompletion().split('/')).toFixed(0)}%)`;
    let unlockedAchievements = Object.keys(player.achievements);
    achievementProgress(statsNumbers.stat_achievements);
}

// Refresh statistics
var statsInterval;
//#endregion

/*-----------Tips----------- */
//#region
var tips = default_tips;
try {
    let tips_seen = localStorage.getObject('tips_seen');
    [
        tips.best,
        tips.s_starter,
        tips.s_beginner,
        tips.s_intermediate,
        tips.s_fun_starter,
        tips.s_fun_beginner,
        tips.s_fun_intermediate,
    ] = [
        tips_seen.best,
        tips_seen.s_starter,
        tips_seen.s_beginner,
        tips_seen.s_intermediate,
        tips_seen.s_fun_starter,
        tips_seen.s_fun_beginner,
        tips_seen.s_fun_intermediate,
    ];
} catch (error) {
    console.error(error);
}


// Automatically change tips
var tipInterval = setInterval(() => {tipchange()}, 15000);

function tipchange() {
    if(menuOpen()) return;
    
    clearInterval(tipInterval);
    tipInterval = setInterval(() => {tipchange()}, 15000);
    
    // Tracker - determine tips level
    if(player.equippedHoes > 0 || player.prestige.carrots > 100000 && tips.tracker == 0) {
        tips.tracker = 1;
    } else if(player.prestige.carrots > 1000000 && tips.tracker == 1) {
        tips.tracker = 2;
    } else if(player.prestige.carrots > 1000000000 && tips.tracker == 2) {
        tips.tracker = 3;
    }

    // Update best
    if(tips.tracker > tips.best) { tips.best = tips.tracker; }

    // 20% chance a lower level tip will appear (and another chance within that that a current-level tip will appear)
    // console.log(tips.tracker);
    let roll = Math.floor(Math.random() * 5);
    if(roll == 0) {
        let t_roll = Math.floor(Math.random() * tips.tracker);
        tips.tracker = t_roll;
    }
    // console.log(tips.tracker);
    
    // Decides if the tip will be real or fun.
    tips.random = Math.random();
    tips.type = tips.random < settings.fun_tip_percentage / 100 ? "fun" : "real";

    // Determine and display the tip
    let type = tips.type == "fun" ? 'fun_' : '';
    type += tl[tips.tracker];

    // Roll tip
    var rmax = 0;
    function tiproll() {
        let r = Math.floor(Math.random() * tips[type].length);
        // Repeat, reroll- prevent recursion by stopping at 10 rolls
        if(tips.number == r && rmax < 3) {
            rmax++;
            tiproll();
            return;
        };
        tips.number = r;
        rmax = 0;
    }
    tiproll();


    // Page
    elTips.innerText = tips[type][tips.number];

    // Mark tip as seen
    if(tips[`s_${type}`][tips.number] != true) {
        tips[`s_${type}`][tips.number] = true;
        if(player.flags['cookies_accepted'] == true) {
            localStorage.setObject("tips_seen", tips);
        };
    }
    tipsHTMLupdate = true;
}
//#endregion
