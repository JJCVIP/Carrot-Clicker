<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrot Clicker beta 1.1</title>

    <link rel="stylesheet" type="text/css" href="carrot_clicker.css">
    <link rel="shortcut icon" type="image/png" href="./assets/Carrot Clicker.png"/>
</head>
<body>
  <!-- On top -->
  <div id="bonusVisualArea">
    
  </div>

  <!--Basic Info Carrots; Cpc; Cps-->
  <div class="Basic_Info"> 
    <p id="Basic_Info">Working...<p>
    <hr class="info-divide">
    <div id="Tip" onclick="tipchange()">Tip: Click The Carrot</div>
  </div>
  
  <div id="container" class="flex">
      <!-- Left Section -->
      <div id="left-section">

        <!-- Carrot image-->
        <div id="clicking_area" onclick="onClick()">
        </div>
        <img src="./assets/Carrot Clicker.png" id="main_carrot" alt="Carrot">

                <!-- Numbers/Info Section -->
                <p id="Carrot_Count">Working...</p>
                <p id="cpc">Carrots per click:</p>
                <p id="cps">Carrots per second:</p>
                <p id="golden_carrot_count"></p>
       
        <!-- Prestige Section -->
        <div id="prestige-section">
          <button type="button" onClick="Prestige()" class="prestigebutton">Prestige</button>
          <p id="Prestige" class="prestigetooltip"><p>
        </div>

      </div>


  
      <!-- Right Section -->
      <div id="right-section">
          <!--Boomer Bill Rendering-->
          <div class="Bill characterbox">
            <div class="billtooltip charactertooltip tooltip" id="billtooltip">Upgrading Bill will increase your carrots per click (CPC) by one.</div>
            <!-- Top -->
            <div class="top flex">
              <img src="./assets/characters/Boomer_Bill.png" alt="Boomer Bill" id="bill_avatar" class="characterimg">
              <div class="characterdesc">
                <b class="charactername">Bill</b>
                <p id="UpBillCost"></p>
                <figcaption id="Bill_lvl" class="characterlevel"></figcaption>
              </div>

            </div>

            <!-- Bottom -->
            <div class="bottom hoecontainer">

              <img src="./assets/iconography/lvl_up_arrow.png" id="Bill_level_up" class="levelupimg" alt="Upgrade Boomer Bill" onclick="LevelUp(Boomer_Bill)">

              <p class="Bill_Hoe_Number toolnumber" id="Bill_Wooden_Hoe_Number"></p>
              <img src="./assets/tools/wood_hoe.png" onclick="EquipHoe(Boomer_Bill,0)" class="toolicon">

              <p class="Bill_Hoe_Number toolnumber" id="Bill_Stone_Hoe_Number"></p>
              <img src="./assets/tools/stone_hoe.png" onclick="EquipHoe(Boomer_Bill,1)" class="toolicon">

              <p class="Bill_Hoe_Number toolnumber" id="Bill_Iron_Hoe_Number"></p>
              <img src="./assets/tools/iron_hoe.png" onclick="EquipHoe(Boomer_Bill,2)" class="toolicon">

              <p class="Bill_Hoe_Number toolnumber" id="Bill_Gold_Hoe_Number"></p>
              <img src="./assets/tools/gold_hoe.png" onclick="EquipHoe(Boomer_Bill,3)" class="toolicon">

              <p class="Bill_Hoe_Number toolnumber" id="Bill_Diamond_Hoe_Number">1</p>
              <img src="./assets/tools/diamond_hoe.png" onclick="EquipHoe(Boomer_Bill,4)" class="toolicon">

              <p class="Bill_Hoe_Number toolnumber" id="Bill_Netherite_Hoe_Number">1</p>
              <img src="./assets/tools/netherite_hoe.png" onclick="EquipHoe(Boomer_Bill,5)" class="toolicon">
            </div>

          </div>
  
        <!--Belle Boomerette Rendering-->
        <div class="Belle characterbox">
          <div class="belletooltip charactertooltip tooltip" id="belletooltip">Upgrading Belle will increase your carrots per second (CPS) by one.</div>

          <!-- Top -->
          <div class="top flex">
            <img src="./assets/characters/BelleBommerette.png" alt="Belle Boomerette" id="belle_avatar" class="characterimg">
            <div class="characterdesc">
              <b class="charactername">Belle</b>
              <p id="UpBelleCost"></p>
              <figcaption id="Belle_lvl" class="characterlevel"></figcaption>
            </div>
          </div>

          <!-- Bottom -->
          <div class="bottom hoecontainer">

            <img src="./assets/iconography/lvl_up_arrow.png" id="Belle_level_up" alt="Upgrade Belle Boomerette" onclick="LevelUp(Belle_Boomerette)" class="levelupimg">

            <p class="Belle_Hoe_Number toolnumber" id="Belle_Wooden_Hoe_Number">1</p>
            <img src="./assets/tools/wood_hoe.png" onclick="EquipHoe(Belle_Boomerette,0)" class="toolicon">

            <p class="Belle_Hoe_Number toolnumber" id="Belle_Stone_Hoe_Number">1</p>
            <img src="./assets/tools/stone_hoe.png" onclick="EquipHoe(Belle_Boomerette,1)" class="toolicon">

            <p class="Belle_Hoe_Number toolnumber" id="Belle_Iron_Hoe_Number">1</p>
            <img src="./assets/tools/iron_hoe.png" onclick="EquipHoe(Belle_Boomerette,2)" class="toolicon">

            <p class="Belle_Hoe_Number toolnumber" id="Belle_Gold_Hoe_Number">1</p>
            <img src="./assets/tools/gold_hoe.png" onclick="EquipHoe(Belle_Boomerette,3)" class="toolicon">

            <p class="Belle_Hoe_Number toolnumber" id="Belle_Diamond_Hoe_Number">1</p>
            <img src="./assets/tools/diamond_hoe.png" onclick="EquipHoe(Belle_Boomerette,4)" class="toolicon">

            <p class="Belle_Hoe_Number toolnumber" id="Belle_Netherite_Hoe_Number">1</p>
            <img src="./assets/tools/netherite_hoe.png" onclick="EquipHoe(Belle_Boomerette,5)" class="toolicon">
          </div>

        </div>
        <!--Gregory Rendering-->
        <div class="Greg characterbox">
          <div class="billtooltip charactertooltip tooltip" id="gregtooltip">Upgrading Greg To Create and Store Hoes.</div>
          <!-- Top -->
          <div class="top flex">
            <img src="./assets/characters/Gregory.png" alt="Gregory" id="Greg_avatar" class="characterimg">
            <div class="characterdesc">
              <b class="charactername">Greg</b>
              <p id="UpGregCost">show</p>
              <figcaption id="Greg_lvl" class="characterlevel">lvl:0</figcaption>
            </div>
            
          </div>

          <!-- Bottom -->
          <div class="bottom">

            
            
            
            <div class="Greg_Hoe_Container hoecontainer">
              <img src="./assets/iconography/lvl_up_arrow.png" id="Greg_level_up" alt="Upgrade Greg" onclick="LevelUp(Gregory)" class="levelupimg">
              
              <p class="Greg_Hoe_Number toolnumber" id="Greg_Wooden_Hoe_Number">1</p>
              <img src="./assets/tools/wood_hoe.png" class="toolicon" onclick="CreateHoe(0)">

              <p class="Greg_Hoe_Number toolnumber" id="Greg_Stone_Hoe_Number">1</p>
              <img src="./assets/tools/stone_hoe.png" class="toolicon" onclick="CreateHoe(1)">

              <p class="Greg_Hoe_Number toolnumber" id="Greg_Iron_Hoe_Number">1</p>
              <img src="./assets/tools/iron_hoe.png" class="toolicon" onclick="CreateHoe(2)">

              <p class="Greg_Hoe_Number toolnumber" id="Greg_Gold_Hoe_Number">1</p>
              <img src="./assets/tools/gold_hoe.png" class="toolicon" onclick="CreateHoe(3)">

              <p class="Greg_Hoe_Number toolnumber" id="Greg_Diamond_Hoe_Number">1</p>
              <img src="./assets/tools/diamond_hoe.png" class="toolicon" onclick="CreateHoe(4)">

              <p class="Greg_Hoe_Number toolnumber" id="Greg_Netherite_Hoe_Number">1</p>
              <img src="./assets/tools/netherite_hoe.png" class="toolicon" onclick="CreateHoe(5)">
            </div>
            
            
            <!-- Progress Bar -->
            <div id="Wooden_Hoe_Bar">
              <div id="Wooden_Hoe_Progress"></div>
            </div>
            
            </div>
          </div>

        <!--Temporary Hoe Cost Display-->
        <div>
          <p id="Hoe_Prices">e</p>
        </div>
                <!--Charles Rendering-->
                <div class="Belle characterbox">
                  <div class="belletooltip charactertooltip tooltip" id="belletooltip">Cum Charles</div>
        
                  <!-- Top -->
                  <div class="top flex">
                    <img src="./assets/characters/Charles.png" alt="Belle Boomerette" id="belle_avatar" class="characterimg">
                    <div class="characterdesc">
                      <b class="charactername">Charles</b>
                    </div>
                  </div>
        
                  <!-- Bottom -->
                  <div class="bottom hoecontainer">
                  </div>
                    <button onclick="ImproveWorkingConditions()" id="ImproveWorkingConditions">Do a thing</button>
                    <button onclick="BetterHoes()" id="BetterHoes">Do another Thing</button>
                    <button onclick="DecreaseWages()" id="DecreaseWages">Third Thing</button>
                </div>
      </div>
      <!-- End Right section -->


      <!-- Notifications section -->
      <!-- <div class="row-break"></div> -->
      <div id="notifs-section">
        <nav id="notifs-nav">
          <button class="activetab tab" id="info-panel-button" onclick="panelChange(`info-panel`)">Info</button><button class="tab" id="achievements-panel-button" onclick="panelChange(`achievements-panel`)">Achievements</button><button class="tab" id="settings-panel-button" onclick="panelChange(`settings-panel`)">Settings</button>
        </nav>
        <div id="info-panel" class="panel">
          <div class="info-item">
            <img src="assets/Carrot Clicker.png" alt="carrot" class="achievement-img">
            <div>
              <h1>Achievement earned: Click the carrot</h1>
              <p>Click the carrot</p>
            </div>
          </div>
        </div>
        <div id="achievements-panel" class="panel">
          Achievements will go here
          <div id="achievements-inner">
            
          </div>
        </div>
        <div id="settings-panel" class="panel">
          Settings will go here
        </div>
      </div>
      <!-- End Notifications section -->
  </div>








  <!-- Javascript -->
  <script src="carrot_clicker.js"></script>
  <script src="styling.js"></script>
</body>
</html>
