
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

class CombatFeature {
  constructor(json) {
    this.name = json.name;
  }
}


main()
async function main() {

  let fight = game.combats.combats[0]
  let me = fight.combatant
  let meWeapons = me.actor.data.items.filter((x) => ["weapon", "spell"].includes(x.type))
  let enemies = identifyEnemies(me)
  let friends = fight.combatants.filter((x) => x.actor.data.type === me.actor.data.type)

  console.log("\n" + me.name.toUpperCase() + " is fighting now, shut up.")
  // https://foundryvtt.com/api/Dialog.html
  ChatMessage.create({
    speaker: {alias: me.actor.name},
    content: '<p>Im talking now</p>'
  })
  let threats = enemies.map((x) => evaluateThreat(me, x));
  console.log(threats);
  let dialog = buildThreatMatrixDialog(me, threats);
  dialog.render(true)

  for (const e of enemies) {
     //let d =  Math.floor(Math.sqrt(Math.pow(me.token.x - e.token.x, 2) + Math.pow(me.token.y-e.token.y,2)) / 50) * 5
     //console.log('Enemy ' + e.name + ' is at (' + e.token.x + ',' + e.token.y + '): ' + d)
     //let threat = evaluateThreat(e,d);

     //console.log('   threat level: ' + threat.threatScore)
     //for (const w of meWeapons) {
    //    if (w.data.range.value >= d) {
    //       console.log("   I can hit with " + w.name)
    //    }
     //}
  }
  for (const e of friends) {
     console.log('Friend ' + e.name + ' is at (' + e.token.x + ',' + e.token.y + ')')
  }

}

function buildThreatMatrixDialog(me, threats) {
  let content = `<div><table><thead>
    <th>Name</th>
    <th>Score</th>
    <th>D</th>
    <th>Weapons</th>
    </thead><tbody>`
  for (const e of threats) {
    let weps = e.threatWeapons.map((x) => x.name)
    let threatRowHTML = `<tr>
      <td>${e.threatName}</td>
      <td>${e.threatScore}</td>
      <td>${e.threatDistance}</td>
      <td>${weps}</td>
      <tr>`
    content += threatRowHTML;
  }
  content += "</tbody></table></div>"
  //console.log(content);
  let dialog = new Dialog({
    title:`Threat Matrix for ${me.actor.name}`,
    content: content,
    buttons: {},
    close: () => console.log("Closing threat matrix for " + me.actor.name)
  })
  return dialog;
}

function findDistance(me, you) {
  let d =  Math.floor(Math.sqrt(Math.pow(me.token.x - you.token.x, 2) + Math.pow(me.token.y-you.token.y,2)) / 50) * 5
  return d;
}

function identifyEnemies(me) {
  let enemies = fight.combatants.filter((x) => x.actor.data.type != me.actor.data.type)
  // This is an array of combatants
  return enemies
}

// Begin to evaluate the opponents threat level
function evaluateThreat(me, you) {
  let distance = findDistance(me, you);
  let threat = new Threat();
  threat.threatName = you.actor.name
  threat.threatIntimidation = you.actor.data.data.skills.itm.total
  threat.threatDistance = distance;
  threat.threatScore = threat.threatIntimidation
  threat.threatWeapons = you.actor.data.items.filter((x) => ["weapon", "spell"].includes(x.type) &&  x.data.range.value >= distance)

  return threat
}
