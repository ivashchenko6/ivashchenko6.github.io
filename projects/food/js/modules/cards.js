import { getResource } from "../services/services";

function cards() {
    
    class Card {
        constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.img = img;
            this.altimg = altimg;
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27;
        }

        changeToUAH() {
            this.price *= this.transfer;
        }



        render() {
            this.changeToUAH();
            const div = document.createElement('div');
            if(this.classes.length === 0) {
                div.classList.add('menu__item');
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            
            div.innerHTML = `
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(div);

        }
    }

    

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    
    
}

export default cards;