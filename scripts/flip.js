var mode = "msg";
var newgame = -1;
var chosen = -1;
var ooo = true;
var back = 0;
var affected = false;

//----- Messages -----------------------------------------------------------------

var msg_use = [];
var msg_img = ["johnny.png","johnny.png","gr_back.png","bl_back.png","johnny.png","","","bear.png","","bear.png","ace.png","ace.png","","","gr_back"];
var msg_html = [];
msg_html[0] = "Congrats! You got your first perfect equation! Remember - every time you create a perfect equation on my board, a friend will come up allowing you to get some bonus cards. Good luck!";
msg_html[1] = "Woah! Slow down there buddy! If you get a perfect equation on my board and ALL of the friends are here already, I'll do you one better. Here's a purple card you can flip over to get points, bonus cards or more!";
msg_html[2] = "Hey, you got a green card! What do they do, you ask? Well, these green cards mess with Johnny and his friends, sometimes in good ways and sometimes in bad ways, so it might be a good idea to use these carefully. Don't worry though - they only last one round for each of him and his friends, and can be changed with another green card or with certain other cards.";
msg_html[3] = "Hey, you got a blue card! What do they do, you ask? Well, these blue cards work just like orange cards but with different values. They can prove to be more useful than orange cards if you use them right. Just keep an eye on what you place on your boards and if you think a blue card can help, give it a try!";
msg_html[4] = "Cool! Now, when a board fills up, there will be a tally card showing your score for that round.<br/><br/>Depending on how close you are to the target, you can get 10 points for a perfect equation, 5 for getting inside the red goal range, or lose 1 if you're too far off.<br/><br/>If you get a perfect equation on my board, a friend board will pop up with a goal that works the same way as my board, but with extra prizes.<br/><br/>I'll give you a free one to start off with. You only get 5 rounds on the minigame board before it disappears, so make good use of it! Got it? Good luck!";
msg_html[5] = "Woah, that spinach made my arms grow big an strong! It seems like now I can reach the goal even easier than before. Now if you're within 25 of the red goal range, I can still get you at least 1 point!";
msg_html[6] = "Gah, I can't see with this blindfold on! At least if I score some points this round, they'll be doubled since this is so much harder scoring than when I can see.";
msg_html[7] = "Hey there, I'm Bear! I like sandwiches a whole bunch. If you happen to find a sandwich, you can drop it in my basket for a quick 10 points! My basket can only hold 10 cards though, so be careful what you drop in there - when my basket fills up I have to go!";
msg_html[8] = "Oh no, that sandwich made me too full to take in any more cards!";
msg_html[9] = "Thanks for the cards! I hope you got me some yummy sandwiches. I love sandwiches! By the way, whenever my basket is full, I'll leave you a green card before I go!";
msg_html[10] = "Howdy, I'm Ace! I enjoy the finer things in life. If you can fill all 5 of my card slots with some fine items, I'll give you 10 blue cards and 3 green cards to do with as you please!";
msg_html[11] = "Sorry man, but you can't take back stuff you already gave me!";
msg_html[12] = "Argh! I can't do math for crap with a hangover like this...";
msg_html[13] = "Uh oh! It's too smoky to see what the goal is now...";
msg_html[14] = "Remember - to place green cards, click on the face at the beginning of a row.";

function show_msg(n) {
  mode = "msg";
  msg_use[n] = 1;
  gid("msgimg").src = "/cardgame/images/" + msg_img[n];
  gid("msgtxt").innerHTML = msg_html[n];
  gid("bg").style.display = "block";
  gid("msg").style.display = "block";
}

function hide_msg() {
  gid("bg").style.display = "none";
  gid("msg").style.display = "none";
  if (msg_use[1] == 1) {
    mode = "bonus";
    msg_use[1] = 2;
  } else {
    mode = "draw";
  }
  updategui();
}

//----- Deck Arrays --------------------------------------------------------------

