1. What is the difference between var, let, and const?

Answer: var is the old way and ignores block scope, which can cause bugs. let is block-scoped and allows value changes, while const is also block-scoped but cannot be reassigned. In modern code, use let when values change and const when they don’t.

2. What is the difference between map(), forEach(), and filter()?

forEach() runs a function on each item but doesn’t return anything. map() also runs a function on each item but returns a new array with the results. filter() checks each item with a condition and returns a new array with only the items that pass the test.

3. What are arrow functions in ES6?

Arrow functions are a shorter way to write functions in ES6. They use => instead of function and keep the value of this from the surrounding code. They make code simpler and cleaner.

4. How does destructuring assignment work in ES6?

Destructuring lets you take values from arrays or objects and put them into variables in one line. For example, you can get name and age from an object or pick items from an array easily without writing many lines.

5. Explain template literals in ES6. How are they different from string concatenation?

Template literals use backticks ` instead of ' or ". You can put variables or expressions inside ${ }, and JavaScript will replace them with their values. This is easier than using + to join strings. Also, you can write the text on multiple lines naturally, without using \n for new lines. It makes strings cleaner and easier to read.
