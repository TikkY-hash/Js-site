document.addEventListener('DOMContentLoaded', () => {
    // Tab
    const contentText = document.querySelectorAll('.tabcontent'),
        tabClass = document.querySelectorAll('.tabheader__item'),
        tabParent = document.querySelector('.tabheader__items');

    function tabHide() {
        contentText.forEach(value => {
            value.classList.add("hide");
            value.classList.remove("show");
        });

        tabClass.forEach(value => {
            value.classList.remove('tabheader__item_active');
        });
    }

    function showTab(i = 0) {
        contentText[i].classList.remove("hide");
        contentText[i].classList.add("show");

        tabClass[i].classList.add('tabheader__item_active');
    }

    tabParent.addEventListener('click', (e) => {
        const currentTarget = e.target;
        if (currentTarget && currentTarget.matches('div.tabheader__item')) {
            tabClass.forEach((value, i) => {
                if (value == currentTarget) {
                    tabHide();
                    showTab(i);
                }
            });
        }
    });


    tabHide();
    showTab();



    //Timer


    const deadline = "2021-02-15";

    function calcTime(endtime) {

        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function helper(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }

    }


    function showTime(selector, endtime) {
        const parentElement = document.querySelector(selector),
            days = parentElement.querySelector('#days'),
            hours = parentElement.querySelector('#hours'),
            minutes = parentElement.querySelector('#minutes'),
            seconds = parentElement.querySelector('#seconds');

        const time = setInterval(callHide, 1000);

        callHide();

        function callHide() {
            const r = calcTime(endtime);

            days.innerHTML = helper(r.days);
            hours.innerHTML = helper(r.hours);
            minutes.innerHTML = helper(r.minutes);
            seconds.innerHTML = helper(r.seconds);


            if (r.t <= 0) {
                clearInterval(time);
            }
        }
    }
    showTime('.timer', deadline);


    //Tabs
    const modal = document.querySelector('.modal');
    document.querySelector('body').addEventListener('click', (e) => {
        if (e.target && e.target.matches('[data-modal]')) {
            callModalWindow();
        }
    });

    window.addEventListener('scroll', showScroll);

    function showScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            callModalWindow();
            window.removeEventListener('scroll', showScroll);
        }
    }

    const result = setTimeout(callModalWindow, 50000);

    function callModalWindow() {
        showWindow();
        hideWindow();
        clearInterval(result);

    }

    function showWindow() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    function hideWindow() {
        modal.addEventListener('click', (event) => {
            const t = event.target;
            if (t && t.matches('[data-close]')) {
                closeModal();
            }
        });

    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //Arrow Up
    const arrow = document.querySelector('.test');

    arrow.addEventListener('click', () => {

        const main = setInterval(scrollToMain, 10);

        function scrollToMain() {
            document.documentElement.scrollTop -= 50;

            if (document.documentElement.scrollTop == 0) {
                clearInterval(main);
            }
        }
    });

    //Line
    const line = document.querySelector('.line');

    const i = setInterval(change, 10);

    function change() {
        line.style.width = `${Math.floor(document.documentElement.scrollTop / 2.9)}px`;
    }

    //Menu
    class Menu {
        constructor(src, tittle, content, price, alt, parent, ...classes) {
            this.src = src;
            this.alt = alt;
            this.tittle = tittle;
            this.content = content;
            this.price = price;
            this.transfer = 28;
            this.parent = document.querySelector(parent);
            this.classes = classes;
            this.courseOfValut();
            this.addContentOfMenu();
        }

        courseOfValut() {
            this.price *= this.transfer;
        }

        addContentOfMenu() {
            let div = document.createElement('div');

            if (this.classes.length === 0) {
                div.classList.add('menu__item');
            } else {
                this.classes.forEach(classElement => div.classList.add(classElement));
            }

            div.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.tittle}</h3>
             <div class="menu__item-descr">${this.content}</div>
                <div class="menu__item-divider"></div>
             <div class="menu__item-price">
                 <div class="menu__item-cost">Цена:</div>
                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
             `;

            this.parent.append(div);
        }
    }


    //Data get 
    const dataGet = async url => await axios.get(url);

    dataGet('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altming,
                title,
                descr,
                price
            }) => {
                new Menu(
                    img,
                    title,
                    descr,
                    price,
                    altming,
                    '[data-content]'
                );
            });
        });

    const dataPost = async (url, body) => axios.post(url, body);

    //form
    const forms = document.querySelectorAll('form');
    forms.forEach(item => sendRequest(item));

    const resultRequest = {
        load: 'img/form/spinner.svg',
        success: 'Данные успешно отправленны',
        error: 'Ошибка'
    };

    function sendRequest(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const requestMessage = document.createElement('img');
            requestMessage.src = resultRequest.load;
            requestMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', requestMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            dataPost('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data.data);
                    requestModal(resultRequest.success);
                    requestMessage.remove();
                })
                .catch(() => {
                    requestModal(resultRequest.error);
                })
                .finally(() => form.reset());
        });
    }

    function requestModal(message) {
        const dialog = document.querySelector('.modal__dialog');
        dialog.classList.add('hide');
        showWindow();

        const modalRequestMessage = document.createElement('div');
        modalRequestMessage.classList.add('modal__dialog');
        modalRequestMessage.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        modal.append(modalRequestMessage);

        setTimeout(() => {
            modalRequestMessage.remove();
            dialog.classList.remove('hide');
            dialog.classList.add('show');
            closeModal();
        }, 3000);
    }

    //Slider
    const slides = document.querySelectorAll('.offer__slide'),
        count = document.querySelector('#current'),
        countTotal = document.querySelector('#total'),
        mainElementOfSlides = document.querySelector('.offer__slider-wrapper'),
        slidesFields = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(mainElementOfSlides).width,
        slider = document.querySelector('.offer__slider');

    let index = 1,
        offset = 0;

    countTotal.textContent = helper(slides.length);
    count.textContent = helper(index);

    slidesFields.style.width = 100 * slides.length + '%';
    slidesFields.style.display = 'flex';
    slidesFields.style.transition = '0.5s all';

    mainElementOfSlides.style.overflow = 'hidden';

    slides.forEach(value => value.style.width = width);

    //Dots
    slider.style.position = 'relative';
    let dots = document.createElement('ol');
    dots.classList.add('carousel-indicators');

    let dotsList;

    const addElement = new Promise((resolve,reject) => {
        slides.forEach((value, index) => {
            dots.innerHTML += `
            <li class = "dot" data-content-to="${index + 1}"></li>
         `;
        });

        resolve();
    });

    addElement.then(() => {
        dotsList = document.querySelectorAll('.dot');
        dotsList[index - 1].classList.add('active');
    });

    slider.addEventListener('click', (e) => {

        if (e.target && e.target.matches('li.dot')) {

            dotsList.forEach(value => {

                value.classList.remove('active');

                if (value === e.target) {
                    value.classList.add('active');
                    index = value.dataset.contentTo;
                    offset = +width.slice(0, width.length - 2) * (value.dataset.contentTo - 1);
                    slidesFields.style.transform = `translateX(-${offset}px)`;
                    
                    count.textContent = helper(value.dataset.contentTo);
                }
            });
        }
    });

    slider.append(dots);

    function addActive() {
        dotsList.forEach(value => value.classList.remove('active'));
        dotsList[index - 1].classList.add('active');
    }

    document.querySelector('.offer__slider-next').addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesFields.style.transform = `translateX(-${offset}px)`;

        if (index === slides.length) {
            index = 1;
        } else {
            index++;
        }

        count.textContent = helper(index);

        addActive();
    });

    document.querySelector('.offer__slider-prev').addEventListener('click', () => {
        if (offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesFields.style.transform = `translateX(-${offset}px)`;

        if (index === 1) {
            index = slides.length;
        } else {
            index--;
        }

        count.textContent = helper(index);
        
        addActive();
    });



});