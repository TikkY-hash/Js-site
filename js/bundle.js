/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/Modules/arrow.js":
/*!*****************************!*\
  !*** ./js/Modules/arrow.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function arrowUp (selector) {
     const arrow = document.querySelector(selector);

     arrow.addEventListener('click', () => {
 
         const main = setInterval(scrollToMain, 10);
 
         function scrollToMain() {
             document.documentElement.scrollTop -= 50;
 
             if (document.documentElement.scrollTop == 0) {
                 clearInterval(main);
             }
         }
     });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (arrowUp);

/***/ }),

/***/ "./js/Modules/calculator.js":
/*!**********************************!*\
  !*** ./js/Modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {
     const resultCalc = document.querySelector('.calculating__result span');
     let weight, height, age, ration, gender;
 
     if (localStorage.getItem('gender')) {
         gender = localStorage.getItem('gender');
     } else {
         gender = 'female';
         localStorage.setItem('gender', 'female');
     }
 
     if (localStorage.getItem('ration')) {
         ration = localStorage.getItem('ration');
     } else {
         ration = 1.375;
         localStorage.setItem('ration', 1.375);
     }
 
     function calc() {
         if (!weight || !age || !ration || !gender || !height) {
             resultCalc.textContent = '___';
             return;
         }
 
         if (gender === 'male') {
             resultCalc.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ration);
         } else {
             resultCalc.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ration);
         }
     }
 
     function savePrevInformation(selector,activeClass) {
         const elements = document.querySelectorAll(selector);
         elements.forEach(value => {
             value.classList.remove(activeClass);
             if(value.getAttribute('id') === localStorage.getItem('gender')) {
                 value.classList.add(activeClass);
             }
             if(value.getAttribute('data-count') === localStorage.getItem('ration')) {
                 value.classList.add(activeClass);
             }
         });
     }
 
     function saveInformation(selector, activeClass) {
         const elements = document.querySelectorAll(selector);
         elements.forEach(value => {
             value.addEventListener('click', function () {
 
                 if (this.getAttribute('data-count')) {
                     ration = +this.getAttribute('data-count');
                     localStorage.setItem('ration', +this.getAttribute('data-count'));
                 } else {
                     gender = this.getAttribute('id');
                     localStorage.setItem('gender', this.getAttribute('id'));
                 }
 
                 elements.forEach(value => value.classList.remove(activeClass));
                 this.classList.add(activeClass);
 
                 calc();
             });
         });
     }
 
     function saveInputInformation(selector) {
         const input = document.querySelector(selector);
 
         input.addEventListener('input', function () {
 
             if (this.value.match(/\D/)) {
                 this.style.border = '1px solid red';
             } else {
                 this.style.border = 'none';
             }
 
             switch (this.getAttribute('id')) {
                 case 'height':
                     height = +this.value;
                     break;
                 case 'weight':
                     weight = +this.value;
                     break;
                 case 'age':
                     age = +this.value;
                     break;
             }
             calc();
         });
     }
 
     saveInformation('#gender div', 'calculating__choose-item_active');
     saveInformation('.calculating__choose_big div', 'calculating__choose-item_active');
     saveInputInformation('#height');
     saveInputInformation('#weight');
     saveInputInformation('#age');
     savePrevInformation('#gender div', 'calculating__choose-item_active');
     savePrevInformation('.calculating__choose_big div', 'calculating__choose-item_active');
 
     calc(); 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/Modules/cards.js":
/*!*****************************!*\
  !*** ./js/Modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _Services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Services/services */ "./js/Services/services.js");


function card() {
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
    (0,_Services_services__WEBPACK_IMPORTED_MODULE_0__.dataGet)('http://localhost:3000/menu')
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (card);

/***/ }),

/***/ "./js/Modules/form.js":
/*!****************************!*\
  !*** ./js/Modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/Modules/modal.js");
/* harmony import */ var _Services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Services/services */ "./js/Services/services.js");



function form(selector,form) {
   

    const forms = document.querySelectorAll(form);
    forms.forEach(item => sendRequest(item,selector));

    const resultRequest = {
        load: 'img/form/spinner.svg',
        success: 'Данные успешно отправленны',
        error: 'Ошибка'
    };

    function sendRequest(form,selector) {
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

            (0,_Services_services__WEBPACK_IMPORTED_MODULE_1__.dataPost)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data.data);
                    requestModal(resultRequest.success,selector);
                    requestMessage.remove();
                })
                .catch(() => {
                    requestModal(resultRequest.error,selector);
                })
                .finally(() => form.reset());
        });
    }

    function requestModal(message,selector) {
        const modal = document.querySelector(selector);

        const dialog = document.querySelector('.modal__dialog');
        dialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showWindow)(selector);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(selector);
        }, 3000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/Modules/line.js":
