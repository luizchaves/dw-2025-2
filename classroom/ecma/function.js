// function declaration
function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // NaN
console.log(sum(1, 2, 3)); // 3

// function expression
const subtract = function (a, b) {
  return a - b;
};

console.log(subtract(2, 1));

// arrow function
const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(2, 3));

// arrow function with implicit return
const divide = (a, b) => a / b;

console.log(divide(6, 2));

// default parameters
function pow(base, exponent = 1) {
  return base ** exponent;
}

console.log(pow(2)); // 2
console.log(pow(2, 3)); // 8

// rest parameters
function sumAll(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// callback function
function calc(a, b, operation) {
  return operation(a, b);
}

console.log(calc(2, 3, sum)); // 5
console.log(calc(2, 3, subtract)); // -1
console.log(calc(2, 3, multiply)); // 6
console.log(calc(6, 2, divide)); // 3
console.log(calc(2, 3, (x, y) => x ** y)); // 8
