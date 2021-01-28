import {
    helper
} from './timer';

function slider({
    container,
    nextArrow,
    prevArrow,
    currentCount,
    totalCount,
    sliderWrapper,
    slide,
    sliderInner
}) {
    const slider = document.querySelector(container),
        next = slider.querySelector(nextArrow),
        prev = slider.querySelector(prevArrow),
        total = slider.querySelector(totalCount),
        current = slider.querySelector(currentCount),
        wrapper = slider.querySelector(sliderWrapper),
        inner = slider.querySelector(sliderInner),
        slides = slider.querySelectorAll(slide),
        width = window.getComputedStyle(wrapper).width;

    let index = 1,
        offset = 0;

    inner.style.width = 100 * slides.length + '%';
    inner.classList.add('slider__style');
    slides.forEach(value => value.style.width = width);
    wrapper.classList.add('visibility');

    total.textContent = helper(slides.length);


    //Dots
    slider.style.position = 'relative';
    const ol = document.createElement('ol');
    ol.classList.add('carousel-indicators');
    slides.forEach((value, index) => {
        ol.innerHTML += `
     <li class = "dot" data-content-to = ${index + 1} data-mouse></li>
     `;
    });

    slider.append(ol);

    const dots = document.querySelectorAll('.dot');

    changeIndex(index);

    function changeIndex(index) {
        current.textContent = helper(index);
        dots.forEach(value => value.classList.remove('active'));
        dots[index - 1].classList.add('active');
    }

    slider.addEventListener('click', (e) => {
        const t = e.target;
        if (t && t.matches('li.dot')) {
            const currentDot = t.dataset.contentTo;
            index = currentDot;
            changeIndex(index);
            offset = changeReg(width) * (currentDot - 1);
            inner.style.transform = `translateX(-${offset}px)`;
        }
    });

    next.addEventListener('click', () => {
        nextSlide();
    });

    function interval() {
        let interval = setInterval(nextSlide, 3000);

        slider.addEventListener('mouseover', (e) => {
            if (e.target && e.target.matches('[data-mouse]')) {
                clearInterval(interval);
            }
        });

        slider.addEventListener('mouseout', (e) => {
            if (e.target && e.target.matches('[data-mouse]')) {
                interval = setInterval(nextSlide, 3000);
            }
        });
    }

    function nextSlide() {
        if (offset === changeReg(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += changeReg(width);
        }

        inner.style.transform = `translateX(-${offset}px)`;

        index = index === slides.length ? index = 1 : ++index;

        changeIndex(index);
    }

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = changeReg(width) * (slides.length - 1);
        } else {
            offset -= changeReg(width);
        }

        inner.style.transform = `translateX(-${offset}px)`;

        index = index === 1 ? index = slides.length : --index;

        changeIndex(index);
    });

    function changeReg(str) {
        return +str.replace(/\D/gi, '');
    }

    interval();

}

export default slider;