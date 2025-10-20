// create array
const numbers = [1, 2, 3];

// accessing values
console.log(numbers[0]); //=> 1
console.log(numbers[1]); //=> 2
console.log(numbers.at(-1)); //=> 3
console.log(numbers.at(-2)); //=> 2

// adding values
console.log(numbers[3]); //=> undefined

numbers[3] = 10;
console.log(numbers); //=> [1, 2, 3, 10]

// changing values
numbers[3] = 4;
console.log(numbers); //=> [1, 2, 3, 4]

// removing values
numbers[3] = undefined;
console.log(numbers); //=> [1, 2, 3, undefined]

delete numbers[2];
console.log(numbers); //=> [1, 2, <1 empty item>, undefined]

numbers.splice(2, 2);
console.log(numbers); //=> [1, 2]

// append/prepend values
console.log(numbers); //=> [1, 2]

numbers.push(3);
console.log(numbers); //=> [1, 2, 3]

numbers.unshift(0);
console.log(numbers); //=> [0, 1, 2, 3]

console.log(numbers.pop()); //=> 3
console.log(numbers); //=> [0, 1, 2]

console.log(numbers.shift()); //=> 0
console.log(numbers); //=> [1, 2]

// length property
console.log(numbers.length); //=> 2

// multiple types
const person = ['John', 30, true];
console.log(person); //=> ['John', 30, true]

// destructuring arrays
// const name = person[0];
// const age = person[1];
// const status = person[2];
// person
// ['John', 30, true]
// [name, age, status]
const [name, age, status] = person;
// console.log(name); //=> 'John'
// console.log(age); //=> 30
// console.log(status); //=> true

// spread operator
const newPerson = [...person, 'john@email.com'];
console.log(newPerson); //=> ['John', 30, true, 'john@email.com']

// iteration
for (const value of numbers) {
  console.log(value);
}

for (const index in numbers) {
  console.log(index);
  console.log(numbers[index]);
}

for (let index = 0; index < numbers.length; index++) {
  console.log(numbers[index]);
}

for (const [index, value] of numbers.entries()) {
  console.log(index);
  console.log(value);
}

// iteration methods
numbers.forEach((value, index) => {
  console.log(index);
  console.log(value);
});

console.log(numbers); //=> [1, 2]

console.log(numbers.map((value) => value * 2)); //=> [2, 4]

console.log(numbers.filter((value) => value % 2 === 0)); //=> [2]

console.log(numbers.reduce((acc, value) => acc + value, 0)); //=> 3
// acc | value | f(acc, value)
//  0  |   1   |    0 + 1 = 1
//  1  |   2   |    1 + 2 = 3

console.log(numbers.some((value) => value > 0)); //=> true
console.log(numbers.some((value) => value > 1)); //=> true

console.log(numbers.every((value) => value > 0)); //=> true
console.log(numbers.every((value) => value > 1)); //=> false

console.log(numbers.find((value) => value > 1)); //=> 2
console.log(numbers.findIndex((value) => value > 1)); //=> 1

// other methods
console.log(numbers.includes(1)); //=> true
console.log(numbers.includes(3)); //=> false

console.log(numbers.indexOf(2)); //=> 1
console.log(numbers.indexOf(3)); //=> -1

console.log(numbers.join('-')); //=> '1-2'

console.log(numbers.slice(0, 1)); //=> [1]
console.log(numbers); //=> [1, 2]

numbers.reverse();
console.log(numbers); //=> [2, 1]

numbers.sort();
console.log(numbers); //=> [1, 2]

numbers.unshift(11);

console.log(numbers); //=> [11, 1, 2]
numbers.sort();
console.log(numbers); //=> [1, 11, 2]

numbers.sort((a, b) => a - b);
console.log(numbers); //=> [1, 2, 11]
