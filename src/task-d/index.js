let invalidExpr = document.getElementById("invalid-expression");
let buttons = Array.from(document.getElementsByClassName('button'));
let display = document.getElementById('display');


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
    const value = evaluateExpression(display.innerText);
    if (!value) {
        invalidExpr.style.display = 'block';
        display.style.border = '1px solid red';
    } else {
        invalidExpr.style.display = 'none';
        display.style.border = '1px solid #242424';
    }
}

function evaluateExpression(expression) {
    if (validateOperators(expression)) {
        return false;
    } else {
        return !cancelExpression(expression) ? toFixedIfNecessary(computeExpression(modifyExpression(expression)), 10) : false;
    }
}

function getRoundedInteger() {
    return fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')
        .then( data => { return data.json() })
        .then( res => { return res })
}

async function rand () {
    let value =  await getRoundedInteger();
    display.innerText = value;
    invalidExpr.style.display = 'none';
    display.style.border = '1px solid #242424';
}

buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                display.innerText = '';
                break;
            case '=':
                try{
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = "Error"
                }
                break;
            case '←':
                if (display.innerText){
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});
