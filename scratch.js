class CombatFeature {
  constructor(json) {
    this.name = json.name;
    this.calc = json.calc;
  }
  evaluate(combat, me, you) {
    return eval(this.calc);
  }
}

obj = {
  'name':'inMeleeWithMe',
  'calc':"new Roll('d20').roll().total"
}

let cf = new CombatFeature(obj);
cf.name
cf.evaluate({},{}, {})
