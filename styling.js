/*-------------Variables------------*/
//#region
//// UI HANDLER ////
const elBody =          document.querySelector('body');
const bonusVisualArea = dom("bonusVisualArea");
const clickingArea =    dom("clicking_area");
const mainCarrot =      dom("main_carrot");
// var tooltipBill =       dom("billtooltip").style.top;
// var tooltipBelle =      dom("belletooltip").style.top;
// var tooltipGreg =       dom("gregtooltip").style.top;
var mouseX = 0;
var mouseY = 0;

// Popup counters (unique IDs so that they are deleted after a set time)
var toastID =      0;
var activeToasts = 0;
var toastsList =  {};
var bonusID =      0;

var dialogOpen = false;
var themeSwitcherOpen = false;
var cosmeticSwitcherOpen = false;
var keybindsMenuOpen = false;

// Dialog button action
var dialogButtonAction = 'none';

// Dialog Elements
const overlay = dom("overlay");
const elDialog = {
    main:    dom("dialog"),
    title:   dom("dialog_title"),
    desc:    dom("dialog_desc"),
    buttons: {
        container: dom("dialog_buttons"),
        accept:    dom("dialog_button_accept"),
        cancel:    dom("dialog_button_cancel")
    }
};
const toastContainer =  dom("toast_container");
const toastsClear =     dom("toasts_clear");
const themeMenu =       dom("theme_menu");
const cosmeticMenu =    dom('cosmetic_menu');
const themesList = dom('themes_list');
const cosmeticsList = dom('cosmetics_list');
//#endregion



/*---------------FUNCTIONS-----------------*/
//#region
// function testFunction(param) {
//     console.log("testFunction runs");
// }


// Confetti
const elConfetti = dom('confetti');
function confetti(type = 1) {
    console.log('Confetti!');
    let duration = 6760;
    elConfetti.src = `./assets/confetti${type}.gif`;
    elConfetti.classList.add('visible');

    setTimeout(() => {
        elConfetti.classList.add('fade_out');
    }, duration - 2000);

    setTimeout(() => {
        elConfetti.src = './assets/blank.png';
        elConfetti.classList.remove('fade_out');
        elConfetti.classList.remove('visible');
    }, duration);
}


// const sounds = [
    
// ];
// Picks random sound from sounds array
// Ignore chance is a % out of 100
function randomSound(type, ignoreChance = 0) {
    // Calculate ignore chance
    var ignore = Math.floor(Math.random() * 100);
    if(ignore < ignoreChance) return;

    var randomNum = Math.floor(Math.random() * 7) + 1;
    playSound(`crunch${randomNum}.flac`)
}
function buttonSound() {
    if(store('enableSounds') == false) return;
    playSound('click.flac');
}


// Popup Notifications
function openDialog(title, desc, buttonName, buttonStyle, buttonAction) {
    buttonSound();

    dialogOpen = true;
    overlay.classList.add('visible');
    elBody.classList.add('overflow_hidden');
    elDialog.main.classList.add('visible');
    // elDialog.main.classList.add("dialog_animate");

    // Fill out dialog text, if applicable
    if(title)       {eInnerText(elDialog.title, title);}
    if(desc)        {eInnerText(elDialog.desc, desc);}
    if(buttonName)  {eInnerText(elDialog.buttons.accept, buttonName);}
    
    if(buttonStyle) {
        elDialog.buttons.accept.classList.add(buttonStyle);
    }

    dialogButtonAction = buttonAction;
}

// Close dialog
function closeDialog(doAction, backdrop = false) {
    buttonSound();

    // Cancel if specific theme is chosen
    if(backdrop == true && $('body').classList.contains('theme_blockgame')) return;

    dialogOpen = false;
    eInnerText(elDialog.title, 'Dialog Title');
    eInnerText(elDialog.desc, 'Dialog description');
    // Reset Accept button
    elDialog.buttons.accept.classList.remove(...elDialog.buttons.accept.classList);
    // elDialog.buttons.accept.onclick = closeDialog;
    eInnerText(elDialog.buttons.accept, "OK");

    overlay.classList.remove("visible");
    elBody.classList.remove('overflow_hidden');
    elDialog.main.classList.remove('visible');
    // elDialog.main.classList.remove("dialog_animate");

    // Run passed in function if applicable
    // if(action) {
    //     action();
    // }

    // Run a function when accept is pressed
    if(doAction) {
        switch(dialogButtonAction) {
            case 'prestige':
                Prestige();
                break;
            case 'clearsave':
                ClearLocalStorage();
                break;
            case 'resetsettings':
                resetSettings(true);
                break;
            default:
                console.log('Dialog action not listed');
                break;
        };
    };

    dialogButtonAction = 'none';

    // Hide Theme Switcher
    themeMenu.classList.remove('visible');
    themeSwitcherOpen = false;

    cosmeticMenu.classList.remove('visible');
    cosmeticSwitcherOpen = false;

    elKeybindsMenu.classList.remove('visible');
    keybindsMenuOpen = false;
}


