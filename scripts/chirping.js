async function chirp(combat, me, you) {
  let x = new ChatBubbles();
  msg = await getChirp(combat, me, you)
  //console.log(msg)
  await x.say(me.token, msg, true)
  return
}

async function getChirp(combat, me, you) {
    msg = await `Hey ${you.name} you shoulda stayed on the bench! Bender!`
    return msg
}
