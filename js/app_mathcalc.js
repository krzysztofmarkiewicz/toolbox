const resultInput = document.querySelector('.mathCalcResult')
const calcBtns = document.querySelectorAll('.mathCalcBtn')
const history = document.querySelector('.saveResults')

let result;
let currentNumber;
let operator;
let recentNumber;
let recentResult;
let recentOperator;

const resetMathcalc = () => {
    result = ''
    operator = ''
    currentNumber = 0
    recentNumber = ''
    recentResult = ''
    recentOperator = ''
    resultInput.value = 0
    history.innerHTML = ''
}
resetMathcalc()

const setNumber = (el) => {
    currentNumber += el
    currentNumber = parseFloat(currentNumber)
    resultInput.value = currentNumber
}
const funct = (e) => {

    const mathOperation = (e) => {
        switch (e) {
            case '+':
                return result + currentNumber
            case '-':
                return result - currentNumber
            case 'X':
                return result * currentNumber
            case '/':
                return result / currentNumber
            default:
                console.log('error');
        }
    }

    if (e.target.getAttribute('type-btn') === 'operator') {
        const addToHistory = () => {
            const elemHistory = document.createElement('p')
            elemHistory.innerHTML = `${recentResult} ${recentOperator} ${recentNumber}=${result}`
            history.appendChild(elemHistory)
        }
        const setResult = (el) => {
            recentResult = result
            recentNumber = currentNumber
            recentOperator = operator

            result = parseFloat(el)
            operator = e.target.innerText
            currentNumber = 0
            resultInput.value = result
        }
        if (result === '') {
            setResult(resultInput.value)
        } else if (currentNumber === 0) {
            operator = e.target.innerText
        } else {
            setResult(mathOperation(operator))
            addToHistory()
        }
    }

    if (e.target.getAttribute('type-btn') === 'number') {
        setNumber(e.target.innerText)
    }
    if (e.target.innerText === 'C') {
        resetMathcalc()
    }
    if (e.target.innerText === '+/-') {
        resultInput.value *= (-1)
        currentNumber = resultInput.value
    }
    if (e.target.innerText === ',') {
        if (Number.isInteger(currentNumber)) {
            currentNumber = currentNumber + '.'
        }
    }
    if (e.target.innerText === '%') {
        resultInput.value = recentNumber * resultInput.value * 0.01
        currentNumber = resultInput.value
    }



    const cclg = () => {
        console.clear();
        console.log(`result = ${result}`)
        console.log(`operator = ${operator}`)
        console.log(`currentNumber = ${currentNumber}`)
        console.log(`recentNumber = ${recentNumber}`)
        console.log(`recentResult = ${recentResult}`)
        console.log(`recentOperator = ${recentOperator}`)
        console.log(`resultInput.value = ${resultInput.value }`)
        console.log(`history.innerHTML = ${history.innerHTML}`)
    }
    cclg()
}


calcBtns.forEach(el => {
    el.addEventListener('click', funct)
})

document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) {
        setNumber(e.key)
    }
})