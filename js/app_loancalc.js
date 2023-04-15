const amount = document.querySelector('.data-form__amount');
const numberOfInstallments = document.querySelector('.data-form__number');
const selectYearsMonths = document.querySelector('.data-form__years-months');
const interest = document.querySelector('.data-form__interest');
const commission = document.querySelector('.data-form__commission');
const resetBtn = document.querySelector('.reset-button');
const computeBtn = document.querySelector('.compute-button');
const resultsBtns = document.querySelectorAll('.result-button--loancalc');
const results = document.querySelectorAll('.result');
const resultStable = document.querySelector('.result__stable-installments')
const resultDecreasing = document.querySelector('.result__decreasing-installments')
const allInputs = document.querySelectorAll('.data-form__form-item')

// console.log(document.documentElement.style.getPropertyValue());
const clearError = el => {
    el.classList.remove('error')
}

const validateForm = input => {
    input.forEach(el => {
        if (el.value < 0) {
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
    const K=Number(amount.value)
    const i=Number(interest.value/100)
    let n=Number(numberOfInstallments.value)
    const P=Number(commission.value/100)
    if(selectYearsMonths.value=='years'){
        n=n*12
    }
    const amountOfStableInstallment=((K+(K*P))*i)/(12*(1-(12/(12+i))**(n)))
    
    //WZÓR NA RATY MALEJĄCE Najpierw obliczamy część kapitałową wg wzoru: Rk=A/n. Co oznacza, że wartość kredytu dzielimy przez liczbę rat pozostałych do spłaty. Następnie wyliczamy część odsetkową: Ro=[(A-x*Rk)*b]/12. Symbol x oznacza w tym przypadku liczbę rat pozostałych do spłaty, z kolei b to oprocentowanie kredytu w skali roku.Aby otrzymać wysokość raty miesięcznej, trzeba zsumować obie wartości Rk oraz Ro.
    // (K/n)+(((K-((n-x)*(K/n)))*i)/12)


    resultStable.innerHTML = `<p>Wysokość raty: ${amountOfStableInstallment.toFixed(2)} zł</p>
    <p>Całkowita kwota do spłaty: ${(amountOfStableInstallment*n).toFixed(2)} zł</p>
    <p>Koszt kredytu: ${((amountOfStableInstallment*n)-K).toFixed(2)}</p>`
    
    const generateListOfDecreasingInstallments=()=>{
        resultDecreasing.innerHTML=''
        const newTable = document.createElement('table')
        const newTd = document.createElement('td')
        newTable.appendChild(newTd)
        resultDecreasing.appendChild(newTable) 

        for(let x=n; x>0;x--){
    const newTr =document.createElement('tr')
    const nextInstalment = (K/n)+(((K-((n-x)*(K/n)))*i)/12)
    newTr.innerHTML= `Rata nr ${n-x+1}: ${nextInstalment.toFixed(2)}`
    newTd.appendChild(newTr)
        }
    }
    generateListOfDecreasingInstallments()




}
computeBtn.addEventListener('click', el => {

    el.preventDefault()
    allInputs.forEach(e => {
        clearError(e)
    })
    validateForm([numberOfInstallments, interest, amount, commission])
    checkErrors()
})



//shows results
let resultBtn;

// resultsBtns.forEach(el => {
//     el.addEventListener('click', (e) => {
//         results.forEach(el => {
//             el.classList.add('hide')
//             el.classList.remove('result--active')
//             el.previousElementSibling.classList.remove('result-button--active')
//         })

//         e.target.nextElementSibling.classList.remove('hide')
//         e.target.nextElementSibling.classList.add('result--active')
//         e.target.classList.add('result-button--active')
        

//         resultBtn = el.innerHTML
        
//     })
// })

const test=(resultBtns, result)=>{
    resultBtns.forEach(el => {
    
    el.addEventListener('click', (e) => {
        result.forEach(el => {
            el.classList.add('hide')
            el.classList.remove('result--active')
            el.previousElementSibling.classList.remove('result-button--active')
        })

        e.target.nextElementSibling.classList.remove('hide')
        e.target.nextElementSibling.classList.add('result--active')
        e.target.classList.add('result-button--active')
        

        resultBtn = el.innerHTML
        
    })
})
}
    test(resultsBtns, results)