// Create Toast notification
// For the COLOR parameter, options are:
// gray (leave blank), "red", "orange", "gold", "green", "cyan", "blue", "purple", "brown", "dirt"
function toast(title, desc, color, persistent, replaceable, achievement = false) {
    // Replace old if replace is true
    if(toastsList[toastID - 1] == 'replace') {
        closeToast(toastID - 1);
    }

    // Create element with parameters filled in
    var toastElement = document.createElement("div");
    toastElement.id = `toast${toastID}`;

    // Normal toast
    if(!achievement) {
        toastElement.innerHTML =
        `<div class="toast background_${color}">
            <h3>${title}</h3>
            <span class="toast_close" onclick="closeToast(${toastID})">X</span>
            <p>${desc}</p>
        </div>`;
    }
    // Achievement toast
    else {
        let achieve = achievements[achievement];
        let rewardHTMLstring = '';
        let noImg = false;
        if(achieve.image == false || achieve.image == undefined) { noImg = true; }

        if(achieve.reward != false) {
            rewardHTMLstring =
            `<div class="rewards_list">
                ${ rewardHTML(achieve) }
            </div>
            `;
        }

        toastElement.innerHTML =
        `<div class="toast achievement_item${achieve.mystery.list != true ? '' : ' achievement_secret'}${achieve.style != false ? ' style_' + achieve.style : ''}">
            <!-- Close button -->
            <span class="toast_close" onclick="closeToast(${toastID})">X</span>
            <!-- Details -->
            <div class="achievement_details flex">
                <img src="${noImg ? './assets/achievements/missing.png' : achieve.image}" alt="${achieve.name}" id="${achievement}_img" class="achievement_img" title="${achieve.name}">
                <div>
                    <h2>${achieve.name}</h2>
                    <p class="secondary_text">${achieve.desc}</p>
                </div>
            </div>
            ${rewardHTMLstring}
        </div>`;
    }

    toastContainer.prepend(toastElement);

    let id = toastID;
    toastsList[toastID] = replaceable == true ? 'replace' : id;

    // Increase Toast ID
    activeToasts++;
    if(toastID <= 100) {
        toastID++;
    } else {
        toastID = 0;
    }

    // Clear all button
    if(activeToasts > 2) {
        toastsClear.classList.add("visible");
    }

    if(!persistent) {
        let timeout = store("notificationLength") == null ? 5000 : parseInt(store("notificationLength")) * 1000;
        console.log(timeout);
        if(achievement == true ) timeout *= 2;

        setTimeout(() => {
            // console.log("Timeout runs: " + toastID);
            closeToast(id);
        }, timeout
        );
    }
}

// Delete Toast Notification
function closeToast(id) {
    // console.log(id + " - toast removed");
    activeToasts--;
    delete toastsList[id];
    element = dom(`toast${id}`);
    
    // Dismiss Animation
    if(toastsList[id] !== 'replace' && element !== null) {
        element.classList.add("toast_out");
    }
    
    // Delete Element after animation is done
    if(element !== null) {
        if(toastsList[id] !== 'replace') {
            element.remove();
        } else {
            setTimeout(() => {
                element.remove();
            }, 300);
        }
    }



    // Clear all button
    if(activeToasts <= 2) {
        toastsClear.classList.remove("visible");
    }
}

function clearToasts() {
    for(entry in toastsList) {
        // console.log(entry);
        closeToast(entry);
    }
}
//#endregion



// Panel handler
//#region 
var currentPanel = "achievements-panel";
// Tab Panels
const tripane =         dom('notifs-section');
const infoPanel =       dom("info-panel");
const achievementsPanel = dom("achievements-panel");
const settingsPanel =   dom("settings-panel");

// Tab Buttons
const infoTab =         dom("info-panel-button");
const achievementsTab = dom("achievements-panel-button");
const settingsTab =     dom("settings-panel-button");
const panelReset = "visibility: hidden; position: absolute; transform: translateY(-100%)";

// Change panel
function panelChange(to, noSound = false) {
    if(currentPanel == to) {
        return;
    } else {
        // Sound effect
        if(noSound == false) {buttonSound();}

        // Tab reset
        infoTab.classList.remove("activetab");
        achievementsTab.classList.remove("activetab");
        settingsTab.classList.remove("activetab");

        

        // Panel clear
        infoPanel.style = panelReset;
        achievementsPanel.style = panelReset;
        settingsPanel.style = panelReset;

        // Unhide selected panel
        dom(to + "-button").classList.add("activetab");

        dom(to).style = "visibility: visible; position: relative; height: unset; overflow: unset; transform: none";
        
        // Save
        store('openpanel', to);
        currentPanel = to;
    }

    // Reset Statistics Panel
    // if(to !== "info-panel") {
    //     elStatistics.innerHTML = statLoading;
    // }

    // Update achievements list
    if(to == 'achievements-panel') {
        populateAchievements();
    }

    // Change container size
    // let panelHeight = dom(currentPanel).clientHeight;
    // console.log(panelHeight);
    // tripane.style.height = `${panelHeight + 33}px`;
}
//#endregion



