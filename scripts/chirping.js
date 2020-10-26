async function chirp(combat, me, you) {
  let x = new ChatBubbles();
  msg = await getChirp(combat, me, you)
  //console.log(msg)
  await x.say(me.combatant.token, msg, true)
  return
}

async function getChirp(combat, me, you) {
   console.log("you in getChirp: ")
   console.log(you)
   const allchirps = [`Hey ${you.combatant.actor.name} you shoulda stayed on the bench! Bender!`,
      `${you.combatant.actor.name} is using a stick to hide their fragile masculinity. What a loser.`,
      `Hey look everyone, its ${you.combatant.actor.name}! Get 'em!`,
      `*points and laughs at ${you.combatant.actor.name}*`,
      `Once Im done with you, Ill find your loved ones, ${you.combatant.actor.name}!`,
      `I wont miss this time, ${you.combatant.actor.name}!`];
   msg = allchirps[Math.floor(Math.random() * allchirps.length)];
   return msg
}
