class Agent {
  constructor(combatant) {
    this.combatant = combatant;
    this.enemies = [];
    this.features = [];
  }
  identifyEnemies(combat) {
     this.enemies = combat.combatants.filter((x) => x.actor.data.type != this.combatant.actor.data.type)
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
    console.log(this.features)
  }
}

Hooks.on("createCombat", (combat, data, id) => {
  console.log("FIGHT ME MOTHERFUCKER!!")
}) ;

Hooks.on("updateCombat", (combat, turn, diff, id) => {
  console.log("Now fighting: " + combat.combatant.name)
  //let me = combat.combatant
  let me = new Agent(combat.combatant)
  //let enemies = identifyEnemies(combat, me)
  //let you = pickEnemy(combat, me, enemies)
  me.identifyEnemies(combat)
  me.identifyFeatures()
  let you = pickEnemy(combat, me)
  // This is automatically included from the module
  chirp(combat, me, you)
})


function pickEnemy(combat, me) {
    //let you = enemies[(Math.floor(Math.random() * enemies.length))]
    let scores = me.enemies.map((x) => evaluateThreat(combat, me, x))
    //let you = enemies[scores.indexOf(Math.max(...scores))]
    let you = new Agent(me.enemies[scores.indexOf(Math.max(...scores))])
    return you
}

function evaluateThreat(combat, me, you) {
    // 'you' is not an Agent yet
    let score = you.actor.data.data.skills.itm.total
    let r = new Roll('d20')
    score += r.roll().total
    console.log("Threat score for " + you.name + ": " + score)
    return score
}


function findDistance(me, you) {
  let d =  Math.floor(Math.sqrt(Math.pow(me.token.x - you.token.x, 2) + Math.pow(me.token.y-you.token.y,2)) / 50) * 5
  return d;
}