// Click bonus popup
//#region 
function popupHandler(useMousePos = true) {
    // Create Element
    var clickVisualElement = document.createElement("div");

    // Give element random displacement along with mouse position
    var randomX = Math.floor((Math.random() * 10) - 5) + mouseX;
    var randomY = Math.floor((Math.random() * 10) - 5) + mouseY;
    // var randomRot = Math.floor((Math.random() * 16) - 8);

    // Get position of carrot image (used when useMousePos is false)
    var mcPosition = mainCarrot.getBoundingClientRect();
    var fixedX = Math.floor((Math.random() * 10) - 5) + (mcPosition.left + (mcPosition.right - mcPosition.left) / 2);
    // var fixedY = mcPosition.top + (mcPosition.bottom - mcPosition.top) / 2;
    var fixedY = Math.floor((Math.random() * 10) - 5) + mcPosition.bottom - 12;

    if(useMousePos == true) {
        clickVisualElement.style.left = randomX + "px";
        clickVisualElement.style.top =  randomY + "px";
    } else {
        clickVisualElement.style.left = fixedX + "px";
        clickVisualElement.style.top =  fixedY + "px";
    }

    // clickVisualElement.style.transform = `translateX(-50%) rotate(${randomRot}deg)`;
    clickVisualElement.classList.add("clickvisual");
    clickVisualElement.id = `bonus${bonusID}`;
    eInnerText(clickVisualElement, `+${DisplayRounded(Math.floor(player.cpc,2), 1, 10000, unitsShort)}`);

    bonusVisualArea.append(clickVisualElement);

    // Delete Popup after animation finishes/2 seconds
    var bonusCurrent = dom("bonus" + bonusID);
    setTimeout(() => {
        bonusCurrent.remove();
    }, 2000);

    // Incremement element ids
    if(bonusID < 100) {
        bonusID += 1;
    } else {
        bonusID = 0;
    }
}
//#endregion

// Falling carrots
function fallingCarrots() {
    var element = document.createElement("img");
    element.src = './assets/Carrot Clicker.png';
    element.classList.add('falling_carrot');
    element.onclick = () => { console.log('Bonus carrot clicked') };

    // Get positions
    let mcPosition = mainCarrot.getBoundingClientRect();
    let fixedX = Math.floor((Math.random() * 10) - 5) + (mcPosition.left + (mcPosition.right - mcPosition.left) / 2);
    let fixedY = Math.floor((Math.random() * 10) - 5) + mcPosition.bottom - 12;

    element.style.left = fixedX + "px";
    element.style.top =  fixedY + "px";

    // To page
    bonusVisualArea.append(element);
}


// Theme switcher <-> Cosmetic switcher
function switchSwitchers() {
    buttonSound();

    if(themeSwitcherOpen == true) {
        themeSwitcherOpen = false;
        cosmeticSwitcherOpen = true;
        cosmeticSwitcher();
        closeThemeSwitcher(true);
    } else {
        themeSwitcherOpen = true;
        cosmeticSwitcherOpen = false;
        themeSwitcher();
        closeCosmeticSwitcher(true);
    }
}

/* ----- Fancy Theme Switcher ----- */
function themeSwitcher() {
    themeSwitcherOpen = true;
    themeMenu.classList.add('visible');
    overlay.classList.add("visible");
    elBody.classList.add('overflow_hidden');

    buttonSound();
}
function closeThemeSwitcher(noOverlay = false) {
    themeMenu.classList.remove('visible');
    if(noOverlay == false) {
        overlay.classList.remove("visible"); 
    }
}

/* ----- Fancy Cosmetic Switcher ----- */
function cosmeticSwitcher() {
    cosmeticSwitcherOpen = true;
    cosmeticMenu.classList.add('visible');
    overlay.classList.add("visible");
    elBody.classList.add('overflow_hidden');

    buttonSound();
}
function closeCosmeticSwitcher(noOverlay = false) {
    cosmeticMenu.classList.remove('visible');
    if(noOverlay == false) {
        overlay.classList.remove("visible");
    }
}



