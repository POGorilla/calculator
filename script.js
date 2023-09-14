let screenNum = '';
let currNum = '';
let num1 = '';
let num2 = '';
let currOperand = '';
let result = '';
let resultDisplayed = false;

const digit = document.getElementsByClassName('num');
const displayShow = document.getElementById('mainScreen');
const dot = document.getElementById('dot');
const clearAll = document.getElementById('allClear');
const operand = document.getElementsByClassName('operator');
const equal = document.getElementById('equal');
const plusOrMinus = document.getElementById('pOm');
const percent = document.getElementById('percent');

createNum();
getOperand();
clearNumOrAll();
equal.addEventListener('click', () => equals());
plusOrMinus.addEventListener('click', () => negativePositive());
percent.addEventListener('click', () => percentage());

function createNum(){ 
    for(let i = 0 ; i < digit.length ; i++){
            digit[i].addEventListener('click', () => {
                if(currNum == '0')currNum = '';
                if (resultDisplayed) {
                    clearData();
                    resultDisplayed = false;
                }
                currNum += digit[i].textContent;
                checkForOperands();
                showNum(digit[i].textContent);
            
            dot.addEventListener('click', () => doDot())
        })
    }
}

function percentage(){
    if (currNum !== '') {
        currNum = (Number(screenNum) / 100).toString();
        screenNum = currNum;
        showNum('');
    }
}

function negativePositive() {
    if (screenNum !== '' && screenNum !== '0') {
        if (screenNum.startsWith('-')) {
            screenNum = screenNum.substring(1);
        } else {
            screenNum = '-' + screenNum;
        }
        currNum = screenNum;
        showNum('');
    }
}

function doDot(){ //ok
    if(currNum == ''){
        currNum = '0.';
        showNum('0.');
    }
    else if(currNum.includes('.'))
            return;
         else{
            currNum += '.';
            showNum('.');
         }
}

function showNum(val){
    screenNum += val;
    displayShow.textContent = screenNum;
}

function add(a, b){
    return a + b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b == 0){
        displayShow.textContent = 'Undefined: divison by 0.';
        clearData();
        return NaN;
    }
    return a / b;
}

function subtract(a, b){
    return a - b;
}

function calculate(a, op, b){
    a = Number(a);
    b = Number(b);

    switch (op) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            return b;
    }
}

function getOperand(){
    for(let j = 0 ; j < operand.length ; j++){
        operand[j].addEventListener('click', () => {

            if (currNum != '') {
                if (num1 == '') {
                  num1 = currNum;
                } else {
                  num2 = currNum;
                  result = calculate(num1, currOperand, num2).toString();
                  num1 = result;
                  screenNum = num1;
                  showNum('');
                }
                currNum = '';
              }

            currOperand = operand[j].textContent; 
            screenNum = '';
            showNum(currOperand);
                        
        })
    }
}

function checkForOperands(){ 
    if (['*', '/', '+', '-', NaN].includes(screenNum)) 
        screenNum = '';
}

function clearNumOrAll(){
    clearAll.addEventListener('click', () => {
        clearData();
    });
}

function clearData(){ 
    screenNum = '';
    currNum = '';
    currOperand = '';
    num1 = '';
    result = '';
    displayShow.textContent = '0';
}

function equals(){
    if(num1 != '' && currOperand != '' && currNum != ''){
        result = calculate(num1, currOperand, currNum);
        let k = result;
        clearData();
        screenNum = k;
        showNum('');
        resultDisplayed = true; 
    }
}