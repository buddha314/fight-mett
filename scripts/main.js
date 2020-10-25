class Agent {
  constructor(combatant) {
    this.combatant = combatant;
    this.enemies = []
  }
  identifyEnemies(combat) {
     this.enemies = combat.combatants.filter((x) => x.actor.data.type != this.combatant.actor.data.type)
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
