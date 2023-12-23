const scrollBtn = document.querySelector('.chevron-up')
window.addEventListener('scroll', (e) => {
    const {top} = document.body.getBoundingClientRect();
    if(top <= -550) {
        
        scrollBtn.style.display = 'block';
    }else if(top >= -200){
        scrollBtn.style.display = 'none';
    }
})


scrollBtn.addEventListener('click', (e) => {
    document.body.scrollTop = 0; //safari 
    document.documentElement.scrollTop = 0; //Chrome, Firefox, IE and Opera
})


document.addEventListener('DOMContentLoaded', () => {
    //Variables
    const hamburgerBtn = document.querySelector('.promo__hamburger'),
        menuOverlay = document.querySelector('.menu'),
        closeBtn = document.querySelector('.menu__close'),
        counters = document.querySelectorAll('.percentage__counter'),
        lines = document.querySelectorAll('.percentage__current'),
        menuParent = document.querySelector('.menu__list'),
        modalBlock = document.querySelector('.modal-greetings'),
        {width} = window.screen;
    
    let startGreetings = null;
    //Modal Greetings 

    function greetings(modificator) {
        if(modificator !== 'active') {
            clearTimeout(startGreetings);
        }
        modalBlock.classList.toggle('active');
    }

    if(width >= 576) {
        startGreetings = setTimeout(() => greetings('active'), 7000);
        setTimeout(() => greetings('deactivate'), 11000);
    }
    


    //Active menu
    hamburgerBtn.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        menuOverlay.style.left = 0;
    })

    closeBtn.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        menuOverlay.style.left = `-100%`;
    })

    menuOverlay.lastElementChild.addEventListener('click', (e) => {
        menuOverlay.classList.toggle('active');
        menuOverlay.style.left = `-100%`;
    })


    //Percentage Skills

    counters.forEach((item, i) => {
        
        lines[i].style.width = item.textContent;
    })

    //Menu Navigate and Close Menu screen

    function hideOverlay() {
        menuOverlay.style.left = `-100%`;
        menuOverlay.classList.toggle('active');
    }

    menuParent.addEventListener('click', (e) => {
        setTimeout(hideOverlay, 1000)
    })





})


