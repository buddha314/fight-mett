class CombatFeature {
  constructor(json) {
    this.name = json.name;
    this.calc = json.calc;
  }
  evaluate(combat, me, you) {
    return eval(this.calc);
  }
}


Hooks.on("ready", function() {
  console.log("Ready from the Fight MeTT features.js file")
})


function getAllFeatures() {
  let allFeatures = {"allFeatures":[
    {
      "name":"inMeleeWithMe",
      "description":"Is the opponent actively hitting me with a melee weapon?",
      "sophistication": -4,
      "sophisticationAttribute":"me.combatant.actor.data.data.skills.inv.total",
      "calc":"new Roll('d20').roll().total + you.combatant.actor.data.data.skills.itm.total"
    },{
      "name":"isIntimidating",
      "description":"Does the opponent have a high intimidation skill",
      "sophistication": -2,
      "sophisticationAttribute":"me.combatant.actor.data.data.skills.wis.total",
      "calc":"you.combatant.actor.data.data.skills.itm.total"
    }, {
      "name":"alliesSurrenduring",
      "description":"Detect if your allies are still in the fight. This is determined by at least 50% still alive / engaged.  Not sure how to define this one yet, so just rolling a die.",
      "sophistication": 1,
      "sophisticationAttribute":"me.combatant.actor.data.data.skills.wis.total",
      "calc":"new Roll('d20').roll().total"
    }
  ]}
  return allFeatures
}
