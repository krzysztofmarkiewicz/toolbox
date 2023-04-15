const switchDayNigth = document.querySelector('#switchDayNigth')

if (localStorage.getItem('theme')=='dark'){
    document.querySelector('html').setAttribute('data-theme', 'dark')
    switchDayNigth.checked = true
}else{
    document.querySelector('html').setAttribute('data-theme', 'light')
}

switchDayNigth.addEventListener('click', ()=>{
if (switchDayNigth.checked){
    
    document.querySelector('html').setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark');
}else{
    document.querySelector('html').setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light');
}})

// console.log(switchDayNigth);