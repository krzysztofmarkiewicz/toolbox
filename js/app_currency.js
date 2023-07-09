const currencySelects = document.querySelectorAll('.data-form__currency')
const allData = document.querySelectorAll('.amount, .data-form__currency')
const currencyFirst = document.querySelector('.currency-first')
const currencySecond = document.querySelector('.currency-second')
const amountFirst = document.querySelector('.amount-first')
const amountSecond = document.querySelector('.amount-second')
const searchCurrency = document.querySelector('.search-currency')
const listOfCurrency = document.querySelectorAll('.currency-tr')


//gets values of currency from free API
const requestURL = 'https://api.exchangerate.host/latest';
const request = new XMLHttpRequest();
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
    //set default currency
    currencyFirst.value = 'EUR'
    currencySecond.value = 'PLN'

    //function  calculates currency
    const changeCurrency = (e) => {

        const c1 = currencyFirst.value
        const c2 = currencySecond.value
        const a1 = amountFirst.value
        const a2 = amountSecond.value

        const calculate = (el1, el2, el3) => {
            const x = (el1 / el2) * el3
            return x
        }
        if (e.value == c1 || e.value == a1) {
            amountSecond.value = calculate(response.rates[c2], response.rates[c1], a1).toFixed(3)
        } else {
            amountFirst.value = calculate(response.rates[c1], response.rates[c2], a2).toFixed(3)
        }
    }
    changeCurrency(currencyFirst)


    //listeners
    const events = ['change', 'keyup']
    events.forEach(evt => {
        allData.forEach(el => {
            el.addEventListener(evt, (e) => {
                changeCurrency(e.target)
            })
        });
    })

    //currency search bar listener
    searchCurrency.addEventListener('keyup', e => {
        listOfCurrency.forEach(el => {
            el.classList.add('hide')
            if (el.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
                el.classList.remove('hide')
            }
        })
    })
}