var draws = [0, 0, 0];
var decks = []; var totalweight = []; var deck_back = [];
var card_images = []; var card_weight = []; var card_values = [];
decks[0] = 0; totalweight[0] = 26;  deck_back[0] = "or_back.png";
card_images[0] = "or_p100.png";     card_weight[0] = 5;   card_values[0] = "+100";
card_images[1] = "or_p50.png";      card_weight[1] = 4;   card_values[1] = "+50";
card_images[2] = "or_t2.png";       card_weight[2] = 3;   card_values[2] = "*2";
card_images[3] = "or_p25.png";      card_weight[3] = 2;   card_values[3] = "+25";
card_images[4] = "or_t3.png";       card_weight[4] = 2;   card_values[4] = "*3";
card_images[5] = "or_m25.png";      card_weight[5] = 1;   card_values[5] = "-25";
card_images[6] = "or_m50.png";      card_weight[6] = 2;   card_values[6] = "-50";
card_images[7] = "or_tm1.png";      card_weight[7] = 1;   card_values[7] = "*(-1)";
card_images[8] = "or_m100.png";     card_weight[8] = 2;   card_values[8] = "-100";
card_images[9] = "or_p75.png";      card_weight[9] = 1;   card_values[9] = "+75";
card_images[10] = "or_m75.png";     card_weight[10] = 1;  card_values[10] = "-75";
card_images[11] = "or_t4.png";      card_weight[11] = 2;  card_values[11] = "*4";
card_images[12] = "or_sand.png";    card_weight[12] = 0;  card_values[12] = " ";
card_images[13] = "or_wine.png";    card_weight[13] = 0;  card_values[13] = " ";
card_images[14] = "or_gar.png";     card_weight[14] = 0;  card_values[14] = " ";
decks[1] = 15; totalweight[1] = 7; deck_back[1] = "bl_back.png";
card_images[15] = "bl_t0.png";      card_weight[15] = 3;  card_values[15] = "*0";
card_images[16] = "bl_p0.png";      card_weight[16] = 3;  card_values[16] = "+0";
card_images[17] = "bl_blank.png";   card_weight[17] = 1;  card_values[17] = " ";
decks[2] = 18; totalweight[2] = 7;  deck_back[2] = "gr_back.png";
card_images[18] = "gr_blind.png";   card_weight[18] = 3;  card_values[18] = "Blind";
card_images[19] = "gr_ok.png";      card_weight[19] = 1;  card_values[19] = "OK";
card_images[20] = "gr_spinach.png"; card_weight[20] = 3;  card_values[20] = "Big Arms";
decks[3] = 21; totalweight[3] = 12;  deck_back[3] = "pu_back.png";
card_images[21] = "pu_1bl.png";     card_weight[21] = 3;  card_values[21] = "draws[1]++;";
card_images[22] = "pu_1gr.png";     card_weight[22] = 1;  card_values[22] = "draws[2]++;";
card_images[23] = "pu_cure.png";    card_weight[23] = 1;  card_values[23] = "for (p=0;p<tries.length;p++) { status[p]=\"OK\"; }";
card_images[24] = "pu_100p.png";    card_weight[24] = 1;  card_values[24] = "points += 100;";
card_images[25] = "pu_bear.png";    card_weight[25] = 3;  card_values[25] = "playbeargame();";
card_images[26] = "pu_ace.png";     card_weight[26] = 3;  card_values[26] = "playacegame();";
decks[4] = 27;
card_images[27] = "epic_win.png";

//----- Card Groups --------------------------------------------------------------

var points = 0;   // Actual score

var goalstr = [];
goalstr[0] = "randint(6,20) * 25";
goalstr[1] = "randint(1,3) * 25";
goalstr[2] = "randint(6,20) * -25";
goalstr[3] = "randint(9,15) * 100";
goalstr[4] = "randint(-4,4) * 25";

var score = [0, 0, 0, 0, 0];
var status = ["OK", "OK", "OK", "OK", "OK"];

var goal = [100, 50, -150, 1200, 0];
var group_a = [1, 6, 8,  12, 17];
var group_b = [5, 7, 11, 16, 19];
var yield = [50, 25, 50, 200, 25];
var tries = [0, 0, 0, 0, 0];
var char_img = ["johnny.png","sara.png","alien.png","carlos.png","lopez.png"];

var slots = []; for (i=1; i<= group_b[yield.length - 1]; i++) { slots[i] = ""; }

//----- General Functions --------------------------------------------------------

function randint(lo, hi) { var span = (hi - lo) + 1; return (Math.ceil(Math.random() * span) + lo - 1); }
function gid(id) { return document.getElementById(id); }

