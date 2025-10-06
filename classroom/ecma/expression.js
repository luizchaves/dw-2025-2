// expression (literal, operadores, identificadores, keywords => value)
const x = 1 - 1;

// operator +
console.log(+"15"); // 15
console.log(1 + 1); // 2
console.log("1" + 1); // "11"

// ASI
console.log("Hello")
console.log("Hello");
let y; y = 1 + 1

// precedence, associativity
// table of precedence: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
console.log(1 + 2 * 3); // 7
console.log(1 / 2 * 3); // 1.5

// operator
// Arithmetic: + - * / % ** (=> Number)
console.log(2 ** 3);
console.log(11 / 2); // 5.5
console.log(parseInt(11 / 2)); // 5
console.log(Math.floor(11 / 2)); // 5
console.log(11 % 2); // 1

// Increment and Decrement: ++ -- (=> Number)
let a = 1;
a++;
console.log(a); // 2
++a;
console.log(a); // 3
console.log(a++); // 3
console.log(a); // 4
console.log(++a); // 5
console.log(a); // 5

// Comparison: > >= < <= (=> Boolean)
console.log(1 > 2); // false
console.log(1 >= 2); // false
console.log(1 < 2); // true
console.log(1 <= 2); // true
console.log(1 <= 1); // true

// Equality: == != === !== (=> Boolean)
console.log(1 == 1); // true
console.log(1 == '1'); // true
console.log(1 != '1'); // false
console.log(1 === 1); // true
console.log(1 === '1'); // false
console.log(1 !== '1'); // true

// Logical Binary: && || ! (=> Boolean)
console.log(true && true); // true
console.log(true || false); // true
console.log(!true); // false

// Logical Bitwise: & | ^ ~ (=> Number)
console.log(1 & 1); // 1
// 0001 &
// 0001
// ----
// 0001 => 1
console.log(2 & 1); // 0
// 0010 &
// 0001
// ----
// 0000 => 0
console.log(3 & 1); // 1
// 0011 &
// 0001
// ----
// 0001 => 1
console.log(3 | 1); // 3
// 0011 |
// 0001
// ----
// 0011 => 3

// Logical Shift: << >> >>> (=> Number)
const color = 0xFF0000; // Red
// RRRR RRRR GGGG GGGG BBBB BBBB
// 1111 1111 0000 0000 0000 0000

const red = (color >> 16) & 0xFF;
// 0000 0000 0000 0000 RRRR RRRR
// 0000 0000 0000 0000 1111 1111
// 0000 0000 0000 0000 1111 1111
// --------------------------------
// 0000 0000 0000 0000 1111 1111 => 255

const green = (color >> 8) & 0xFF;
// 0000 0000 RRRR RRRR GGGG GGGG
// 0000 0000 1111 1111 0000 0000
// 0000 0000 0000 0000 1111 1111
// --------------------------------
// 0000 0000 0000 0000 0000 0000 => 0

const blue = color & 0xFF;
// RRRR RRRR GGGG GGGG BBBB BBBB
// 1111 1111 0000 0000 0000 0000 &
// 0000 0000 0000 0000 1111 1111
// --------------------------------
// 0000 0000 0000 0000 0000 0000 => 0

console.log(red, green, blue); // 255 0 0

// Ternary: ? : (=> any)
const idade = 18;
const podeBeber = idade >= 18 ? 'Sim' : 'Não';
console.log(podeBeber); // Sim

// Assignment: = += -= *= /= %= **= (=> any)
let b = 1;
b += 2; // b = b + 2
console.log(b); // 3
b *= 3; // b = b * 3
console.log(b); // 9

// Type Conversion (Coercion)
console.log(+'3'); // 3
console.log(parseInt('3')); // 3
console.log(Number('3')); // 3
console.log('3' - 2); // 1