/* ----- Cosmetics ----- */
//#region
const cosmetics = {
    // Default
    'default': {
        'name': 'Carrot (Default)',
        'image': './assets/Carrot Clicker.png',
        'farmable': 'Carrot',
        'desc': 'Good old carrots',

        'bill_image':    './assets/characters/Boomer_Bill.png',
        'belle_image':   './assets/characters/BelleBommerette.png',
        'greg_image':    './assets/characters/Gregory.png',
        'charles_image': './assets/characters/Charles.png',
        'carl_image':    './assets/characters/Carl.png',

        'bill_name':    'Bill',
        'belle_name':   'Belle',
        'greg_name':    'Greg',
        'charles_name': 'Charles',
        'carl_name':    'Carl',
    },
    // Golden Carrot
    'golden_carrot': {
        'name': 'Golden Carrot',
        'image': './assets/golden carrot.png',
        'farmable': 'Golden Carrot',
        'desc': 'They are only spray-painted gold. Worthless.'
    },
    'pixel_carrot': {
        'name': 'Pixel Carrot',
        'image': './assets/theme/pixel_carrot.png',
        'farmable': 'Carrot',
        'desc': 'Someone pixelated my carrot'
    },
    'cookie': {
        'name': 'Cookie',
        'image': './assets/theme/cookie/cookie.png',
        'farmable': 'Cookie',
        'desc': 'Delicious',

        'bill_image':    './assets/theme/cookie/baker_bill.png',
        'belle_image':   './assets/theme/cookie/grandma_belle.png',
        'greg_image':    './assets/characters/Gregory.png',
        'charles_image': './assets/characters/Charles.png',
        'carl_image':    './assets/characters/Carl.png',

        'bill_name':    'Baker Bill',
        'belle_name':   'Grandma Belle',
        'greg_name':    'Greg',
        'charles_name': 'Charles',
        'carl_name':    'Carl',
    },
    // Minecraft
    'blockgame': {
        'name': 'Minecraft Carrot',
        'image': './assets/theme/blockgame/carrot.png',
        'desc': 'Hrm',
    },
    'blockgame_potato': {
        'name': 'Minecraft Potato',
        'image': './assets/theme/blockgame/potato.png',
        'farmable': 'Potatoe',
        'desc': 'Knishes'
    },
    // Pineapple
    'pineapple': {
        'name': 'Pineapple',
        'image': './assets/theme/pineapple/pineapple.png',
        'farmable': 'Pineapple',
        'desc': 'My favorite'
    },
    // Bill clicker
    'bill': {
        'name': 'Bill',
        'image': './assets/characters/Boomer_Bill.png',
        'farmable': 'Bill',
        'desc': 'Bill',

        'bill_image':    './assets/characters/Boomer_Bill.png',
        'belle_image':   './assets/characters/Boomer_Bill.png',
        'greg_image':    './assets/characters/Boomer_Bill.png',
        'charles_image': './assets/characters/Boomer_Bill.png',
        'carl_image':    './assets/characters/Boomer_Bill.png',

    
        'bill_name':    'Bill',
        'belle_name':   'Bill',
        'greg_name':    'Bill',
        'charles_name': 'Bill',
        'carl_name':    'Bill',
    },
    // Netherite hoe
    "netherite_hoe": {
        'name': 'Netherite hoe',
        'image': './assets/tools/netherite_hoe.png',
        'farmable': 'Netherite hoe',
        'desc': 'All hail'
    },
    // Cursor
    "cursor": {
        'name': 'Cursor',
        'image': './assets/theme/cursor/cursor.png',
        'image_hover': './assets/theme/cursor/pointer.png',
        'farmable': 'Cursor',
        'desc': 'Cursorception'
    },
    // Alien Carrot
    "alien_carrot": {
        'name': 'Alien Carrot',
        'image': './assets/theme/alien carrot/alien_carrot.png',
        'farmable': 'Alien Carrot',
        'desc': 'So strange'
    },
    // Demon Carrot
    "demon_carrot": {
        'name': 'Demon Carrot',
        'image': './assets/theme/evil_carrot.png',
        'farmable': 'Demon Carrot',
        'desc': 'Eeevil!',
    },
    "ghost_carrot": {
        'name': 'Ghost Carrot',
        'image': './assets/theme/Ghost_carrot.png',
        'farmable': 'Ghost Carrot',
        'desc': 'description',
    },
    "rainbow_carrot": {
        'name': 'Rainbow Carrot',
        'image': './assets/theme/rainbow_carrot.png',
        'farmable': 'Rainbow Carrot',
        'desc': 'Tastes like candy',
    },


    // Updoot
    "upvote": {
        'name': 'Orange Arrow',
        'image': './assets/theme/orange_arrow/upvote.png',
        'farmable': 'Updoot',
        'desc': 'This is better than going outside'
    },


    // Character cosmetics (temporary)
    'fancy_bill': {
        'name': 'Fancy Bill',
        'desc': 'description',
        'bill_image':    './assets/theme/boomer_bill_gates.png',
    },
    'safety_greg': {
        'name': 'High Vis Greg',
        'desc': 'Can\'t have you dying on the job now can we',
        'greg_image':    './assets/theme/safety_greg.png',
    },
}
const cosmeticsKeys = Object.keys(cosmetics);

// Page elements
const farmableNames = [
    dom('cc_name'),
    dom('cpc_name'),
    dom('cps_name'),
]
const characterAvatars = {
    'bill':     dom('bill_avatar'),
    'belle':    dom('belle_avatar'),
    'greg':     dom('greg_avatar'),
    'charles':  dom('charles_avatar'),
    'carl':     dom('carl_avatar'),
}
const characterNames = {
    // Nametag
    'bill':     dom('bill_name'),
    'belle':    dom('belle_name'),
    'greg':     dom('greg_name'),
    'charles':  dom('charles_name'),
    'carl':     dom('carl_name'),

    // Cost to upgrade:
    // ...
}

// Change cosmetic
function setCosmetic(set, resetState = false) {
    var from = store('cosmetic');

    // Reset to default first
    if(resetState == false && set !== 'default') {setCosmetic('default', true);}
    console.log('Switching to cosmetic: ' + set);

    let cosmetic = cosmetics[set];

    // Image
    if(cosmetic.hasOwnProperty('image')) {mainCarrot.src = cosmetic.image;}

    // Name
    if(cosmetic.hasOwnProperty('farmable')) {
        nameLoop(cosmetic.farmable)
    } else {
        nameLoop('Carrot');
    }

    Object.hop = property => {return this.hasOwnProperty(property);}

    // Character Avatars
    if(cosmetic.hasOwnProperty('bill_image'))     {characterAvatars.bill.src = cosmetic.bill_image;}
    if(cosmetic.hasOwnProperty('belle_image'))    {characterAvatars.belle.src = cosmetic.belle_image;}
    if(cosmetic.hasOwnProperty('greg_image'))     {characterAvatars.greg.src = cosmetic.greg_image;}
    if(cosmetic.hasOwnProperty('charles_image'))  {characterAvatars.charles.src = cosmetic.charles_image;}
    if(cosmetic.hasOwnProperty('carl_image'))     {characterAvatars.carl.src = cosmetic.carl_image;}

    // Character Names
    if(cosmetic.hasOwnProperty('bill_name'))     {eInnerText(characterNames.bill, cosmetic.bill_name);}
    if(cosmetic.hasOwnProperty('belle_name'))    {eInnerText(characterNames.belle, cosmetic.belle_name);}
    if(cosmetic.hasOwnProperty('greg_name'))     {eInnerText(characterNames.greg, cosmetic.greg_name);}
    if(cosmetic.hasOwnProperty('charles_name'))  {eInnerText(characterNames.charles, cosmetic.charles_name);}
    if(cosmetic.hasOwnProperty('carl_name'))     {eInnerText(characterNames.carl, cosmetic.carl_name);}


    // Loop through page elements containing farmable item name and set accordingly
    function nameLoop(farmable) {
        for(i = 0; i < farmableNames.length; i++) {
            eInnerText(farmableNames[i], farmable + 's');
        }
    }    

    store('cosmetic', set);

    // Fancy Switcher fix
    themeSwitcherCheckmark(set, from);
}
//#endregion


