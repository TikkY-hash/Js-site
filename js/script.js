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

    new Menu(
        'img/tabs/vegy.jpg',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        7,
        'image',
        '[data-content]',

    );

    new Menu(
        'img/tabs/elite.jpg',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        'image',
        '[data-content]',

    );

    new Menu(
        'img/tabs/post.jpg',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное  количество белков за счет тофу и импортных вегетарианских стейков.!',
        8,
        'image',
        '[data-content]',

    );

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
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            fetch('server.php',{
                method: "POST",
                headers : {
                    'Content-type': 'application/json'
                 },
                body : JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
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

 

});