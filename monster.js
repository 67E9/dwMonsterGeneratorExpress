exports.monGen = function() {

    const dice = ["w4", "W6", "W8", "W10", "W12", "W20"];


    class Monster {
      constructor(name, tags, atkName, atkDmg, atkRange, atkTag, hp, armor, specialTags, instinct, moves) {
        this.name = name;
        this.tags = tags;
        this.atkDmg = atkDmg;
        this.atkRange = atkRange;
        this.atkTag = atkTag;
        this.hp = hp;
        this.armor = armor;
        this.specialTags = specialTags;
        this.instinct = instinct;
        this.moves = moves;
      }

      input() {
        this.name = req.body.monsterNameInput; //done
        this.tags = getTags(); //done
        this.atkName = req.body.atkTypeInput; //done
        this.atkDmg = getAtkDmg(); //done
        this.atkRange = getAtkRange(); //done
        this.atkTag = getAtkTag(); //done
        this.hp = getHp(); //done
        this.armor = getArmor(); //done
        this.specialTags = getSpecialTags(); //done
        this.instinct = req.body.instinctInput; //done
        this.moves = getMoves(); //returns array!
      }

      function getTags() {
        let tags = "";

        if (req.body.grpRadio1 === "on") {
          tags = tags + "Horde";
        } else if (req.body.grpRadio2 === "on") {
          tags = tags + "Gruppe";
        } else if (req.body.grpRadio3 === "on") {
          tags = tags + "Einzelgänger";
        }

        if (req.body.sizRadio1 === "on") {
          tags = tags + ", Winzig";
        } else if (req.body.sizRadio2 === "on") {
          tags = tags + ", Klein";
        } else if (req.body.sizRadio3 === "on") {
          tags = tags + "";
        } else if (req.body.sizRadio4 === "on") {
          tags = tags + ", Groß";
        } else if (req.body.sizRadio5 === "on") {
          tags = tags + ", Riesig";
        }

        if (req.body.defRadio5 === "on") {
          tags = tags + ", Magisch";
        }

        if (req.body.godsCheck === "on") {
          tags = tags + ", Göttlich";
        }

        if (req.body.defRadio5 !== "on") && (req.body.magicCheck === "on") {
          tags = tags + ", Magisch";
        }

        if (req.body.deceitfulCheck === "on") {
          tags = tags + ", Verschlagen";
        }

        if (req.body.grpCheck === "on") {
          tags = tags + ", Organisiert";
        }

        if (req.body.intelCheck === "on") {
          tags = tags + ", Intelligent";
        }

        if (req.body.shieldCheck === "on") {
          tags = tags + ", Vorsichtig";
        }

        if (req.body.hoardCheck === "on")) {
          tags = tags + ", Sammler";
        }

        if (req.body.externarCheck" === "on") {
          tags = tags + ", Externar";
        }

        if (req.body.terribleCheck === "on") {
          tags = tags + ", Furchterregend";
        }

        if (req.body.amorphousCheck === "on") {
          tags = tags + ", Amorph";
        }
        return tags
      }

      function getAtkDmg() {

        let diceNum = 0;
        // number in array associated with correct die
        //1=D4, 2=D6 3=D8 4=D10 5=D12 6=D20
        let dmgBonus = 0;
        let doubleDmg = 0;
        // if doubleDmg > 0: better of 2 dice
        // if doubleDmg < 0: worse of 2 dice

        if (req.body.grpRadio1 === "on") {
          diceNum = 2;
        } else if (req.body.grpRadio2 === "on") {
          diceNum = 3;
        } else if (req.body.grpRadio3 === "on") {
          diceNum = 4;
        }

        if (req.body.sizRadio1 === "on") {
          dmgBonus -= 2;
        } else if (req.body.sizRadio4 === "on") {
          dmgBonus += 1;
        } else if (req.body.sizRadio5" === "on") {
          dmgBonus += 3;
        }

        if (req.body.strCheck === "on") {
          dmgBonus += 2;
        }

        if (req.body.skilledAtkCheck === "on") {
          doubleDmg += 1;
        }

        if (req.body.godsCheck === "on" && (req.body.godsRadio1 === "on" || req.body.godsRadio3 === "on")){
          dmgBonus += 2;
        }

        if (req.body.cruelWeaponCheck === "on") {
          dmgBonus += 2;
        }

        if (req.body.smallWeaponCheck === "on") {
          diceNum -= 1;
        }

        if (req.body.deceitfulCheck === "on") {
          diceNum -= 1;
        }

        if (req.body.oldCheck === "on") {
          diceNum += 1;
        }

        if (req.body.pacifistCheck === "on") {
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

      function getAtkRange() {
        let hand = false;
        let close = false;
        let reach = false;
        let short = false;
        let long = false;
        let range = ""

        if (req.body.sizRadio1 === "on") {
          hand = true;
        } else if (req.body.sizRadio2 === "on" || req.body.sizRadio3 === "on") {
          close = true;
        } else if (req.body.sizRadio4 === "on") {
          close = true;
          reach = true;
        } else if (req.body.sizRadio5 === "on") {
          reach = true;
        }

        if (req.body.distanceWeaponCheck === "on") {
          reach = true;
        }

        if (req.body.rangedCheck === "on") {
          if (req.body.rangedRadio1 === "on") || req.body.rangedRadio3 === "on") {
            short = true;
          }
          if (req.body.rangedRadio2 === "on" || $(req.body.rangedRadio3 === "on") {
            long = true;
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

      function getAtkTag() {
        let atkTags = "";
        let piercing = 0;
        let str = false;
        let ignore = false;

        if (req.body.strCheck === "on") {
          str = true;
        }

        if (req.body.deftStrikeCheck === "on") {
          piercing += 1;
        }

        if (req.body.metalCheck === "on") {
          if (req.body.metalRadio1 === "on") {
            piercing += 1;
          }
          if (req.body.metalRadio2 === "on") {
            piercing += 3;
          }
        }

        if (req.body.ignoreWeaponCheck === "on") {
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

      function getHp() {
        let hp = 0

        if ($(req.body.grpRadio1 === "on") {
          hp = 3;
        } else if (req.body.grpRadio2 === "on") {
          hp = 6;
        } else if (req.body.grpRadio3 === "on") {
          hp = 12;
        }

        if (req.body.sizRadio4 === "on") {
          hp += 4;
        } else if (req.body.sizRadio5 === "on") {
          hp += 8;
        }

        if (req.body.endurCheck === "on") {
          hp += 4;
        }

        if (req.body.godsCheck === "on" && (req.body.godsRadio2 === "on" || req.body.godsRadio3 === "on")) {
          hp += 2;
        }

        if (req.body.unliveCheck === "on") {
          hp += 4;
        }

        if (req.body.amorphousCheck === "on") {
          hp += 3;
        }

        return hp;
      }

      function getArmor() {
        let arm = 0;

        if ($(req.body.defRadio2 === "on") {
          arm += 1;
        } else if (req.body.defRadio3 === "on") {
          arm += 2;
        } else if (req.body.defRadio4 === "on") {
          arm += 3;
        } else if (req.body.defRadio5 === "on") {
          arm += 4;
        }

        if ($(req.body.skilledDefCheck === "on") {
          arm += 1;
        }

        if (req.body.shieldCheck === "on") {
          arm += 1;
        }

        if (req.body.amorphousCheck === "on") {
          arm += 1;
        }

        return arm;
      }

      function getSpecialTags() {
        let spec = "";

        if (req.body.adaptationCheck === "on") {
          spec = spec + ", " + req.body.adaptationInput;
        }

        if (req.body.constructCheck === "on") {
          if (req.body.constructInput1 !== "") {
            spec = spec + ", " + req.body.constructInput1;
          }
          if (req.body.constructInput2 !== "") {
            spec = spec + ", " + req.body.constructInput2;
          }
        }

        if (req.body.terribleCheck === "on") {
          spec = spec + ", " + req.body.terribleInput;
        }

        spec = spec.slice(2);
        return spec;
      }

      function getMoves() {
        let mov = [];

        mov.push(req.body.instinctInput)
        //add first move to array mov

        const othMov = ["trickery", "magic", "deceitful", "grp", "externar"];

        for (let y of othMov) {
          if ("req.body." + y + "Check) === 'on'") {
            mov.push("req.body." + y + "Input");
          }
        }
        //add further moves from html to array mov

        return mov; //returns array
      }
      //
      // function checkEmpty() {
      //   missing = "";
      //
      //   missing = checkAlwaysOnTexts() + checkCheckedTexts()
      //
      //   //add all missing input field tag names to string "missing"
      //   //use for loops on the 4 arrays for types of inputs
      //   //make helper functions to check for these
      //
      //   console.log("empty fields: " + missing)
      //   if (missing !== "") {
      //     return true;
      //   } else {
      //     return false;
      //   }
      //   //returns false if a required field is not filled
      // }
      //
      // function checkAlwaysOnTexts() {
      //   let missing = "";
      //   var alwaysOnTexts = ["#moveInput", "#instinctInput", "#atkTypeInput", "#monsterNameInput"];
      //   for (let x of alwaysOnTexts) {
      //     if ($(x).val() === "") {
      //       missing = missing + x + ", ";
      //     }
      //   }
      //   return missing
      // }
      //
      // function checkCheckedTexts() {
      //   let missing = "";
      //   var checkedTexts = ["#trickery", "#adaptation", "#magic", "#deceitful", "#grp", "#externar", "#construct", "#terrible"];
      //   //to be used with +"Check" AND +"Input"
      //   for (let x of checkedTexts) {
      //     if ($(x + "Check").prop("checked")) {
      //       if (x === "#construct" && $("#constructInput1").val() === "" && $("#constructInput2").val() === "") {
      //         missing = missing + x + "Input" + ", ";
      //       } else if ($(x + "Input").val() === "") {
      //         missing = missing + x + "Input" + ", ";
      //       }
      //     }
      //   }
      //   return missing
      // }
      //
    }