/* ----- Themes ----- */
//#region 
// Theme dropdown eventListener
// const optionTheme = dom('theme_dropdown');
// optionTheme.addEventListener('change', () => {
//     setTheme(optionTheme.value);
// });

// Theme class
// class theme {
//     constructor(name, image, desc, cosmetic) {
//         this.name = name;
//         this.image = image;
//         this.desc = desc;
//         this.cosmetic = cosmetic;
//     }
// }

// Theme data
const themes = {
    // Default
    'theme_dark': {
        name:     'Dark Theme',
        image:    './assets/theme/theme_dark.png',
        desc:     'Default dark',
        cosmetic: false,

    },
    'theme_light': {
        name:     'Light Theme',
        image:    './assets/theme/theme_light.png',
        desc:     'Default light',
        cosmetic: false,
        accent:   '#FFFFFF',
    },
    'theme_oled': {
        name:     'OLED Dark Theme',
        image:    './assets/theme/theme_oled.png',
        desc:     'Don\'t play Carrot Clicker after midnight',
        cosmetic: false,
        accent:   '#000000',
    },
    'theme_classic': {
        name:     'Carrot Clicker classic',
        image:    './assets/theme/theme_classic.png',
        desc:     'The original look of carrot clicker',
        cosmetic: false,
        accent:   '#4e3f34',
    },
    'theme_red': {
        name:     'Red Theme',
        image:    './assets/theme/theme_red.png',
        desc:     'Town painted.',
        cosmetic: false,
        accent:   '#913535'
    },
    'theme_green': {
        name:     'Green Theme',
        image:    './assets/theme/theme_green.png',
        desc:     'Don\'t be jealous',
        cosmetic: false,
        accent:   '#4c6949'
    },
    'theme_blue': {
        name:     'Blue Theme',
        image:    './assets/theme/theme_blue.png',
        desc:     'For when you get tired of gray',
        cosmetic: false,
        accent:   '#455779'
    },
    'theme_camo': {
        name:     'Camo Theme',
        image:    './assets/theme/theme_camo.png',
        desc:     'In the trees',
        cosmetic: false,
        // accent:   false
    },
    'theme_retro': {
        name:     'Retro Green Theme',
        image:    './assets/theme/theme_retro.png',
        desc:     ':D',
        cosmetic: false,
        // accent:   false
    },
    'theme_bw': {
        name:     'Black & White',
        image:    false,
        desc:     'Back in my day',
        cosmetic: false,
        // accent:   false
    },
    'theme_blockgame': {
        name:     'Minecraft',
        image:    './assets/theme/blockgame/grass_block_side.png',
        desc:     'Does it violate copyright if this is just a hobby project with no ads? Genuine question',
        cosmetic: false,
        accent:   '#3c2a1d'
    },
    'theme_custom': {
        name: 'Custom',
        image: false,
        desc: 'Make your own theme!',
        cosmetic: false,
        // accent: false
    }
};
const themesKeys = Object.keys(themes);

// Populate theme switcher list on page load
function populateThemeList() {
    var themeHTML = '';
    var stillLocked = 0;

    for(let i = 0; i < themesKeys.length; i++) {
        let key = themesKeys[i];
        let theme = themes[key];
  
        // Test if unlocked
        if(isUnlocked('theme', key) == false) {
            // console.log(key + ' is not unlocked!');
            stillLocked++;
            continue;
        }

        let imgsrc = theme.image !== false ? theme.image : './assets/Carrot Clicker.png'
    
        themeHTML += /* html */
        `
        <div class="theme_item flex" title="${theme.name}" onclick="setTheme('${key}')">
            <img src="${imgsrc}" alt="img" class="theme_preview" id="theme">
            <div>
                <h3>${theme.name}</h3>
                <p class="secondary_text">${theme.desc}</p>
            </div>
            <div class="theme_checkbox">
                <img src="./assets/checkmark.svg" alt="Selected" class="theme_checkmark opacity0" id="${key + '_checkmark'}">
            </div>
        </div>
        `;
    }

    if(stillLocked > 0) {
        themeHTML += /* html */
        `<br><center><i>${stillLocked} themes have not been unlocked</i></center>`;
    } else {
        themeHTML += /* html */
        `<br><center><p>You've unlocked every theme!</p></center>`;
    }

    themesList.innerHTML = themeHTML;
}

// Theme switcher checkmark fix
function themeSwitcherCheckmark(theme, from = false) {
    var elTheme = dom(`${theme}_checkmark`);

    // Uncheck previous
    if(from == false || !dom(`${from}_checkmark`)) return;
    dom(`${from}_checkmark`).classList.add('opacity0');

    // Check new
    if(!elTheme) return;
    elTheme.classList.remove('opacity0');
}

