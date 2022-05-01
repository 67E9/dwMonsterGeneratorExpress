const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}))
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', function(req, res) {
  res.render('index')
})

app.post('/', function(req, res) {
  // console.log(req.body);

  mon = new Monster

  mon.input(req.body)

  // console.log(mon)

  res.render('output', {
    monName: mon.name,
    monOrgSize: mon.tags,
    monAtkName: mon.atkName,
    dmg: mon.atkDmg,
    range: mon.atkRange,
    atkTags: mon.atkTag,
    monHp: mon.hp,
    monArm: mon.armor,
    monTags: mon.specialTags,
    instinct: mon. instinct,
    monMovs: mon.moves,
  })
})

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("listening on Port process.env.PORT || 3000")
})

//"process.env.PORT"||"3000"


// the monster generator himself:

const dice = ["w4", "W6", "W8", "W10", "W12", "W20"];


class Monster {
  constructor(name, tags, atkName, atkDmg, atkRange, atkTag, hp, armor, specialTags, instinct, moves) {
    this.name = name;
    this.tags = tags;
    this.atkName = atkName;
    this.atkDmg = atkDmg;
    this.atkRange = atkRange;
    this.atkTag = atkTag;
    this.hp = hp;
    this.armor = armor;
    this.specialTags = specialTags;
    this.instinct = instinct;
    this.moves = moves; //returns array
  }

  input(body) {
    this.name = body.monsterNameInput;
    this.tags = getTags(body);
    this.atkName = body.atkTypeInput;
    this.atkDmg = getAtkDmg(body);
    this.atkRange = getAtkRange(body);
    this.atkTag = getAtkTags(body);
    this.hp = getHp(body);
    this.armor = getArmor(body);
    this.specialTags = getSpecialTags(body);
    this.instinct = body.instinctInput;
    this.moves = getMoves(body); //returns array!
  }
};

function getTags(body) {
  let tags = "";

  if (body.grpRadio === "1") {
    tags = tags + "Horde";
  } else if (body.grpRadio === "2") {
    tags = tags + "Gruppe";
  } else if (body.grpRadio === "3") {
    tags = tags + "Einzelgänger";
  }

  if (body.sizRadio === "1") {
    tags = tags + ", Winzig";
  } else if (body.sizRadio === "2") {
    tags = tags + ", Klein";
  } else if (body.sizRadio === "3") {
    tags = tags + "";
  } else if (body.sizRadio === "4") {
    tags = tags + ", Groß";
  } else if (body.sizRadio === "5") {
    tags = tags + ", Riesig";
  }

  if (body.defRadio === "5") {
    tags = tags + ", Magisch";
  }

  if (body.godsCheck === "on") {
    tags = tags + ", Göttlich";
  }

  if (body.defRadio5 !== "on" && body.magicCheck === "on") {
    tags = tags + ", Magisch";
  }

  if (body.deceitfulCheck === "on") {
    tags = tags + ", Verschlagen";
  }

  if (body.grpCheck === "on") {
    tags = tags + ", Organisiert";
  }

  if (body.intelCheck === "on") {
    tags = tags + ", Intelligent";
  }

  if (body.shieldCheck === "on") {
    tags = tags + ", Vorsichtig";
  }

  if (body.hoardCheck === "on") {
    tags = tags + ", Sammler";
  }

  if (body.externarCheck === "on") {
    tags = tags + ", Externar";
  }

  if (body.terribleCheck === "on") {
    tags = tags + ", Furchterregend";
  }

  if (body.amorphousCheck === "on") {
    tags = tags + ", Amorph";
  }
  return tags
}

function getAtkDmg(body) {

  let diceNum = 0;
  // number in array associated with correct die
  //1=D4, 2=D6 3=D8 4=D10 5=D12 6=D20
  let dmgBonus = 0;
  let doubleDmg = 0;
  // if doubleDmg > 0: better of 2 dice
  // if doubleDmg < 0: worse of 2 dice

  if (body.grpRadio === "1") {
    diceNum = 2;
  } else if (body.grpRadio === "2") {
    diceNum = 3;
  } else if (body.grpRadio === "3") {
    diceNum = 4;
  }

  if (body.sizRadio === "1") {
    dmgBonus -= 2;
  } else if (body.sizRadio === "4") {
    dmgBonus += 1;
  } else if (body.sizRadio === "5") {
    dmgBonus += 3;
  }

  if (body.strCheck === "on") {
    dmgBonus += 2;
  }

  if (body.skilledAtkCheck === "on") {
    doubleDmg += 1;
  }

  if (body.godsCheck === "on" && (body.godsRadio === "1" || body.godsRadio === "3")) {
    dmgBonus += 2;
  }

  if (body.cruelWeaponCheck === "on") {
    dmgBonus += 2;
  }

  if (body.smallWeaponCheck === "on") {
    diceNum -= 1;
  }

  if (body.deceitfulCheck === "on") {
    diceNum -= 1;
  }

  if (body.oldCheck === "on") {
    diceNum += 1;
  }

  if (body.pacifistCheck === "on") {
    doubleDmg -= 1;
  }

  if (diceNum > 6) {
    diceNum = 6;
  } else if (diceNum < 1) {
    diceNum = 1;
  }
  //make sure DiceNum is min 1 max 6

  if (doubleDmg > 0) {
    var damage = "b[" + dice[diceNum - 1] + "]";
  } else if (doubleDmg < 0) {
    var damage = "s[" + dice[diceNum - 1] + "]";
  } else {
    var damage = dice[diceNum - 1];
  }

  if (dmgBonus > 0) {
    damage = damage + "+" + dmgBonus;
  } else if (dmgBonus < 0) {
    damage = damage + "-" + Math.abs(dmgBonus);
  }

  return damage
}

