'use strict';


import arrowUp from './Modules/arrow';
import calc from './Modules/calculator';
import card from './Modules/cards';
import form from './Modules/form';
import line from './Modules/line';
import modal from './Modules/modal';
import slider from './Modules/slider';
import tabs from './Modules/tabs';
import timer from './Modules/timer';



document.addEventListener('DOMContentLoaded', () => {

    arrowUp('.test');
    calc();
    card();
    form('.modal','form');
    timer('.timer','2021-02-10');
    line('.line');
    modal('.modal','[data-modal]');
    slider({
        container : '.offer__slider',
        nextArrow : '.offer__slider-next',
        prevArrow : '.offer__slider-prev',
        totalCount : '#total',
        currentCount : '#current',
        sliderWrapper : '.offer__slider-wrapper',
        slide : '.offer__slide',
        sliderInner : '.offer__slider-inner'
    });
    tabs('.tabcontent','.tabheader__item','.tabheader__items','tabheader__item_active');
});