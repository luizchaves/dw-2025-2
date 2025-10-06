// Boolean
console.log(true);
console.log(false);
// Falsy values
console.log(false);
console.log(0);
console.log('');
console.log('0');
console.log(null);
console.log(undefined);
// Truthy values => !Falsy

// Number
console.log(15);
console.log(0b1111); // 15 em binário
console.log(0o17);   // 15 em octal
console.log(0xF);    // 15 em hexadecimal
console.log(-15);
console.log(3.14);
console.log(314e-2); // 3.14
console.log(Math.PI);
// Special Numbers
console.log(NaN);
console.log(0 / 0); // NaN
console.log(Infinity);
console.log(-Infinity);
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991 (- (2^53 - 1))

// BigInt
console.log(9007199254740991n); // BigInt
console.log(BigInt(9007199254740991)); // BigInt

// IEEE 754
console.log(0.1 + 0.2); // 0.30000000000000004

// String (', ", `)
console.log('Hello, World!');
console.log("Hello, World!");
console.log(`Hello, World!`);

// Array
console.log([1, 2, 3]);
console.log([true, 'Fulano', 'fulano@email.com']);

// Object (JSON)
console.log({ status: true, name: 'Fulano', email: 'fulano@email.com' });