function getAtkRange(body) {
  let hand = false;
  let close = false;
  let reach = false;
  let short = false;
  let long = false;
  let range = ""

  if (body.sizRadio === "1") {
    hand = true;
  } else if (body.sizRadio === "2" || body.sizRadio === "3") {
    close = true;
  } else if (body.sizRadio === "4") {
    close = true;
    reach = true;
  } else if (body.sizRadio === "5") {
    reach = true;
  }

  if (body.distanceWeaponCheck === "on") {
    reach = true;
  }

  if (body.rangedCheck === "on") {
    if (body.rangedRadio === "1" || body.rangedRadio === "3") {
      short = true;
    }
    if (body.rangedRadio === "2" || body.rangedRadio === "3") {
      long = true;
    }
  }

  if (hand) {
    range = range + ", Hand";
  }
  if (close) {
    range = range + ", kurz";
  }
  if (reach) {
    range = range + ", lang"
  }
  if (short) {
    range = range + ", nah"
  }
  if (long) {
    range = range + ", fern";
  }
  return range;
}

function getAtkTags(body) {
  let atkTags = "";
  let piercing = 0;
  let str = false;
  let ignore = false;

  if (body.strCheck === "on") {
    str = true;
  }

  if (body.deftStrikeCheck === "on") {
    piercing += 1;
  }

  if (body.metalCheck === "on") {
    if (body.metalRadio === "1") {
      piercing += 1;
    }
    if (body.metalRadio === "2") {
      piercing += 3;
    }
  }

  if (body.ignoreWeaponCheck === "on") {
    ignore = true;
  }

  if (str) {
    atkTags = atkTags + ", wuchtig"
  }
  if (ignore) {
    atkTags = atkTags + ", ignoriert Rüstung"
  } else if (piercing > 0) {
    atkTags = atkTags + ", Durchdringung " + piercing;
  }

  return atkTags
}

function getHp(body) {
  let hp = 0

  if (body.grpRadio === "1") {
    hp = 3;
  } else if (body.grpRadio === "2") {
    hp = 6;
  } else if (body.grpRadio === "3") {
    hp = 12;
  }

  if (body.sizRadio === "4") {
    hp += 4;
  } else if (body.sizRadio === "5") {
    hp += 8;
  }

  if (body.endurCheck === "on") {
    hp += 4;
  }

  if (body.godsCheck === "on" && (body.godsRadio === "2" || body.godsRadio === "3")) {
    hp += 2;
  }

  if (body.unliveCheck === "on") {
    hp += 4;
  }

  if (body.amorphousCheck === "on") {
    hp += 3;
  }

  return hp;
}

function getArmor(body) {
  let arm = 0;

  if (body.defRadio === "2") {
    arm += 1;
  } else if (body.defRadio === "3") {
    arm += 2;
  } else if (body.defRadio === "4") {
    arm += 3;
  } else if (body.defRadio === "5") {
    arm += 4;
  }

  if (body.skilledDefCheck === "on") {
    arm += 1;
  }

  if (body.shieldCheck === "on") {
    arm += 1;
  }

  if (body.amorphousCheck === "on") {
    arm += 1;
  }

  return arm;
}

function getSpecialTags(body) {
  let spec = "";

  if (body.adaptationCheck === "on") {
    spec = spec + ", " + body.adaptationInput;
  }

  if (body.constructCheck === "on") {
    if (body.constructInput1 !== "") {
      spec = spec + ", " + body.constructInput1;
    }
    if (body.constructInput2 !== "") {
      spec = spec + ", " + body.constructInput2;
    }
  }

  if (body.terribleCheck === "on") {
    spec = spec + ", " + body.terribleInput;
  }

  spec = spec.slice(2);
  return spec;
}

function getMoves(body) {
  let mov = [];

  mov.push(body.moveInput)
  //add first move to array mov

  const othMov = ["trickery", "magic", "deceitful", "grp", "externar"];

  for (let y of othMov) {
    if ("body." + y + "Check) === 'on'") {
      mov.push(eval('body.' + y + 'Input'));
    }
  }

  return mov; //returns array
}
