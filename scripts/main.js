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
    let score = 0;
    //console.log("me: ")
    //console.log(me)
    for (const feature of me.features) {
      //console.log("you: ")
      //console.log(you)
      //console.log(feature.calc)
      //var x = feature.calc.replace('me', 'this')
      //console.log(x)
      score += feature.evaluate(combat, me, you)
    }
    //let score = you.actor.data.data.skills.itm.total
    let r = new Roll('d20')
    console.log('bonuses for ' + you.combatant.actor.name + ': ' + score)
    score += r.roll().total
    console.log("Threat score for " + you.combatant.actor.name + ": " + score)
    return score
}


function findDistance(combat, me, you) {
  //console.log("FINDING DISTANCE...?")
  //console.log("me in findDistance: ")
  //console.log(me)
  let d =  Math.floor(Math.sqrt(Math.pow(me.combatant.token.x - you.combatant.token.x, 2) + Math.pow(me.combatant.token.y-you.combatant.token.y,2)) / 50) * 5
  return d;
}