/* Populate cosmetics */
// Populate theme switcher list on page load
function populateCosmeticsList() {
    var cosmeticHTML = '';
    var stillLocked = 0;

    for(let i = 0; i < cosmeticsKeys.length; i++) {
        let key = cosmeticsKeys[i];
        let cosmetic = cosmetics[key];
  
        // Test if unlocked
        if(isUnlocked('cosmetic', key) == false) {
            // console.log(key + ' is not unlocked!');
            stillLocked++;
            continue;
        }

        let imgsrc = cosmetic.image !== false ? cosmetic.image : './assets/Carrot Clicker.png'
    
        cosmeticHTML += /* html */
        `
        <div class="theme_item flex" title="${cosmetic.name}" onclick="setCosmetic('${key}')">
            <img src="${imgsrc}" alt="img" class="theme_preview" id="theme">
            <div>
                <h3>${cosmetic.name}</h3>
                <p class="secondary_text">${cosmetic.desc}</p>
            </div>
            <div class="theme_checkbox">
                <img src="./assets/checkmark.svg" alt="Selected" class="theme_checkmark opacity0" id="cosmetic_${key + '_checkmark'}">
            </div>
        </div>
        `;
    }

    if(stillLocked > 0) {
        cosmeticHTML += /* html */
        `<br><center><i>${stillLocked} cosmetics have not been unlocked</i></center>`;
    } else {
        cosmeticHTML += /* html */
        `<br><center><p>You've unlocked every cosmetic!</p></center>`;
    }

    cosmeticsList.innerHTML = cosmeticHTML;
}

// Theme switcher checkmark fix
function cosmeticSwitcherCheckmark(cosmetic, from = false) {
    var elCosmetic = dom(`cosmetic_${cosmetic}_checkmark`);

    // Uncheck previous
    if(from == false || !dom(`cosmetic_${from}_checkmark`)) return;
    dom(`cosmetic_${from}_checkmark`).classList.add('opacity0');

    // Check new
    if(!elCosmetic) return;
    elCosmetic.classList.remove('opacity0');
}

