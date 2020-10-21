Hooks.on("ready", function() {
  console.log("Ready from the Fight MeTT features.js file")
})


Hooks.on("createCombat", (combat, data, id) => {
  console.log("FIGHT ME MOTHERFUCKER!!")
}) ;
