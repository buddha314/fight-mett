class Agent {
  constructor(combatant) {
    this.combatant = combatant;
    this.enemies = []
  }
  identifyEnemies(combat) {
     this.enemies = combat.combatants.filter((x) => x.actor.data.type != this.combatant.actor.data.type)
  }
}

class CombatInteraction {
  constructor(you, json) {
    this.you = you;
  }
}

class CombatFeature {
  constructor(json) {
    this.name = json.name;
    this.calc = json.calc;
  }
  evaluate(combat, me, you) {
    return eval(this.calc);
  }
}

inMelee = {
  'name':'inMeleeWithMe',
  'description':"Is the opponent actively hitting me with a melee weapon?"
  'sophistication': -4,
  'sophisticationAttribute':'me.combatant.actor.data.data.skills.inv.total',
  'calc':"new Roll('d20').roll().total + you.combatant.actor.data.data.skills.itm.total"
}

isIntimidating = {
  'name':'isIntimidating',
  'description':"Does the opponent have a high intimidation skill",
  'sophistication': -2,
  'sophisticationAttribute':'me.combatant.actor.data.data.skills.wis.total',
  'calc':"you.combatant.actor.data.data.skills.itm.total"
}

alliesSurrenduring = {
  'name':'alliesSurrenduring',
  'description':'Detect if your allies are still in the fight. This is determined by at least 50% still alive / engaged.  Not sure how to define this one yet, so just rolling a die.',
  'sophistication': 1,
  'sophisticationAttribute':'me.combatant.actor.data.data.skills.wis.total',
  'calc':"new Roll('d20').roll().total'
}

let fight = game.combats.combats[0]
let me = new Agent(fight.combatant)
me.identifyEnemies(fight);

let you = new Agent(fight.combatants[3])

let cf = new CombatFeature(obj);
cf.name

cf.evaluate(fight, me, you)

for (let k of game.combats.keys()) {
  console.log("Key " + k +  " is active " + game.combats.get(k).data.active)
}

// Get the first active combat
let fight = game.combats.filter((x) => x.data.active === true)[0]
