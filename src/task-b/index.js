function classify(expression) {
    let operator = categorize(expression);
    switch (operator) {
        case "+":
            return reduceExpression(expression, "+");
        case "-":
            return reduceExpression(expression, "-");
        case "*":
            return reduceExpression(expression, "*");
        case "/":
            return reduceExpression(expression, "/");
        default:
            return expression;
    }
}

function categorize(string) {
    if (string.includes("+")) {
        return "+";
    }
    if (string.includes("-")) {
        return "-";
    }
    if (string.includes("*")) {
        return "*";
    }
    if (string.includes("/")) {
        return "/";
    }
}

function validateResult(operator, expression) {
    switch (operator) {
        case "Math.sin":
            return Math.sin(expression);
        case "Math.cos":
            return Math.cos(expression);
        case "Math.tan":
            return Math.tan(expression);
        default:
            return expression;
    }
}

function reduceExpression(expression, operator) {
    return expression.split(operator).reduce((previousValue, currentValue) => {
        return parseFloat(previousValue) + parseFloat(currentValue);
    });
}

function calculation(expression) {
    return new Function('return ' + expression)();
}

function computeExpression(expression) {
    let lastIndex = expression.lastIndexOf("(");
    let sum = 0;
    let ongoing = expression;
    let b;

    if (lastIndex > 0) {
        b = ++lastIndex + expression.slice(lastIndex).indexOf(")");
        ongoing = expression.slice(lastIndex, b);
        sum = expression.slice(lastIndex - 9, lastIndex - 1);
        expression = expression.slice(0, lastIndex - 9) + validateResult(sum, classify(ongoing)) + expression.slice(b + 1);
        if  (["(", "+", "-", "*", "/"].find(element => expression.includes(element))) {
            return computeExpression(expression);
        }
        return expression;
    } else {
        return calculation(expression);
    }
}

function modifyExpression(expression) {
    let operators = ["+", "−", "∗", "/"];
    expression = operators.concat(["sin", "cos", "tan"]).map( (element, index) => {
        return expression = expression.replace(element, operators.concat(["Math.sin", "Math.cos", "Math.tan"])[index]);
    });
    return expression.pop();
}

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

function toFixedIfNecessary(value, dp) {
    return +parseFloat(value).toFixed(dp);
}

function evaluateExpression(expression) {
    if (validateOperators(expression)) {
        return "F";
    } else {
        return !cancelExpression(expression) ? toFixedIfNecessary(computeExpression(modifyExpression(expression)), 10) : "F";
    }
}

console.log(evaluateExpression("sin(30) + cos(20)"));
console.log(evaluateExpression("sin(20) - cos(10)"));
console.log(evaluateExpression("sin(15) * cos(30)"));
console.log(evaluateExpression("sin(50) / sin(5)"));
console.log(evaluateExpression("5 * 10 + 7"));
console.log(evaluateExpression("10 + 126 / 2"));