// Populate achievements list
const elAchievementsList = dom('achievements_list');
const elAchievementFilter = dom('achievement_filter');
function populateAchievements() {
    var achievementHTML = '';
    var rewardHTML = '';

    for(let i = 0; i < achievementsKeys.length; i++) {
        let key = achievementsKeys[i];
        let achieve = achievements[key];

        // Test if unlocked
        let unlocked = achieveQuery(key);

        // Filters
        const achievementFilter = dom('achievement_filter');
        if(dom('achievement_filter').value == 'unlocked' && unlocked == false) continue;
        if(dom('achievement_filter').value == 'locked' && unlocked == true) continue;
        if(dom('achievement_filter').value == 'challenge' && achieve.style != 'challenge') continue;
        if(dom('achievement_filter').value == 'secret' && achieve.mystery.list != true) continue;
        if(achieve.mystery.list == true && unlocked == false) continue;

        let img = achieve.image != false ? achieve.image : './assets/achievements/missing.png';

        // Plain text list w/ achievement names
        //#region 
        // if(unlocked == true) {
        //     achievementHTML += /* html */
        //     `
        //         <b>Unlocked: ${achieve.name}</b><br>
        //     `;
        // } else {
        //     achievementHTML += /* html */
        //     `
        //         Not unlocked: ${achieve.name}<br>
        //     `;
        // }
        //#endregion

        // Rewards info
        if((achieve.reward != false) && unlocked == true) {
            let inner = '';
            // Multiple rewards
            if(Array.isArray(achieve.reward) == true) {
                for(let i = 0; i < achieve.reward.length; i++) {
                    let rewardType = achieve.reward[i].split(':')[0];
                    let rewardName = achieve.reward[i].split(':')[1];

                    if(rewardType == 'function') {
                        console.log('test');
                        continue;
                    };

                    let informalName;
                    let icon;
    
                    // Get reward info
                    if(rewardType == 'theme' || rewardType == 'cosmetic') {
                        informalName = (rewardType == 'theme' ? themes[rewardName].name : cosmetics[rewardName].name);
                        icon = (rewardType == 'theme' ? themes[rewardName].image : cosmetics[rewardName].image);
                    } else if(rewardType == 'character') {
                        informalName = capitalizeFL(rewardName);
                        // Get image
                        switch(rewardName) {
                            case 'bill':
                                icon = './assets/characters/Boomer_Bill.png'
                                break;
                            case 'belle':
                                icon = './assets/characters/BelleBommerette.png'
                                break;
                            case 'greg':
                                icon = './assets/characters/Gregory.png'
                                break;
                            case 'charles':
                                icon = './assets/characters/Charles.png'
                                break;
                            case 'carl':
                                icon = './assets/characters/Carl.png'
                                break;
                        }
                    }

                    inner += 
                    `
                    <div class="reward flex">
                        <img src="${icon}" alt="${informalName}" class="reward_img">
                        <div>
                            <h4>${informalName}</h4>
                            <p class="secondary_text">
                                ${capitalizeFL(rewardType)}
                            </p>
                        </div>
                    </div>
                    `;
                }
            }

            // Single reward
            else if(achieve.reward.split(':')[0] != 'function') {
                let rewardType = achieve.reward.split(':')[0];
                let rewardName = achieve.reward.split(':')[1];
                let informalName;
                let icon;

                // Get reward info
                if(rewardType == 'theme' || rewardType == 'cosmetic') {
                    informalName = (rewardType == 'theme' ? themes[rewardName].name : cosmetics[rewardName].name);
                    icon = (rewardType == 'theme' ? themes[rewardName].image : cosmetics[rewardName].image);
                } else if(rewardType == 'character') {
                    informalName = capitalizeFL(rewardName);
                    // Get image
                    switch(rewardName) {
                        case 'bill':
                            icon = './assets/characters/Boomer_Bill.png'
                            break;
                        case 'belle':
                            icon = './assets/characters/BelleBommerette.png'
                            break;
                        case 'greg':
                            icon = './assets/characters/Gregory.png'
                            break;
                        case 'charles':
                            icon = './assets/characters/Charles.png'
                            break;
                        case 'carl':
                            icon = './assets/characters/Carl.png'
                            break;
                    }
                }


                inner = 
                `<div class="reward flex">
                    <img src="${icon}" alt="${informalName}" class="reward_img">
                    <div>
                        <h4>${informalName}</h4>
                        <p class="secondary_text">
                            ${capitalizeFL(rewardType)}
                        </p>
                    </div>
                </div>
                `;
            }
            
            // Export HTML
            rewardHTML =
            `<!-- Rewards -->
            <div class="rewards_list">
                ${inner}
            </div>`;
            inner = '';
        }

        // Achievement info
        if(unlocked == true) {
            achievementHTML += /* htmla */
            `
            <div id="${key}" class="achievement_item${achieve.mystery.list != true ? '' : ' achievement_secret'}${achieve.style != false ? ' style_' + achieve.style : ''}">
                <!-- Details -->
                <div class="achievement_details flex">
                    ${achieve.pages != false && achieve.pages != null ? `<div class="achieve_pages secondary_text">+${achieve.pages} pages</div>` : ''}
                    

                    <img src="${img}" alt="${achieve.name}" id="${key}_img" class="achievement_img" title="${achieve.name}">
                    <div>
                        <h2>${achieve.name}</h2>
                        <p class="secondary_text">${achieve.desc}</p>
                    </div>
                </div>
                ${rewardHTML}
            </div>
            `;
        } else {
            achievementHTML += /* htmla */
            `
            <div id="${key}" class="achievement_item achievement_locked">
                <!-- Details -->
                <div class="achievement_details flex">
                    <img src="${achieve.mystery.image == false ? achieve.image : './assets/achievements/locked.png'}" alt="?" id="${key}_img" class="achievement_img" title="This achievement has not been unlocked">
                    <div>
                        <h2>${achieve.mystery.name == true ? '???' : achieve.name}</h2>
                        <p class="secondary_text">${achieve.mystery.desc == true ? '????' : achieve.desc}</p>
                    </div>
                </div>
            </div>
            `;
        }
    }

    // if(stillLocked > 0) {
    //     achievementHTML += /* html */
    //     `<br><center><i>${stillLocked} themes have not been unlocked</i></center>`
    // }

    if(dom('achievement_filter').value == 'unlocked' && achievementHTML == '') {
        achievementHTML =
            `<center><img src="./assets/theme/pixel_carrot.png" class="footer_carrot"><br/><p class="secondary_text">No achievements yet. :(</p></center>`;
    }

    // Filter by locked
    if(dom('achievement_filter').value == 'locked' && achievementHTML == '') {
        achievementHTML =
            `<center><img src="./assets/piggy_bank.png" class="footer_carrot"><p class="secondary_text">You've unlocked every achievement- great job!</p></center>`;
    };

    // Filter by locked
    if(dom('achievement_filter').value == 'secret' && achievementHTML == '') {
        achievementHTML =
            `<center><img src="./assets/easter_egg.png" class="footer_carrot pointer" onclick="confetti()"><p class="secondary_text">Don't tell anyone, but: you don't have any secret achievements.<br/>Secret achievements don't appear in the list until unlocked and<br/> they don't count towards your completion percentage.</p></center>`;
    };

    elAchievementsList.innerHTML = achievementHTML;
    // eInnerHTML(elAchievementsList, achievementHTML);
}

