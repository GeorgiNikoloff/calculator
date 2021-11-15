let invalidExpr = document.getElementById("invalid-expression");
let input = document.getElementById("input");
let expressionValue = document.getElementById("expression");
let submit = document.getElementById("submit");


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

function calculate() {
    const value = evaluateExpression(input.value);
    expressionValue.innerHTML = '';
    if (!value) {
        invalidExpr.style.display = 'block';
        input.style.border = '1px solid red';
    } else {
        invalidExpr.style.display = 'none';
        input.style.border = '1px solid #242424';
        expressionValue.innerHTML = 'The Result is: ' +  value;
    }
}

function evaluateExpression(expression) {
    if (validateOperators(expression)) {
        return false;
    } else {
        return !cancelExpression(expression) ? toFixedIfNecessary(computeExpression(modifyExpression(expression)), 10) : false;
    }
}

input.onkeypress = function(evt) {
    evt = evt || window.event;
    let charCode = evt.which || evt.keyCode;
    let charStr = String.fromCharCode(charCode);
    expressionValue.innerHTML = '';
    if (/(?![0-9-+*/()x]|abs|pow|ln|pi|e|a?(?:sin|cos|tan)h?)\b[a-zA-Z]+\b/.test(charStr)) {
        submit.disabled = true;
        input.style.border = '1px solid red';
    } else {
        submit.disabled = false;
        input.style.border = '1px solid #242424';
    }
};
