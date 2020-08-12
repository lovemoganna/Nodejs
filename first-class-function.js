// 头等函数

// 当函数可被当作变量使用的时候，则称为这个函数作为头等函数。

const makeSaluteClass = term =>
class {
  constructor(x) {
    this.x = x;
  }
  salute(y) {
    console.log(`${this.x} says "${term}" to ${y}`);
  }
};

const Spanish = makeSaluteClass("HOLA");

new Spanish("ALFA").salute("BETA"); // ALFA says "HOLA" to BETA

new (makeSaluteClass("HELLO"))("GAMMA").salute("DELTA"); // GAMMA says "HELLO" to DELTA

const fullSalute = (c, x, y) => new c(x).salute(y);

const French = makeSaluteClass("BON JOUR"); 

fullSalute(French, "EPSILON", "ZETA"); // EPSILON says "BON JOUR" to ZETA

// 1. makeSaluteClass("BON JOUR") , "EPSILON" , "ZETA"
// 2. makeSaluteClass("EPSILON").salute("ZETA")
// 3. EPSILON says "BON JOUR" to ZETA