//----- Challenges ---------------------------------------------------------------

function challenge() {
  if (!msg_use[0]) { show_msg(0); }
  var m = 0;
  var minigames = yield.length - 1;
  for (q=1; q <= minigames; q++) { m += (tries[q] > 0)? 1 : 0; }
  if (m == minigames){
    if (!msg_use[1]) { show_msg(1); }
    mode = "bonus";
    gid("bonus0").src = "images/pu_back.png";
  } else {
    minigames -= m;
    var usegame = randint(1, minigames);
    var n = 0;
    do {
      n++;
      if (tries[n] < 1) { usegame--; }
    } while (usegame > 0);
    tries[n] = 5;
    gid("slotgrp" + n).style.display = "block";
    gid("tries" + n).innerHTML = "5";
    gid("bonus0").src = "images/pu_unlock.png";
  }
  gid("bonus0").style.display = "inline";
}

//----- Pick a Card --------------------------------------------------------------

function pick(deck) {
  if ((deck > 0)&&(deck < 3)) {
    draws[deck] -= 1;
    if (draws[deck] < 1) { gid("pile" + deck).src = "images/outline.png"; }
    gid("draws" + deck).innerHTML = draws[deck];
  }
  if ((deck == 2)&&(!msg_use[14])) { show_msg(14); }
  var rnd = randint(1, totalweight[deck]);
  thecard = decks[deck] - 1;
  do {
    thecard++;
    rnd -= card_weight[thecard];
  } while (rnd > 0);
  return thecard;
}

//----- Draw a Card --------------------------------------------------------------

function flip(deck) {
  if ((mode == "draw")&&((deck == 0)||(draws[deck] > 0))) {
    if (newgame > -1) { clear(newgame); }
    //--- Handle Bear Minigame
    if (beartries > 0) {
      gid("bearslot").src = "images/outline.png";
    } else if (beartries == 0) {
      if (!msg_use[9]) { show_msg(9); }
      beartries--; draws[2]++; updategui();
      gid("pile" + deck).src = "images/gr_deck.png";
      gid("beargame").style.display = "none";
      totalweight[3] += 3; card_weight[23] += 3;
      totalweight[0] -= 3; card_weight[12] -= 3;
    }
    //--- Handle Ace Minigame
    if (acecards > 4) {
      if (acewon) {
        draws[1]+= 10; gid("pile1").src = "images/bl_deck.png";
        draws[2]+= 3; gid("pile2").src = "images/bl_deck.png";
        updategui();
      }
      gid("acegame").style.display = "none";
      totalweight[3] += 3; card_weight[26] += 3;
      totalweight[0] -= 6; card_weight[13] -= 3; card_weight[14] -= 3;
    }

    var iscard = false;
    var rand = randint(1,20);
    for (p=1; p < group_b[group_b.length -1] + 1; p++) {
	  filename = gid("slot" + p).src;
	  filename = filename.substring(filename.length-11);
	  if(filename != "outline.png") iscard = true;
	}
    if ((rand == 1) && (iscard)) {
      newcard = decks[4];
    } else {
      newcard = pick(deck);
    }
    gid("temp").src = "images/" + card_images[newcard];
    chosen = newcard;
    if (newcard < decks[2]) { back = deck; mode = "choose"; }
    else if (newcard == decks[4]) { mode = "remove"; }
    else { mode = "affect"; affected = true; }
  }
}

//----- Place a Card -------------------------------------------------------------

