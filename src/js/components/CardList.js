export class CardList {
    constructor(cardsArr) {
        this.cardsArr = cardsArr;
    }

    render = (cards) => {
        cards.forEach((item, current) => {
            setTimeout(()=>{
                this.container.appendChild(item);
            }, current * 200)
        });
    }
}