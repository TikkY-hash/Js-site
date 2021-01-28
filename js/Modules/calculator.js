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

export default calc;