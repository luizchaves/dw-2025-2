import Math, { sum } from './lib.js';
import { chain } from 'mathjs';

console.log(Math.sum(1, 2));
console.log(sum(1, 2));

// chaining
const result = chain(3)
  .add(4)
  .multiply(2)
  .done()

console.log(result); // 14
