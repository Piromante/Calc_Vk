window.onload = function(){

// Определение переменных

let flag = false
let a = ''
let b = ''
let expressionResult = ''
let selectedOperation = null
let memory = []


// Ввод

outputElement = document.getElementById("result")

digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
            a += digit
        }
        outputElement.innerHTML = a
    } else {
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
            b += digit
            outputElement.innerHTML = b
        }
    }
}

digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML
        onDigitButtonClicked(digitValue)
    }
});


// Основные функции

document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return
    selectedOperation = 'x'
}
document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return
    selectedOperation = '+'
}
document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return
    selectedOperation = '-'
}
document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return
    selectedOperation = '/'
}


// Второстепенные функции

document.getElementById("btn_op_op").onclick = function() {
    if (a === '') return
    expressionResult = -(+a)
    a = expressionResult.toString()
    b = ''
    selectedOperation = null
    outputElement.innerHTML = a
}

document.getElementById("btn_op_clear").onclick = function() {
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
}


// Работа с памятью

document.getElementById("btn_op_M").onclick = function() {
  expressionResult = memory[memory.length - 1]
  if (a === '' ) { a = expressionResult.toString() }
  else if (b === '') { b = expressionResult.toString() }
  outputElement.innerHTML = expressionResult
}
document.getElementById("btn_op_M+").onclick = function() {
    if (a === '') return
    memory.push(a)
}
document.getElementById("btn_op_M-").onclick = function() {
    memory.pop()
}
document.getElementById("btn_op_MR").onclick = function() {
    memory = [];
}
document.getElementById("btn_op_MS").onclick = function() {
    if (memory.length == 0) {
        outputElement.innerHTML = "Ошибка"
        return
    }
    memory.sort();
    outputElement.innerHTML = memory.toString();
}


// Вывод

document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation)
        return

    switch(selectedOperation) {
        case 'x':
            expressionResult = (+a) * (+b)
            break;
        case '+':
            expressionResult = (+a) + (+b)
            break;
        case '-':
            expressionResult = (+a) - (+b)
            break;
        case '/':
            if (b != 0) { expressionResult = (+a) / (+b) }
            else { flag = true }
            break;
    }

    a = expressionResult.toString()
    b = ''
    selectedOperation = null
    if (flag) { outputElement.innerHTML = "Ошибка" }
    else { outputElement.innerHTML = a }
}
};