/*!****************************!*\
  !*** ./js/Modules/line.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function line(selector) {
     const line = document.querySelector(selector);

     setInterval(change, 10);
 
     function change() {
         line.style.width = `${Math.floor(document.documentElement.scrollTop / 2.9)}px`;
     }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (line);

/***/ }),

/***/ "./js/Modules/modal.js":
/*!*****************************!*\
  !*** ./js/Modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "showWindow": () => /* binding */ showWindow,
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });

function showWindow(selector) {
    const modal = document.querySelector(selector);
    
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

}

function closeModal(selector) {
    const modal = document.querySelector(selector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal (selector,trigger) {
    const modal = document.querySelector(selector);
    document.querySelector('body').addEventListener('click', (e) => {
        if (e.target && e.target.matches(trigger)) {
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

    const result = setTimeout(callModalWindow, 500000);

    function callModalWindow() {
        showWindow(selector);
        hideWindow();
        clearInterval(result);
    }


    function hideWindow() {
        modal.addEventListener('click', (event) => {
            const t = event.target;
            if (t && t.matches('[data-close]')) {
                closeModal(selector);
            }
        });

    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/Modules/slider.js":
/*!******************************!*\
  !*** ./js/Modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/Modules/timer.js");


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

    total.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.helper)(slides.length);


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
        current.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.helper)(index);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/Modules/tabs.js":
/*!****************************!*\
  !*** ./js/Modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabText,selectorClass,selectorParent,activeClass) {
    const contentText = document.querySelectorAll(tabText),
        tabClass = document.querySelectorAll(selectorClass),
        tabParent = document.querySelector(selectorParent);

    function tabHide() {
        contentText.forEach(value => {
            value.classList.add("hide");
            value.classList.remove("show");
        });

        tabClass.forEach(value => {
            value.classList.remove(activeClass);
        });
    }

    function showTab(i = 0) {
        contentText[i].classList.remove("hide");
        contentText[i].classList.add("show");

        tabClass[i].classList.add(activeClass);
    }

    tabParent.addEventListener('click', (e) => {
        const currentTarget = e.target;
        if (currentTarget && currentTarget.matches(`div${selectorClass}`)) {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/Modules/timer.js":
/*!*****************************!*\
  !*** ./js/Modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "helper": () => /* binding */ helper
/* harmony export */ });

 function helper(num) {
    if (num < 10) {
        return `0${num}`;
    } else {
        return num;
    }

}

function timer(selector,deadline) {

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
    showTime(selector, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer); 


/***/ }),

/***/ "./js/Services/services.js":
/*!*********************************!*\
  !*** ./js/Services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dataPost": () => /* binding */ dataPost,
/* harmony export */   "dataGet": () => /* binding */ dataGet
/* harmony export */ });
const dataPost = async (url, body) => axios.post(url, body);

const dataGet = async url => await axios.get(url);




/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modules_arrow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/arrow */ "./js/Modules/arrow.js");
/* harmony import */ var _Modules_calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modules/calculator */ "./js/Modules/calculator.js");
/* harmony import */ var _Modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modules/cards */ "./js/Modules/cards.js");
/* harmony import */ var _Modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modules/form */ "./js/Modules/form.js");
/* harmony import */ var _Modules_line__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modules/line */ "./js/Modules/line.js");
/* harmony import */ var _Modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Modules/modal */ "./js/Modules/modal.js");
/* harmony import */ var _Modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Modules/slider */ "./js/Modules/slider.js");
/* harmony import */ var _Modules_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Modules/tabs */ "./js/Modules/tabs.js");
/* harmony import */ var _Modules_timer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Modules/timer */ "./js/Modules/timer.js");













document.addEventListener('DOMContentLoaded', () => {

    (0,_Modules_arrow__WEBPACK_IMPORTED_MODULE_0__.default)('.test');
    (0,_Modules_calculator__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_Modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_Modules_form__WEBPACK_IMPORTED_MODULE_3__.default)('.modal','form');
    (0,_Modules_timer__WEBPACK_IMPORTED_MODULE_8__.default)('.timer','2021-02-10');
    (0,_Modules_line__WEBPACK_IMPORTED_MODULE_4__.default)('.line');
    (0,_Modules_modal__WEBPACK_IMPORTED_MODULE_5__.default)('.modal','[data-modal]');
    (0,_Modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
        container : '.offer__slider',
        nextArrow : '.offer__slider-next',
        prevArrow : '.offer__slider-prev',
        totalCount : '#total',
        currentCount : '#current',
        sliderWrapper : '.offer__slider-wrapper',
        slide : '.offer__slide',
        sliderInner : '.offer__slider-inner'
    });
    (0,_Modules_tabs__WEBPACK_IMPORTED_MODULE_7__.default)('.tabcontent','.tabheader__item','.tabheader__items','tabheader__item_active');
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map