function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const totalCount = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;
    
    if(slides.length > 9) {
        totalCount.textContent = slides.length;
        current.textContent = slideIndex
    } else {
        totalCount.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }
    
    
    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const dots = document.createElement('ol');
    const dotsNav = [];

    dots.classList.add('carousel-dots');

    slider.append(dots);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');

        if(i === 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsNav.push(dot);
    }

    function formatCounter() {
        if(slides.length < 10) {
            current.textContent  = `0${slideIndex}`;
        } else {
            current.textContent  = slideIndex;
        }
    }

    function opacityLoop() {
        dotsNav.forEach(dot => dot.style.opacity = '.5');
        dotsNav[slideIndex - 1].style.opacity = 1;
    }

    function translateXFunc(offset) {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function convertToNumber(str) {
        return +str.replace(/\D/g, '')
    }


    next.addEventListener('click', () => {
        

        if(offset === convertToNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += convertToNumber(width)
        }

        translateXFunc(offset);

        if(slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        formatCounter();

        opacityLoop();

    })


    prev.addEventListener('click', () => {

        if(offset === 0) {
            offset = convertToNumber(width) * (slides.length - 1);
        } else {
            offset-= convertToNumber(width)
        }

        translateXFunc(offset);

        if(slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        formatCounter();

        opacityLoop();
    });

    dotsNav.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = convertToNumber(width) * (slideTo - 1);

            translateXFunc(offset);

            formatCounter();

            opacityLoop();
        });
    });
}

export default slider;