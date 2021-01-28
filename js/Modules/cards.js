import {dataGet} from '../Services/services';

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
}

export default card;