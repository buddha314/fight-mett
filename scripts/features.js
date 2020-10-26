class CombatFeature {
  constructor(obj) {
    this.name = obj["name"];
    this.description = obj["description"];
    this.sophistication = obj['sophistication']
    this.sophisticationAttribute = obj['sophisticationAttribute']
    this.calc = obj['calc'];
  }
  evaluate(combat, me, you) {
    //return eval(this.calc);
    let s = `${this.calc}`
    //console.log("s: " + s)
    let x = window[s](combat, me, you)
    return x
  }
}


Hooks.on("ready", function() {
  console.log("Ready from the Fight MeTT features.js file")
})


function getAllFeatures() {
  var allFeatures = []
  allFeatures.push(new CombatFeature({
    "name":"isIntimidating",
    "description":"Does the opponent have a high intimidation skill",
    "sophistication": -2,
    "sophisticationAttribute":"me.combatant.actor.data.data.skills.prc.total",
    "calc":"getOpponentIntimidation"
  }))

  allFeatures.push(new CombatFeature(
    {
      "name":"inMeleeWithMe",
      "description":"Is the opponent actively hitting me with a melee weapon?",
      "sophistication": -4,
      "sophisticationAttribute":"me.combatant.actor.data.data.skills.inv.total",
      "calc":"getOpponentIntimidation"
    }))
  allFeatures.push(new CombatFeature({
      "name":"alliesSurrenduring",
      "description":"Detect if your allies are still in the fight. This is determined by at least 50% still alive / engaged.  Not sure how to define this one yet, so just rolling a die.",
      "sophistication": 1,
      "sophisticationAttribute":"me.combatant.actor.data.data.skills.prc.total",
      "calc":"getAlliesSurrenduringScore"
    }))
    allFeatures.push(new CombatFeature({
        "name":"naiveDistance",
        "description":"Number of squares closer/further to 30. 5 points for right next to you, 0 for 30 feet away.",
        "sophistication": 0,
        "sophisticationAttribute":"me.combatant.actor.data.data.skills.prc.total",
        "calc":"distanceThreat30"
      }))

  //console.log(allFeatures)
  return allFeatures
}

function distanceThreat30(combat, me, you) {
  var d = findDistance(combat, me, you)
  var t = Math.floor((30-d)/5)
  //console.log("  ** Distance / threat: " + d + "/" + t)
  return t
}

function getOpponentIntimidation(combat, me, you) {
  return you.combatant.actor.data.data.skills.itm.total
}

function getAlliesSurrenduringScore(combat, me, you) {
  return 2;
}
