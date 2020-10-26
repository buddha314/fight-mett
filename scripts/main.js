class Agent {
  constructor(combatant) {
    this.combatant = combatant;
    this.enemies = [];
    this.features = [];
  }
  identifyEnemies(combat) {
     //this.enemies = combat.combatants.filter((x) => x.actor.data.type != this.combatant.actor.data.type)
     this.enemies = combat.combatants.filter((x) => x.actor.data.type != this.combatant.actor.data.type).map((x) => new Agent(x))
  }
  identifyFeatures() {
    let features = getAllFeatures();
    for (let feature of features){
       var s = eval(feature.sophisticationAttribute.replace('me', 'this'))
       if (s >= feature.sophistication) {
         //console.log(s + " >= " + feature.sophistication)
         this.features.push(feature)
       }
    }
    //console.log(this.features)
  }
}

Hooks.on("createCombat", (combat, data, id) => {
  console.log("FIGHT ME MOTHERFUCKER!!")
}) ;

Hooks.on("updateCombat", (combat, turn, diff, id) => {
  console.log("Now fighting: " + combat.combatant.name)
  let me = new Agent(combat.combatant)
  me.identifyEnemies(combat)
  me.identifyFeatures()
  let you = pickEnemy(combat, me)
  // This is automatically included from the module
  chirp(combat, me, you)
})


function pickEnemy(combat, me) {
    let scores = me.enemies.map((x) => evaluateThreat(combat, me, x))
    let you = me.enemies[scores.indexOf(Math.max(...scores))]
    return you
}

function evaluateThreat(combat, me, you) {
    let score = 0;
    for (const feature of me.features) {
      score += feature.evaluate(combat, me, you)
    }
    //let score = you.actor.data.data.skills.itm.total
    let r = new Roll('d20')
    //console.log('bonuses for ' + you.combatant.actor.name + ': ' + score)
    score += r.roll().total
    //console.log("Threat score for " + you.combatant.actor.name + ": " + score)
    return score
}


function findDistance(combat, me, you) {
  let d =  Math.floor(Math.sqrt(Math.pow(me.combatant.token.x - you.combatant.token.x, 2) + Math.pow(me.combatant.token.y-you.combatant.token.y,2)) / 50) * 5
  return d;
}
