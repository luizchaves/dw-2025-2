// decision statements: if, if...else, if...else if...else, switch

// Truthy values (https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
// ! Falsy values are truthy values

// Falsy values (https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
// Boolean: false
// Number, BigInt: 0, -0, 0n, NaN
// String: ""
// Nullish: null, undefined

// if statement

// Equality comparisons and sameness
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness
// https://dorey.github.io/JavaScript-Equality-Table/

const number = 10;

if (number > 0) {
  console.log('number is positive');
}

// and operator (&&)
number > 0 && console.log('number is positive');

// if...else
if (number > 0) {
  console.log('number is positive');
} else {
  console.log('number is not positive');
}

// ternary operator (condition ? true : false)
const result = number > 0 ? 'number is positive' : 'number is not positive';
console.log(result);

// if...else if...else
if (number > 0) {
  console.log('number is positive');
} else if (number < 0) {
  console.log('number is negative');
} else {
  console.log('number is zero');
}

// switch statement
// operator: +, -, *, /
const number1 = 2, number2 = 3, operator = '*';

switch (operator) {
  case '+':
    console.log(number1 + number2);
    break;
  case '-':
    console.log(number1 - number2);
    break;
  case '*':
    console.log(number1 * number2);
    break;
  case '/':
    console.log(number1 / number2);
    break;
  default:
    console.log('Invalid operator');
}

switch (true) {
  case number > 0:
    console.log('number is positive');
    break;
  case number < 0:
    console.log('number is negative');
    break;
  default:
    console.log('number is zero');
}

// loop statements: while, do...while, for

// while statement
let flag = 0;

while (flag <= 10) {
  console.log(flag);
  flag++;
}

// do...while statement
flag = 0;

do {
  console.log(flag);
  flag++;
} while (flag <= 10);

// for statement
for (let i = 0; i <= 10; i++) {
  console.log(i);
}

// 00, 01, 02, 03, ..., 09,
// 10, 11, 12, 13, ..., 19,
// ...
// 90, 91, 92, 93, ..., 99
// 2 loops: units, tens
let numbers = '';

for (let tens = 0; tens <= 9; tens++) {
  for (let units = 0; units <= 9; units++) {
    numbers += `${tens}${units}, `;
  }
  numbers += '\n';
}

console.log(numbers);

// 99, 98, 97, 96, ..., 90,
// ...
// 19, 18, 17, 16, ..., 10,
// 09, 08, 07, 06, ..., 00
numbers = '';

for (let i = 99; i >= 0; i--) {
  const number = i < 10 ? `0${i}` : i;
  numbers += `${number}, `;
  if (i % 10 === 0) {
    numbers += '\n';
  }
}

console.log(numbers);
// 99, 97, ..., 91,
// ...
// 19, 17, ..., 11,
// 09, 07, ..., 01
numbers = '';

for (let i = 99; i > 0; i -= 2) {
  numbers += i < 10 ? `0${i}` : i;

  if (i % 10 === 1 && i !== 1) {
    numbers += ',\n';
  } else if (i !== 1) {
    numbers += ', ';
  } else {
    numbers += '';
  }
}

console.log(numbers);
