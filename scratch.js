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

let fight = game.combats.combats[0]
let me = new Agent(fight.combatant)
me.identifyEnemies(fight);

let you = new Agent(fight.combatants[3])

let cf = new CombatFeature(obj);
cf.name

cf.evaluate(fight, me, you)
