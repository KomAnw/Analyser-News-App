import {CardList} from './CardList.js'
import Glide from '@glidejs/glide'

export class CommitCardList extends CardList{
    constructor(cardsArr, container, dataLength, points){
        super(cardsArr);
        this.container = container;
        this.dataLength = dataLength;
        this.points = points;
    }

    render = () =>{
        this.cardsArr.forEach((item) => {
            this.container.appendChild(item);
        });
    }

    glide = () =>{
        new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 3,
            focusAt: 1,
            gap: 16,
            autoplay: 5000,
            animationDuration: 600,
            peek: 100,
            breakpoints:
            {
                1200: {
                    perView: 3,
                    gap: 8,
                    peek: 50,
                },
        
                1020: {
                    perView: 2,
                    gap: 6,
                    peek: 100,
                },
        
                820: {
                    perView: 2,
                    gap: 6,
                    peek: 50,
                },
        
                768: {
                    perView: 2,
                    gap: 6,
                    peek:
                    {
                        before: 0,
                        after: 50
                    },
                },
        
                740: {
                    perView: 2,
                    gap: 8,
                    peek: 0,
                },
        
                700: {
                    perView: 1,
                    gap: 0,
                    peek: 0
                }
            },
            width: 200,
        }).mount();
    }

    addPoints = () =>{
        let arr = []
        for(let i = 0; i<this.dataLength; i++){
            const point = this.template()
            point.setAttribute("data-glide-dir", `${i}`);
            arr.push(point);
        }
        this.renderPoints(arr)
    }

    template() {
        const markup = `
        <button class="glide__bullet" data-glide-dir=""></button>
		`;
        const elem = document.createElement('div');
        elem.insertAdjacentHTML('beforeend', markup.trim());
        return elem.firstChild;
    }

    renderPoints = (arr) =>{
        arr.forEach((item) => {
            this.points.appendChild(item);
        });
    }
}