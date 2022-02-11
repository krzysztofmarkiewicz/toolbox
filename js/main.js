const amount = document.querySelector('.data-form__amount');
const installments = document.querySelector('.data-form__number-of-installments');
const selectYearsMonths = document.querySelector('.data-form__years-months');
const interest = document.querySelector('.data-form__interest');
const commission = document.querySelector('.data-form__commission');
const resetBtn = document.querySelector('.app-calc__buttons .reset-button');
const computeBtn = document.querySelector('.app-calc__buttons .compute-button');
const resultsBtns = document.querySelectorAll('.results__buttons .app-calc__btn');
const results = document.querySelectorAll('.result');
const resultStable = document.querySelector('.result__stable-installments')
const resultDecreasing = document.querySelector('.result__decreasing-installments')

const allInputs = document.querySelectorAll('.data-form__form-item')

const clearError = el => {
    el.classList.remove('error')
}

const validateForm = input => {
    input.forEach(el => {
        if (el.value <= 0) {
            el.classList.add('error')
            el.value = ''
            el.placeholder = 'Źle wypełniony formularz. Zerknij do pomocy.'
        }
    })
}
const checkErrors = () => {
    
    let errors = 0

    allInputs.forEach(e => {
        if (e.classList.contains('error')) {
            errors++
        }
    })

    if (errors == 0) {
        // resultStable.lastElementChild.innerHTML = ''
        // resultDecreasing.lastElementChild.innerHTML = ''
        calculate()
    } else {
        errorInfo()
        
    }
}

const errorInfo = () => {
    resultStable.lastElementChild.innerHTML = 'ŹLE, ŹLE, ŹLE'
    resultDecreasing.lastElementChild.innerHTML = 'ŹLE, ŹLE, ŹLE'
}

const calculate = () => {
    resultStable.lastElementChild.innerHTML = amount.value * installments.value
    resultDecreasing.lastElementChild.innerHTML = amount.value * installments.value * 1000
}

computeBtn.addEventListener('click', el => {

    el.preventDefault()
    allInputs.forEach(e => {
        clearError(e)
    })
    validateForm([installments, interest, commission, amount])
    // calculate()
    checkErrors()
})



//wyświetla odpiwiedni wynik 
let resultBtn;

resultsBtns.forEach(el => {
    el.addEventListener('click', x => {
        resultBtn = el.innerHTML

        results.forEach(el => {
            if (resultBtn == el.firstElementChild.innerHTML) {
                el.classList.remove('hide')
            } else {
                el.classList.add('hide')
            }
        })
    })
})