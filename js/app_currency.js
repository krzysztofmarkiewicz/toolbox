const currencySelects = document.querySelectorAll('.data-form__currency')
const allData = document.querySelectorAll('.amount, .data-form__currency')
let currencyFirst = document.querySelector('.currency-first')
let currencySecond = document.querySelector('.currency-second')
let amountFirst = document.querySelector('.amount-first')
let amountSecond = document.querySelector('.amount-second')

const searchCurrency = document.querySelector('.search-currency')
const listOfCurrency = document.querySelectorAll('.currency-table .currency-tr')


//gets values of currency from free API
var requestURL = 'https://api.exchangerate.host/latest';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();


request.onload = function () {
    const response = request.response;
    const currency = Object.keys(response.rates)



    //makes list of currency and injects list to options of selects
    currencySelects.forEach(el => {
        for (i = 0; i < currency.length; i++) {
            const option = document.createElement('option')
            option.textContent = currency[i]
            option.value = currency[i]
            el.appendChild(option)
        }
    })

    currencyFirst.value = 'EUR'
    currencySecond.value = 'PLN'

    const changeCurrency = (e) => {

        let c1 = currencyFirst.value
        let c2 = currencySecond.value
        let a1 = amountFirst.value
        let a2 = amountSecond.value

        const calculate = (el1, el2, el3, el4) => {
            const x = (el1 / el2) * el3
            return x
        }
        if (e.value == c1 || e.value == a1) {
            amountSecond.value = calculate(response.rates[c2], response.rates[c1], a1, a2).toFixed(3)
        } else {
            amountFirst.value = calculate(response.rates[c1], response.rates[c2], a2, a1).toFixed(3)
        }
    }
    changeCurrency(currencyFirst)

    //searchbar
    searchCurrency.addEventListener('keyup', e => {
        listOfCurrency.forEach(el => {
            if (el.classList.contains('t')) {
                return
            } else {
                el.classList.add('hide')
                if (el.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
                    console.log(el.parentElement.parentElement.innerHTML);
                    el.classList.remove('hide')
                }
            }
        })

    })

    //listeners
    const events = ['change', 'keyup']
    events.forEach(evt => {
        allData.forEach(el => {
            const events = []
            el.addEventListener(evt, (e) => {
                changeCurrency(e.target)
            })
        });
    })
}