function choose(num, grp) {
  var curslot = gid("slot" + num);
  if (((mode == "choose")&&(slots[num] == ""))&&(status[grp] != "Full")) {
    switch (chosen) {
      case 12:
        status[grp] = "Full";
        updategui();
        if (!msg_use[8]) { msg_img[8] = char_img[grp]; show_msg(8); }
        break;
      case 13:
        status[grp] = "Hung Over";
        updategui();
        if (!msg_use[12]) { msg_img[12] = char_img[grp]; show_msg(12); }
        break;
      case 14:
        status[grp] = "Smoky";
        updategui();
        if (!msg_use[13]) { msg_img[13] = char_img[grp]; show_msg(13); }
        break;
    }
    if (status[grp] == "Blind") {
      curslot.src = "images/" + deck_back[back];
    } else {
      curslot.src = "images/" + card_images[chosen];
    }
    gid("temp").src = "images/outline.png";
    slots[num] = card_values[chosen];
    evalscore(grp);
    mode = "draw";
    if (checkall(grp)) {tally(grp); }
    if (!msg_use[4]) { challenge(); gid("bonus0").style.display = "none"; show_msg(4); }
  } else if ((mode == "remove") && (slots[num] != "")) {
    if ((curslot.src == "images/or_sand.png") && (status[grp] == "Full")) { status[grp] = "OK"; updategui(); }
    if ((curslot.src == "images/or_wine.png") && (status[grp] == "Hung Over")) { status[grp] = "OK"; updategui(); }
    if ((curslot.src == "images/or_gar.png") && (status[grp] == "Smoky")) { status[grp] = "OK"; updategui(); }
    gid("temp").src = "images/outline.png";
    curslot.src = "images/outline.png";
    slots[num] = "";
    evalscore(grp);
    mode = "draw";
  }
}

//----- Check if Cards Filled ----------------------------------------------------

function checkall(which) {
  var a = true;
  for (i = group_a[which]; i <= group_b[which]; i++) {
    if (slots[i] == "") { a = false; }
  }
  return a;
}

//----- Switch Order of Ops or Linear Math ---------------------------------------

function switchooo(){ 
  ooo = !ooo;
  gid("temp").src = "images/outline.png";
  mode = "draw";
  points = 0; draws[1] = 0; draws[2] = 0;
  updategui();
  clear(0);
  for (k=1; k<group_a.length; k++) {
    tries[k] = 0; clear(k);
  }
  gid("mathstyle").src = ooo ? "images/ooo.png" : "images/linear.png";
}

//----- Evaluate the Current Score -----------------------------------------------

function evalscore(which) {
  var displayscore = "";
  if (status[which] == "Hung Over") {
    score = randint(-5000,5000);
  } else {
    var parens = group_b[which] - group_a[which] + 1;
    var scorestring = "score[" + which + "] = ";
    if (ooo == false) { scorestring += (new Array(parens + 1)).join("("); }
    scorestring += "0";
    for (i = group_a[which]; i <= group_b[which]; i++) {
      scorestring += slots[i];
      if (ooo == false) { scorestring += ")"; }
    }
    eval(scorestring);
  }
  if (status[which] == "Smoky") { displayscore = "???"; }
    else { displayscore = score[which]; }
  gid("current" + which).innerHTML = displayscore;
}

//----- Check Answer and Set Score -----------------------------------------------

function tally(which) {
  var addpts = 0;
  hit = Math.abs(score[which] - goal[which]);
  if (status[which] == "Hung Over") { hit = yield[which] + 500; }
  if (hit == 0) {
    addpts = 10; scoreimg = "2";
    if (which == 0) { challenge(); }
    else {
      wd = randint(1,2);
      if ((!msg_use[2]) && (wd == 2)) { show_msg(2); }
      if ((!msg_use[3]) && (wd == 1)) { show_msg(3); }
      draws[wd]++;
      gid("bonus" + which).src = "images/" + card_images[wd+20];
      gid("bonus" + which).style.display = "inline";
    }
  } else if (hit <= yield[which]) {
    addpts = 5;
    scoreimg = "1";
  } else if ((status[which] == "Big Arms")&&(hit <= (yield[which]+25))) {
    addpts = 1;
    scoreimg = "s";
  } else {
    addpts = -1;
    scoreimg = "0";
  }
  if (status[which] == "Blind") { addpts *= 2; }
  points += addpts;
  if (which != 0) {
    tries[which]--;
    gid("tries" + which).innerHTML = tries[which];
  }
  gid("win" + which).src = "images/" + scoreimg + "star.png";
  gid("win" + which).style.display = "inline";
  newgame = which;
  updategui();
}

//----- Clear Card Group ---------------------------------------------------------

function clear(which) {
  for (i = group_a[which]; i <= group_b[which]; i++) {
    gid("slot" + i).src = "images/outline.png";
    slots[i] = "";
  }
  gid("win" + which).style.display = "none";
  gid("bonus" + which).style.display = "none";
  gid("current" + which).innerHTML = "0";
  setgoal(which);
  newgame = -1;
  if ((tries[which] < 1)&&(which > 0)) { gid("slotgrp" + which).style.display = "none"; }
  status[which] = "OK";
  gid("stat" + which).innerHTML = "OK";
}

