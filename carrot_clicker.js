<!----------Header---------->
<!--#region -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrot Clicker dev beta v1.3.2</title>

    <!-- Misc -->
    <meta name="theme-color" content="#312e2e" id="theme_color">

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="carrot_clicker.css">
    <link rel="stylesheet" type="text/css" href="themes.css">

    <!-- Page icon -->
    <link rel="shortcut icon" type="image/png" href="./assets/Carrot Clicker.png"/>
</head>  
<!--#endregion-->

<body>

    <!-- On top -->
    <!-- #region -->

    <!-- Dialog Popup -->
    <!-- #region -->
    <!-- Optional classes: dramatic -->
    <div id="overlay" class="dramatic">
    <!-- Backdrop -->
    <div id="backdrop" onclick="closeDialog()"></div>

    <!-- Dialog Box -->
    <div id="dialog">
        <!-- Dialog info -->
        <h2 id="dialog_title">Dialog Title</h2>
        <p id="dialog_desc">
        Dialog description
        </p>
        <!-- Dialog Options -->
        <div id="dialog_buttons">
        <button onclick="closeDialog()" id="dialog_button_cancel">
            Cancel
        </button>
        <button onclick="closeDialog(true)" id="dialog_button_accept">
            OK
            </button>
        </div>
    </div>
    </div>
    <!-- #endregion -->
 

    <!-- Corner Toasts -->
    <!-- #region -->
    <div id="toast_container">
    <div id="toasts_clear" onclick="clearToasts()">
        Close All
    </div>
    <!-- <div class="toast background_red" id="toastID">
        <h3>Title</h3>
        <span class="toast_close" onclick="closeToast('ID')">X</span>
        <p>Description</p>
    </div> -->
    </div>
    <!-- #endregion -->
  

    <!-- Number Popup -->
    <div id="bonusVisualArea"></div>

    <!-- #endregion -->


    <!--Basic Info Carrots; Cpc; Cps-->
    <div class="status_bar">

        <!-- Status bar -->
        <div class="Basic_Info flex"> 
            <p id="Basic_Info"><b>Carrot Clicker</b> - <a href="https://github.com/JJCVIP/Carrot-Clicker">Github</a> - <b id="multibuy" class="link_styling" onclick="multibuySpin()">1x</b><p>
            <div id="Tip" class="link_styling" onclick="tipchange()">Tip: Click The Carrot</div>
        </div>

        <!-- Progress bar -->
        <div class="status_progress_bar">
            <div id="main_progress" class="status_progress">
                <!-- Image -->
                <img src="/assets/tools/wood_hoe.png" alt="" id="main_progress_image" class="main_progress_image">
                <!-- Progress -->
                <div id="main_progress_bar" class="progress" style="width: 50%"></div>
            </div>
        </div>

    </div>

  
    <div id="container" class="flex">
        <!-- Left Section -->
        <!-- #region -->
        <div id="left-section">
            <!-- Carrot image-->
            <img src="./assets/Carrot Clicker.png" id="main_carrot" alt="Carrot" onclick="onClick()" role="button" tabindex="0">

            <!-- Numbers/Info Section -->
            <p id="Carrot_Count">Loading...</p>
            <p id="cpc">Loading...</p>
            <p id="cps">Loading...</p>
            <p id="golden_carrot_count"></p>
            
            <!-- Prestige Section -->
            <div id="prestige-section">
                <button onClick="openDialog('Are you Sure you want to Prestige?', 'Your carrots, characters, and upgrades will be lost, but you will gain a permanent earnings boost.', 'Prestige', 'button_gold', 'prestige')" class="button_gold">
                    Prestige
                </button>
                <p class="prestigetooltip">
                    Prestiging now will result in <span id="Prestige">0</span> Golden Carrots
                </p>
            </div>

        </div>
        <!-- #endregion -->



        <!-- Right Section -->
        <!-- #region -->
        <div id="right-section" class="character_column">
            <!-- Character column 1 -->
            <div class="character_column">

                <!--Boomer Bill Rendering-->
                <!-- #region -->
                <div class="Bill characterbox">
                <div class="billtooltip charactertooltip tooltip" id="billtooltip">Upgrading Bill will increase your carrots per click (CPC) by one.</div>
                <!-- Top -->
                <div class="top flex">
                    <img
                    src="./assets/characters/Boomer_Bill.png"
                    alt="Boomer Bill"
                    id="bill_avatar"
                    class="characterimg"
                    title="Boomer Bill">
                    <div class="characterdesc">
                    <b class="charactername">Bill</b>
                    <p id="UpBillCost"></p>
                    <figcaption id="Bill_lvl" class="characterlevel"></figcaption>
                    </div>

                </div>

                <!-- Bottom -->
                <div class="bottom hoecontainer">

                    <img src="./assets/iconography/lvl_up_arrow.png" id="Bill_level_up" class="levelupimg" alt="Upgrade Boomer Bill" onclick="LevelUp(Boomer_Bill,multibuy[multibuySelector])" title="Upgrade">

                    <p class="Bill_Hoe_Number toolnumber" id="Bill_Wooden_Hoe_Number">err</p>
                    <img src="./assets/tools/wood_hoe.png" onclick="EquipHoe(Boomer_Bill,0,multibuy[multibuySelector])" class="toolicon blackedout" id="bill_wooden_hoe">

                    <p class="Bill_Hoe_Number toolnumber" id="Bill_Stone_Hoe_Number">err</p>
                    <img src="./assets/tools/stone_hoe.png" onclick="EquipHoe(Boomer_Bill,1),multibuy[multibuySelector]" class="toolicon blackedout" id="bill_stone_hoe">

                    <p class="Bill_Hoe_Number toolnumber" id="Bill_Iron_Hoe_Number">err</p>
                    <img src="./assets/tools/iron_hoe.png" onclick="EquipHoe(Boomer_Bill,2,multibuy[multibuySelector])" class="toolicon blackedout" id="bill_iron_hoe">

                    <p class="Bill_Hoe_Number toolnumber" id="Bill_Gold_Hoe_Number">err</p>
                    <img src="./assets/tools/gold_hoe.png" onclick="EquipHoe(Boomer_Bill,3,multibuy[multibuySelector])" class="toolicon blackedout" id="bill_gold_hoe">

                    <p class="Bill_Hoe_Number toolnumber" id="Bill_Diamond_Hoe_Number">err</p>
                    <img src="./assets/tools/diamond_hoe.png" onclick="EquipHoe(Boomer_Bill,4,multibuy[multibuySelector])" class="toolicon blackedout" id="bill_diamond_hoe">

                    <p class="Bill_Hoe_Number toolnumber" id="Bill_Netherite_Hoe_Number">err</p>
                    <img src="./assets/tools/netherite_hoe.png" onclick="EquipHoe(Boomer_Bill,5,multibuy[multibuySelector])" class="toolicon blackedout" id="bill_netherite_hoe">
                </div>

                </div>
                <!-- #endregion -->

                <!--Belle Boomerette Rendering-->
                <!-- #region -->
                <div class="Belle characterbox">
                <div class="belletooltip charactertooltip tooltip" id="belletooltip">Upgrading Belle will increase your carrots per second (CPS) by one.</div>

                <!-- Top -->
                <div class="top flex">
                    <img
                    src="./assets/characters/BelleBommerette.png"
                    alt="Belle Boomerette"
                    id="belle_avatar"
                    class="characterimg"
                    title="Boomer Belle">
                    <div class="characterdesc">
                    <b class="charactername">Belle</b>
                    <p id="UpBelleCost"></p>
                    <figcaption id="Belle_lvl" class="characterlevel"></figcaption>
                    </div>
                </div>

                <!-- Bottom -->
                <div class="bottom hoecontainer">

                    <img src="./assets/iconography/lvl_up_arrow.png" id="Belle_level_up" alt="Upgrade Belle Boomerette" onclick="LevelUp(Belle_Boomerette,multibuy[multibuySelector])" class="levelupimg" title="Upgrade">

                    <p class="Belle_Hoe_Number toolnumber" id="Belle_Wooden_Hoe_Number">err</p>
                    <img src="./assets/tools/wood_hoe.png" onclick="EquipHoe(Belle_Boomerette,0,multibuy[multibuySelector])" class="toolicon blackedout" id="belle_wooden_hoe">

                    <p class="Belle_Hoe_Number toolnumber" id="Belle_Stone_Hoe_Number">err</p>
                    <img src="./assets/tools/stone_hoe.png" onclick="EquipHoe(Belle_Boomerette,1,multibuy[multibuySelector])" class="toolicon blackedout" id="belle_stone_hoe">

                    <p class="Belle_Hoe_Number toolnumber" id="Belle_Iron_Hoe_Number">err</p>
                    <img src="./assets/tools/iron_hoe.png" onclick="EquipHoe(Belle_Boomerette,2,multibuy[multibuySelector])" class="toolicon blackedout" id="belle_iron_hoe">

                    <p class="Belle_Hoe_Number toolnumber" id="Belle_Gold_Hoe_Number">err</p>
                    <img src="./assets/tools/gold_hoe.png" onclick="EquipHoe(Belle_Boomerette,3,multibuy[multibuySelector])" class="toolicon blackedout" id="belle_gold_hoe">

                    <p class="Belle_Hoe_Number toolnumber" id="Belle_Diamond_Hoe_Number">err</p>
                    <img src="./assets/tools/diamond_hoe.png" onclick="EquipHoe(Belle_Boomerette,4,multibuy[multibuySelector])" class="toolicon blackedout" id="belle_diamond_hoe">

                    <p class="Belle_Hoe_Number toolnumber" id="Belle_Netherite_Hoe_Number">err</p>
                    <img src="./assets/tools/netherite_hoe.png" onclick="EquipHoe(Belle_Boomerette,5,multibuy[multibuySelector])" class="toolicon blackedout" id="belle_netherite_hoe">
                </div>

                </div>
                <!-- #endregion -->
                
                <!--Gregory Rendering-->
                <div class="Greg characterbox">
                    <div class="billtooltip charactertooltip tooltip" id="gregtooltip">Upgrading Greg To Create and Store Hoes.</div>
                    <!-- Top -->
                    <div class="top flex">
                        <img
                        src="./assets/characters/Gregory.png"
                        alt="Gregory"
                        id="Greg_avatar"
                        class="characterimg"
                        title="Gregory">
                        <div class="characterdesc">
                        <b class="charactername">Greg</b>
                        <p id="UpGregCost">show</p>
                        <figcaption id="Greg_lvl" class="characterlevel">lvl:0</figcaption>
                        </div>
                    </div>

                    <!-- Bottom -->
                    <div class="bottom">
                        <div class="Greg_Hoe_Container hoecontainer">
                        <span class="hoe_price">Prices:</span>
                        <img src="./assets/iconography/lvl_up_arrow.png" id="Greg_level_up" alt="Upgrade Greg" onclick="LevelUp(Gregory,multibuy[multibuySelector])" class="levelupimg" title="Upgrade">
                        
                        <span id="wooden_hoe_price" class="hoe_price">Wooden</span>
                        <p class="Greg_Hoe_Number toolnumber" id="Greg_Wooden_Hoe_Number">err</p>
                        <img src="./assets/tools/wood_hoe.png" class="toolicon blackedout" onclick="CreateHoe(0,multibuy[multibuySelector])" id="greg_wooden_hoe">

                        <span id="stone_hoe_price" class="hoe_price">Stone</span>
                        <p class="Greg_Hoe_Number toolnumber" id="Greg_Stone_Hoe_Number">err</p>
                        <img src="./assets/tools/stone_hoe.png" class="toolicon blackedout" onclick="CreateHoe(1,multibuy[multibuySelector])" id="greg_stone_hoe">

                        <span id="iron_hoe_price" class="hoe_price">Iron</span>
                        <p class="Greg_Hoe_Number toolnumber" id="Greg_Iron_Hoe_Number">err</p>
                        <img src="./assets/tools/iron_hoe.png" class="toolicon blackedout" onclick="CreateHoe(2,multibuy[multibuySelector])" id="greg_iron_hoe">

                        <span id="gold_hoe_price" class="hoe_price">Gold</span>
                        <p class="Greg_Hoe_Number toolnumber" id="Greg_Gold_Hoe_Number">err</p>
                        <img src="./assets/tools/gold_hoe.png" class="toolicon blackedout" onclick="CreateHoe(3,multibuy[multibuySelector])" id="greg_gold_hoe">

                        <span id="diamond_hoe_price" class="hoe_price">Diamond</span>
                        <p class="Greg_Hoe_Number toolnumber" id="Greg_Diamond_Hoe_Number">err</p>
                        <img src="./assets/tools/diamond_hoe.png" class="toolicon blackedout" onclick="CreateHoe(4,multibuy[multibuySelector])" id="greg_diamond_hoe">

                        <span id="netherite_hoe_price" class="hoe_price">Netherite</span>
                        <p class="Greg_Hoe_Number toolnumber" id="Greg_Netherite_Hoe_Number">err</p>
                        <img src="./assets/tools/netherite_hoe.png" class="toolicon blackedout" onclick="CreateHoe(5,multibuy[multibuySelector])" id="greg_netherite_hoe">
                        </div>
                        
                        <!-- Progress Bar -->
                        <div id="Greg_Bar">
                            <div id="Greg_Progress" class="progress"></div>
                        </div>
                    
                    </div>
                </div>

            </div>


            <!-- Character column 2 -->
            <!-- #region -->
            <div class="character_column">
            
                <!--Charles Rendering-->
                <div class="Charles characterbox">
                    <div class="charlestooltip charactertooltip tooltip" id="charlestooltip">
                        Charles Tooltip
                    </div>

                    <!-- Top -->
                    <div class="top flex">
                        <img
                            src="./assets/characters/Charles.png"
                            alt="Belle Boomerette"
                            id="belle_avatar"
                            class="characterimg"
                            title="Charles">
                        <div class="characterdesc">
                            <b class="charactername">Charles</b>
                            <p>Charles description</p>
                        </div>
                    </div>

                    <!-- Bottom -->
                    <!-- Intentionally doesn't contain anything so it's just a line-->
                    <div class="bottom"></div>

                    <!-- Charles' buttons -->
                    <button
                    onclick="IncreaseImproveWorkingConditions()"
                    id="ImproveWorkingConditions"
                    class="unbold">
                    </button>
                    
                    <button
                    onclick="IncreaseBetterHoes()"
                    id="BetterHoes"
                    class="unbold">
                    </button>

                    <button
                    onclick="IncreaseDecreaseWages()"
                    id="DecreaseWages"
                    class="unbold">
                    </button>
                        
                </div>
            
            </div>
            <!-- #endregion -->

        </div>
        <!-- #endregion -->
        <!-- End Right section -->


        </div>
    </div>
    <!-- #endregion -->


  </div>

  <!-- Lower section -->
  <!-- #region -->
  <div class="information-area flex">
    <!-- Info section -->
    <!-- <div class="row-break"></div> -->
    <div id="notifs-section">
        <!-- Nav buttons -->
        <nav id="notifs-nav">
            <button class="activetab tab" id="achievements-panel-button" onclick="panelChange(`achievements-panel`)">Achievements</button><button class="tab" id="info-panel-button" onclick="panelChange(`info-panel`)">Statistics</button><button class="tab" id="settings-panel-button" onclick="panelChange(`settings-panel`)">Settings</button>
        </nav>

        <!-- Achievements Panel -->
        <div id="achievements-panel" class="panel">
            <h1>Achievements</h1>
            Achievements will go here (when they've been implemented)
            <div id="achievements-inner">
                
            </div>
        </div>

        <!-- Info Panel -->
        <div id="info-panel" class="panel">
            <div id="info-inner">
            <h1>Statistics</h1>
            <p>Lifetime statistics will go here (when they've been implemented)</p>
            
            <!-- <div class="info-item">
                <img src="assets/Carrot Clicker.png" alt="carrot" class="achievement-img">
                <div>
                <h1>Achievement earned: Click the carrot</h1>
                <p>Click the carrot</p>
                </div>
            </div>-->
            
            </div> 
        </div>



        <!-- Settings Panel -->
        <div id="settings-panel" class="panel">
            <h1>Settings</h1>
            <p><i>Your game progress will always be saved.</i></p><br>

            <!-- Options item -->
            <label for="theme_dropdown">
                Theme<br>
                <select name="theme_dropdown" id="theme_dropdown">
                    <option value="theme_dark">Dark theme</option>
                    <option value="theme_light">Light theme (WIP)</option>
                    <option value="theme_classic">Carrot Clicker classic</option>
                </select><br><br>
            </label>


            <!-- Options item -->
            <label for="disable_keybinds">
            <input type="checkbox" id="disable_keybinds" onclick="settingDisableKeybinds()">
                Disable keybinds
            </label><br><br>

            <!-- Notification Length -->
            <label for="notificationLength">Time until notifications disappear (In seconds)<br>
            <input type="number" id="notificationLength" value="5">
            <button onclick="saveOption('notificationLength')">Save</button>
            <button onclick="resetOption()">Reset</button>
            </label><br><br>

            <!-- Fun Tip Percentage-->
            <div class="slidecontainer">
                <label for="FunTipPercentage" >Percentage of fun tips: <span id="FunTipsSliderLabel">50</span>% <br>
                    <input type="range" min="1" max="100" value="50" class="slider" id="FunTipsSlider">
                </label><br><br>
            </div>
            
            <!-- Options item -->
            <p>Danger Zone:</p>
            <button id="clear_save_data" class="button_red" onClick="openDialog('Are you sure?', 'Your progress will be lost forever!', 'Delete Save Data', 'button_red', 'clearsave')">
                Delete Save Data
            </button>
        </div>
    </div>
    <!-- End Info section -->
  </div>
<!-- #endregion -->
  


  <!-- Javascript -->
  <!-- #region -->
  <script src="https://not-the.github.io/carrot_utilities/carrot_utillities.js"></script>
  <script src="carrot_clicker.js"></script>
  <script src="styling.js"></script>
  <script src="user.js"></script>
  <!-- #endregion -->

</body>
</html>
