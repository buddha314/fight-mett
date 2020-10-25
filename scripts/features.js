class CombatFeature {
  constructor(obj) {
    this.name = obj["name"];
    this.description = obj["description"];
    this.sophistication = obj['sophistication']
    this.sophisticationAttribute = obj['sophisticationAttribute']
    this.calc = obj['calc'];
  }
  evaluate(combat, me, you) {
    return eval(this.calc);
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
    "calc":"you.combatant.actor.data.data.skills.itm.total"
  }))

  allFeatures.push(new CombatFeature(
    {
      "name":"inMeleeWithMe",
      "description":"Is the opponent actively hitting me with a melee weapon?",
      "sophistication": -4,
      "sophisticationAttribute":"me.combatant.actor.data.data.skills.inv.total",
      "calc":"new Roll('d20').roll().total + you.combatant.actor.data.data.skills.itm.total"
    }))
  allFeatures.push(new CombatFeature({
      "name":"alliesSurrenduring",
      "description":"Detect if your allies are still in the fight. This is determined by at least 50% still alive / engaged.  Not sure how to define this one yet, so just rolling a die.",
      "sophistication": 1,
      "sophisticationAttribute":"me.combatant.actor.data.data.skills.prc.total",
      "calc":"new Roll('d20').roll().total"
    }))

  //console.log(allFeatures)
  return allFeatures
}
