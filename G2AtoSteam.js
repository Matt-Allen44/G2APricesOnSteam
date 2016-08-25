var apiServerIp = 'localhost';

var g2a_PRODUCTNAME = document.getElementsByClassName('apphub_AppName')[0].innerHTML;

var steamUser_AccountName = document.getElementById('account_pulldown').innerHTML;
var steamUser_SteamPrice = document.getElementsByClassName('game_purchase_price price')[0].innerHTML.trim();

var steamPurchaseArea_Text = "Buy via G2A.com";
var steamPurchaseArea_SubText = "Counter-Strike: Global Offensive STEAM CD-KEY GLOBAL";
var steamPurchaseArea_ButtonText = "View on G2A";
var steamPurchaseArea_Price = "NO KEY";
var steamPurchaseArea_Link =  "http://www.g2a.com/r/counter-strike-global-offensive-global_oewqksda321"; //g2a_SEARCHPATH;

var setGameInformation = function(targetGameName){
  var xmlhttp, text;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', 'http://' + apiServerIp + '/geturl?prod=' + g2a_PRODUCTNAME, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        steamPurchaseArea_SubText = (JSON.parse(xmlhttp.responseText)[0]);
        steamPurchaseArea_Price = "$" + (JSON.parse(xmlhttp.responseText)[1]) + "USD (W/O Shield)";
        steamPurchaseArea_Link = (JSON.parse(xmlhttp.responseText)[2]);

        document.getElementById('game_area_purchase').innerHTML =  '<div class="game_area_purchase_game"><div class="game_area_purchase_platform"><p>' + steamPurchaseArea_SubText + '</p></div> <h1>' + steamPurchaseArea_Text + '</h1> <div class="game_purchase_action"> <div class="game_purchase_action_bg"> <div class="game_purchase_price price">' + steamPurchaseArea_Price + '</div> <div class="btn_addtocart"><a id="g2abuy" class="btnv6_green_white_innerfade btn_medium" href="' + steamPurchaseArea_Link + '"> <span>' + steamPurchaseArea_ButtonText + '</span> </a> </div> </div> </div> </div>' + document.getElementById('game_area_purchase').innerHTML;
        document.getElementById('g2abuy').addEventListener('click', trackUserClickThrough); //Call anallytics for when a user clicks through
    }
  }
}

setGameInformation(g2a_PRODUCTNAME);


var trackUserLoad = function(){
  console.log("Event: Page Load, Account Name: " + steamUser_AccountName + ", Product Name: " + g2a_PRODUCTNAME + ", Steam Price: " + steamUser_SteamPrice + ", G2A Price: " + steamPurchaseArea_Price + ", Time: " + new Date());
  var xmlhttp, text;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', 'http://' + apiServerIp + '/analytics?acc=' + steamUser_AccountName + '&prod=' + g2a_PRODUCTNAME, true);
  xmlhttp.send();
}

var trackUserClickThrough = function(){
  console.log("Event: Click Through, Account Name: " + steamUser_AccountName + ", Product Name: " + g2a_PRODUCTNAME + ", Time: " + new Date());
  var xmlhttp, text;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', 'http://' + apiServerIp + '/analytics/ct?acc=' + steamUser_AccountName  + '&prod=' + g2a_PRODUCTNAME, true);
  xmlhttp.send();
}


trackUserLoad();  //Call analytics for a steam page load