function rewardHTML(achieve) {
    // Rewards info
    if(achieve.reward != false) {
        let rewardHTML = '';
        let inner = '';
        // Multiple rewards
        if(Array.isArray(achieve.reward) == true) {
            for(let i = 0; i < achieve.reward.length; i++) {
                let rewardType = achieve.reward[i].split(':')[0];
                let rewardName = achieve.reward[i].split(':')[1];
                if(rewardType == 'function') continue;

                let informalName;
                let icon;

                // Get reward info
                if(rewardType == 'theme' || rewardType == 'cosmetic') {
                    informalName = (rewardType == 'theme' ? themes[rewardName].name : cosmetics[rewardName].name);
                    icon = (rewardType == 'theme' ? themes[rewardName].image : cosmetics[rewardName].image);
                } else if(rewardType == 'character') {
                    informalName = capitalizeFL(rewardName);
                    // Get image
                    switch(rewardName) {
                        case 'bill':
                            icon = './assets/characters/Boomer_Bill.png'
                            break;
                        case 'belle':
                            icon = './assets/characters/BelleBommerette.png'
                            break;
                        case 'greg':
                            icon = './assets/characters/Gregory.png'
                            break;
                        case 'charles':
                            icon = './assets/characters/Charles.png'
                            break;
                        case 'carl':
                            icon = './assets/characters/Carl.png'
                            break;
                    }
                }

                inner += 
                `
                <div class="reward flex">
                    <img src="${icon}" alt="${informalName}" class="reward_img">
                    <div>
                        <h4>${informalName}</h4>
                        <p class="secondary_text">
                            ${capitalizeFL(rewardType)}
                        </p>
                    </div>
                </div>
                `;
            }
        }

        // Single reward
        else if(achieve.reward.split(':')[0] != 'function') {
            let rewardType = achieve.reward.split(':')[0];
            let rewardName = achieve.reward.split(':')[1];

            let informalName;
            let icon;

            // Get reward info
            if(rewardType == 'theme' || rewardType == 'cosmetic') {
                informalName = (rewardType == 'theme' ? themes[rewardName].name : cosmetics[rewardName].name);
                icon = (rewardType == 'theme' ? themes[rewardName].image : cosmetics[rewardName].image);
            } else if(rewardType == 'character') {
                informalName = capitalizeFL(rewardName);
                // Get image
                switch(rewardName) {
                    case 'bill':
                        icon = './assets/characters/Boomer_Bill.png'
                        break;
                    case 'belle':
                        icon = './assets/characters/BelleBommerette.png'
                        break;
                    case 'greg':
                        icon = './assets/characters/Gregory.png'
                        break;
                    case 'charles':
                        icon = './assets/characters/Charles.png'
                        break;
                    case 'carl':
                        icon = './assets/characters/Carl.png'
                        break;
                }
            }

            inner = 
            `<div class="reward flex">
                <img src="${icon}" alt="${informalName}" class="reward_img">
                <div>
                    <h4>${informalName}</h4>
                    <p class="secondary_text">
                        ${capitalizeFL(rewardType)}
                    </p>
                </div>
            </div>
            `;
        }
        
        rewardHTML =
        `<!-- Rewards -->
        <div class="rewards_list">
            ${inner}
        </div>`;

        return rewardHTML;
    }
}

function achievementProgress() {
    let unlockedAchievements = Object.keys(player.achievements);
    eInnerText(
        dom('achievement_progress'),
        `${unlockedAchievements.length}/${achievementsKeys.length - hiddenAchievements} (${Math.round(percentage(Object.keys(player.achievements).length, achievementsKeys.length - hiddenAchievements))}%)`
    );
}

// Filter achievements on dropdown change
elAchievementFilter.addEventListener('change', () => {populateAchievements()});

var currentTheme;
// Set theme
function setTheme(theme) {
    // var theme = optionTheme.value;
    var theme_color = '#312e2e';
    var from = store('theme');

    elBody.className = '';
    elBody.classList.add(theme);

    if(themeSwitcherOpen) {
        elBody.classList.add('overflow_hidden');
    }

    // Temporary cosmetic activator 
    // if(theme == 'theme_blockgame') {
    //     setCosmetic('blockgame');
    // } else {
    //     if(store('cosmetic') !== 'default') {
    //         setCosmetic('default');
    //     }
    // }

    // Mobile accent color
    // if(theme == 'theme_light') {theme_color = '#FFFFFF';}
    // else if(theme == 'theme_classic') {theme_color = '#4e3f34';}

    if(themes[theme].hasOwnProperty('accent')) {
        theme_color = themes[theme].accent;
    };

    dom('theme_color').content = theme_color;

    // Save to localStorage
    store('theme', theme);
    currentTheme = theme;

    // Fancy Switcher fix
    themeSwitcherCheckmark(theme, from);
}
//#endregion



// Character info
// function characterInfo(character) {
//     console.log('characterInfo(): ' + character);
//     let element = dom(`${character}_box`);
//     let back = dom(`${character}_bio`);

//     // Front
//     if(element.classList.contains('charflip')) {
//         element.classList.remove('charflip');
//         back.classList.add('charflip_r');
//     } else {
//         element.classList.add('charflip');
//         back.classList.remove('charflip_r');
//     }
// }


// Credits scroll
const elCredits = dom('credits');
function startCredits() {
    elCredits.classList.add('visible');
}


// Keybinds menu
const elKeybindsMenu = dom('keybinds_menu');
const elKeybindsBlurb = dom('keybinds_blurb');
let keyBlurbText = elKeybindsBlurb.innerHTML;
function keybindsMenu() {
    keybindsMenuOpen = true;
    elKeybindsMenu.classList.add('visible');
    overlay.classList.add("visible");
    elBody.classList.add('overflow_hidden');

    if(elDisableKeybinds.checked == true) {
        elKeybindsBlurb.classList.add('color_red');
        elKeybindsBlurb.innerText = 'Warning: Keybinds are currently disabled in settings.';
    } else {
        elKeybindsBlurb.classList.remove('color_red');
        elKeybindsBlurb.innerText = keyBlurbText;
    }

    buttonSound();
}
function closeKeybindsMenu(noOverlay = false) {
    elKeybindsMenu.classList.remove('visible');
    if(noOverlay == false) {
        overlay.classList.remove("visible"); 
    }
}


// Title changer
// setInterval(() => {
//     dom('page_title').innerText = `Carrot Clicker - ${DisplayRounded(player.Carrots)} carrots`;
// }, 15000);



// Mouse position handler
// CREDIT:
// https://stackoverflow.com/a/7790764
(function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        
        mouseX = event.pageX;
        mouseY = event.pageY;
    }
})();
//#endregion
