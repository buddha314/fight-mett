
class Threat {
  constructor() {
    this.threatId;
    this.threatName;
    this.threatDistance;
    this.threatWeapons;
    this.threatIntimidation;
    this.threatScore;
  }
};


main()

async function main() {


  let fight = game.combats.combats[0]
  let me = fight.combatant
  let meWeapons = me.actor.data.items.filter((x) => ["weapon", "spell"].includes(x.type))
  let enemies = identifyEnemies(me)
  let friends = fight.combatants.filter((x) => x.actor.data.type === me.actor.data.type)

  console.log("\n" + me.name.toUpperCase() + " is fighting now, shut up.")
  for (const e of enemies) {
     let d =  Math.floor(Math.sqrt(Math.pow(me.token.x - e.token.x, 2) + Math.pow(me.token.y-e.token.y,2)) / 50) * 5
     console.log('Enemy ' + e.name + ' is at (' + e.token.x + ',' + e.token.y + '): ' + d)
     let threat = evaluateThreat(e,d);
     console.log('   threat level: ' + threat.threatScore)
     for (const w of meWeapons) {
        if (w.data.range.value >= d) {
           console.log("   I can hit with " + w.name)
        }
     }
  }
  for (const e of friends) {
     console.log('Friend ' + e.name + ' is at (' + e.token.x + ',' + e.token.y + ')')
  }

}

function identifyEnemies(me) {
  let enemies = fight.combatants.filter((x) => x.actor.data.type != me.actor.data.type)
  return enemies
}

// Begin to evaluate the opponents threat level
function evaluateThreat(opponent, distance) {
  let threat = new Threat();
  threat.threatIntimidation = opponent.actor.data.data.skills.itm.total
  threat.threatDistance = distance;
  threat.threatScore = threat.threatIntimidation
  threat.threatWeapons = opponent.actor.data.items.filter((x) => ["weapon", "spell"].includes(x.type) &&  x.data.range.value >= distance)

  return threat
}