//----- Goal Setting -------------------------------------------------------------

function setgoal(which) { goal[which] = eval(goalstr[which]); gid("goalbox" + which).innerHTML = goal[which]; }

//----- Green Card Usage ---------------------------------------------------------

function grncard(grp) {
  if (mode == "affect") {
    status[grp] = card_values[chosen];
    gid("stat" + grp).innerHTML = status[grp];
    gid("temp").src = "images/outline.png";
    if ((!msg_use[5])&&(status[grp] == "Big Arms")) { msg_img[5] = char_img[grp]; show_msg(5); }
    if ((!msg_use[6])&&(status[grp] == "Blind")) { msg_img[6] = char_img[grp]; show_msg(6); }
    mode = "draw";
  } 
}

//----- Bonus Card Draw ----------------------------------------------------------

function bonuscard() {
  if (mode == "bonus") {
    newcard = pick(3);
    gid("bonus0").src = "images/" + card_images[newcard];
    bc = draws[1];
    gc = draws[2];
    eval(card_values[newcard]);
    if ((!msg_use[2]) && (gc != draws[2])) { show_msg(2); }
    if ((!msg_use[3]) && (bc != draws[1])) { show_msg(3); }
    mode = "draw";
    updategui();
  }
}

//----- Update GUI --- + --- Preloader Script ------------------------------------

function updategui() {
  gid("draws1").innerHTML = draws[1];
    if (draws[1] > 0) { gid("pile1").src = "images/bl_deck.png"; }
    else { gid("pile1").src = "images/outline.png"; }
  gid("draws2").innerHTML = draws[2];
    if (draws[2] > 0) { gid("pile2").src = "images/gr_deck.png"; }
    else { gid("pile2").src = "images/outline.png"; }
  gid("score").innerHTML = points;
  for(p=0;p<yield.length;p++) {
    gid("stat" + p).innerHTML = status[p];
  }
}

function preload() {
  for (p=0; p < card_images.length; p++) {
    gid("preloadb").innerHTML += "<img src=\"images/" + card_images[p] + "\" alt=\"Preload\" />";
  }
}

//----- Bear Minigame Stuff ------------------------------------------------------

var beartries = -1;

function playbeargame() {
  beartries = 10;
  gid("beargame").style.display = "block";
  totalweight[3] -= 3; card_weight[25] -= 3;
  totalweight[0] += 3; card_weight[12] += 3;
  if (!msg_use[7]) { show_msg(7); }
  updategui();
}

function bearplay() {
  if (mode == "choose") {
    beartries -= 1;
    gid("beartries").innerHTML = beartries;
    gid("bearslot").src = "images/" + card_images[chosen];
    gid("temp").src = "images/outline.png";
    if (chosen == 12) {
      gid("bearwin").src = "2star.png";
      gid("bearcurrent").innerHTML = "Sandwich";
      points += 10;
    } else {
      gid("bearwin").src = "0star.png";
      gid("bearcurrent").innerHTML = "Not Sandwich";
      points--;
    }
    updategui();
    mode = "draw";
  } 
}
//----- Ace Minigame Stuff ------------------------------------------------------

var acecards = 0;
var acewon = true;

function playacegame() {
  acewon = true;
  acecards = 0;
  for (p=0; p<5; p++) { gid("aceslot" + p).src = "images/outline.png"; }
  gid("acegame").style.display = "block";
  totalweight[3] -= 3; card_weight[26] -= 3;
  totalweight[0] += 6; card_weight[13] += 3; card_weight[14] += 3;
  if (!msg_use[10]) { show_msg(10); }
  updategui();
}

function aceplay() {
  if (mode == "choose") {
    if (chosen == decks[4]) {
      show_msg(11);
    } else {
      gid("aceslot" + acecards).src = "images/" + card_images[chosen];
      gid("temp").src = "images/outline.png";
      if ((chosen != 13)&&(chosen != 14)) { acewon = false; }
      acecards++;
      updategui();
      mode = "draw";
    }
  } else if (mode == "remove") { show_msg(11); }
}
