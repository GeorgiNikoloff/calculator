## Calculator
## How to install

Run `npm install`

## Task A - Valid Expression

It's a program that reads a mathematical expression and determines whether such an expression is valid. 
For this exercise I use only the following operators: `+, −, ∗, /, sin, cos, tan`.

How to run 'Task A' locally: `npm run task-a`

How it works? Example:
`console.log(validateExpression("3+2+4")); // T`
`console.log(validateExpression("+2")); // T`
`console.log(validateExpression("-2")); // T`
`console.log(validateExpression("sin(sin(30) + cos(20))")); // T`
`console.log(validateExpression("sin(30) + cos(20)")); // T`
`console.log(validateExpression("sin(30")); // F`
`console.log(validateExpression("3++")); // F`
`console.log(validateExpression("3+")); // F`

## Task B - Evaluate Expression

Given a valid expression evaluate. For example: `sin(30) + cos(20) = −0.5799495623`

How to run 'Task B' locally: `npm run task-b`

How it works? Example:
`console.log(evaluateExpression("sin(30) + cos(20)")); // −0.5799495623`
`console.log(evaluateExpression("sin(20) - cos(10)")); // 1.7520167798`
`console.log(evaluateExpression("sin(15) * cos(30)")); // 0.1003078422`
`console.log(evaluateExpression("sin(50) / sin(5)")); // 55`
`console.log(evaluateExpression("5 * 10 + 7")); //57`

## Task C - Calculator

It's a Single Page Application that allows the user to input an expression, validates the expression (on every keypress) 
and evaluates the result. If the expression inputted by the user is invalid an error message should be displayed.

How to run 'Task C' locally: `npm run task-c`

## Task D - Supr Calculator

There is a RAND operand that will generate a random number. The RAND should get its input from endpoint: 
`https://www.random.org/ integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new`

It's calculator UI with buttons for every digit and operator allowing the user to input an expression without using the 
native mobile keyboard. The layout should respond to device orientation.

How to run 'Task D' locally: `npm run task-d`

