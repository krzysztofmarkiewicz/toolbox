const navUl = document.querySelector('nav ul')
const headersSections = document.querySelectorAll('h2')
// const 
const menuBtn = document.querySelector('.menu-btn')
const menuBtnElements = document.querySelectorAll('.bar')

//generate menu from headers of sections
headersSections.forEach(el=>{
const navItem = document.createElement('li')
navItem.innerHTML=`<a href='#'>${el.innerHTML}</a>`
navUl.appendChild(navItem)
})

const hideMenu=(e)=>{

const menuBtnElements = document.querySelectorAll('.bar')
    e.closest('.nav').classList.toggle('nav--hide')
    menuBtnElements.forEach(el=>{
        el.classList.toggle('change')
    })
// e.children[0].classList.toggle('change')
// e.children[1].classList.toggle('change')
// e.children[2].classList.toggle('change')
}

window.onload=()=>{
const navItems = document.querySelectorAll('nav ul li')
navItems.forEach(el=>{
    el.addEventListener('click', (e)=>{
        hideMenu(menuBtn)
        navItems.forEach(ele=>{
    ele.children[0].classList.remove('activeNavItem')
})
e.target.classList.add('activeNavItem')

        headersSections.forEach(elem=>{
           e.preventDefault()
           if(!elem.parentElement.classList.contains('active'))
            elem.parentElement.classList.remove('opacity')
const changeApp=()=>{
            if(elem.innerText==e.target.innerText){
                elem.parentElement.classList.remove('hide')
                const showElem=()=>{
                    elem.parentElement.classList.add('opacity')
                    elem.parentElement.classList.add('active')
                }
setTimeout(showElem,150)
            }else{
                    elem.parentElement.classList.add('hide')
                    elem.parentElement.classList.remove('active')
            }}
            setTimeout(changeApp, 150)
        })
    })
})
}

menuBtn.addEventListener('click', e=>{
hideMenu(e.target)
})