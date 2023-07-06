const resultInput = document.querySelector('.mathCalcResult')
const calcBtns = document.querySelectorAll('.mathCalcBtn')
const history = document.querySelector('.result--memory')
const clearHistoryBtn = document.querySelector('.app__btn--clear-history')

let currentNumber;
let operator;
let recentNumber;

const resetMathcalc = () => {
    operator = ''
    currentNumber = ''
    recentNumber = ''
    resultInput.innerText = 0
}
resetMathcalc()

const compute = (e) => {
    const mathOperation = (e) => {
        let a = Number(recentNumber)
        let b = Number(resultInput.innerText)
        switch (e) {
            case '+':
                return a + b
            case '-':
                return a - b
            case 'X':
                return a * b
            case '/':
                return a / b
            default:
                console.log('error');
        }
    }


    const addToHistory = () => {
        const elemHistory = document.createElement('p')
        elemHistory.innerHTML = `${recentNumber} ${operator} ${currentNumber}=${resultInput.innerText}`
        history.appendChild(elemHistory)
    }

    const showResult = () => {
        resultInput.innerText = mathOperation(operator)
        addToHistory()
        recentNumber = resultInput.innerText
        currentNumber = ''
        operator = e.target.innerText
    }

    if (e.target.getAttribute('type-btn') === 'operator') {
        if (recentNumber === '') {
            recentNumber = resultInput.innerText
            currentNumber = ''
            operator = e.target.innerText
        } else if (operator === '' || currentNumber === '') {
            operator = e.target.innerText
        } else {
            showResult()
            operator = e.target.innerText
        }

    } else if (e.target.getAttribute('type-btn') === 'number') {
        if (currentNumber === '') {
            resultInput.innerText = ''
        }
        resultInput.innerText += e.target.innerText
        currentNumber = resultInput.innerText


    } else if (e.target.innerText === 'C') {
        resetMathcalc()

    } else if (e.target.innerText === '+/-') {
        resultInput.innerText *= (-1)
        currentNumber = resultInput.innerText

    } else if (e.target.innerText === '.') {
        if (currentNumber.includes('.')) {
            return
        } else {
            if (currentNumber === '') {
                resultInput.innerText = '0.'
                currentNumber=resultInput.innerText
                recentNumber=''
            } else {
                resultInput.innerText += '.'
                currentNumber=resultInput.innerText
            }
        }

    } else if (e.target.innerText === '%') {
        if (recentNumber === '') {
            currentNumber = currentNumber * 0.01
            resultInput.innerText = currentNumber
        } else {
            resultInput.innerText = recentNumber * resultInput.innerText * 0.01
            currentNumber = resultInput.innerText
        }

    } else if (e.target.innerText === '=') {
        if (currentNumber === '' || recentNumber === '') {
            return
        } else {
            showResult()
            operator=''

        }
    }



    const cclg = () => {
        console.clear();
        console.log(`operator = ${operator}    TYP:${typeof operator}`)
        console.log(`currentNumber = ${currentNumber}    TYP:${typeof currentNumber}`)
        console.log(`recentNumber = ${recentNumber}    TYP:${typeof recentNumber}`)
        console.log(`resultInput.innerText = ${resultInput.innerText }    TYP:${typeof resultInput.innerText }`)
    }
    cclg()

}

const clearHistory=(e)=>{
    history.innerHTML=''
    // e.target.classList.add('hide')
}

calcBtns.forEach(el => {
    el.addEventListener('click', compute)
})

document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) {
        console.log(e.key);
        console.log(typeof e.key);
        currentNumber += e.key
        resultInput.innerText = currentNumber}
})

clearHistoryBtn.addEventListener('click', clearHistory)