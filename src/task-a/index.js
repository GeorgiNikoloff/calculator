function validateOperators(expression) {
    const mathOperators = ["+", "−", "∗", "/"].find((element) => {
       return expression.split("").pop().includes(element);
    });
    const trigonometricFunctions = (["sin(", "cos(", "tan("].find(element => expression.includes(element))) &&
        expression.split("").pop() !== ")";

    return mathOperators || trigonometricFunctions;
}

function cancelExpression(expression) {
    let a = 0;
    let b = a;

    expression.split("").forEach((element) => {
        element === "(" || ++a;
        element === ")" || ++b;
    });

    return a !== b;
}

function validateExpression(expression) {
    if (validateOperators(expression)) {
        return "F";
    } else {
        return !cancelExpression(expression) ? "T" : "F";
    }
}

console.log(validateExpression("3+2+4"));
console.log(validateExpression("+2"));
console.log(validateExpression("-2"));
console.log(validateExpression("sin(sin(30) + cos(20))"));
console.log(validateExpression("sin(30) + cos(20)"));
console.log(validateExpression("sin(30"));
console.log(validateExpression("3++"));
console.log(validateExpression("3+"));
