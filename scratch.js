class Agent {
  constructor(combatant) {
    this.combatant = combatant;
  }
  identifyEnemies(combat) {
     this.enemies = combat.combatants.filter((x) => x.actor.data.type != this.combatant.actor.data.type)
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

obj = {
  'name':'inMeleeWithMe',
  'sophistication': -4,
  'sophisticationAttribute':'intelligence',
  'calc':"new Roll('d20').roll().total + you.combatant.actor.data.data.skills.itm.total"
}

let fight = game.combats.combats[0]
let me = new Agent(fight.combatant)
me.identifyEnemies(fight);

let you = new Agent(fight.combatants[3])

let cf = new CombatFeature(obj);
cf.name

cf.evaluate(fight, me, you)
