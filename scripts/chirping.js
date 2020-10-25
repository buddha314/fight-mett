const allchirps = [`Hey ${you.combatant.actor.name} you shoulda stayed on the bench! Bender!`, 'insert witty comment here'];

async function chirp(combat, me, you) {
  let x = new ChatBubbles();
  msg = await getChirp(combat, me, you)
  //console.log(msg)
  await x.say(me.combatant.token, msg, true)
  return
}

async function getChirp(combat, me, you) {
const allchirps = [`Hey ${you.combatant.actor.name} you shoulda stayed on the bench! Bender!`, 'insert witty comment here'];
    //msg = await `Hey ${you.combatant.actor.name} you shoulda stayed on the bench! Bender!`
    msg = allchirps[Math.floor(Math.random() * allchirps.length)];
    return msg
}
