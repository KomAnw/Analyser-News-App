export class Statistics {
    constructor(title, newsAtWeek, headers, analyticsContainer) {
        this.title = title;
        this.newsAtWeek = newsAtWeek;
        this.headers = headers;
        this.analyticsContainer = analyticsContainer;
        this.statistics = JSON.parse(localStorage.getItem('analytics'));
        console.log(this.statistics)
    }

    setGeneralInfo = () => {
        this.title.textContent = `Вы спросили: «${this.statistics.yourReq}»`;
        this.newsAtWeek.textContent = this.statistics.totalResults;
        this.headers.textContent = this.statistics.mentionsNum;
        this.createNode();
    }

    createNode = () => {
        this.arr = []
        let q = 7;
        for (let i = 0; i < 7; i++) {
            this.node = this.template();
            this.node.querySelector('.diagram__date').textContent = this.statistics.arrayDaysAndLines[i]
            this.node.querySelector('.diagram__line').textContent = this.statistics.arrayDaysAndLines[q]
            q += 1;
            this.arr.push(this.node);
        }
        this.render(this.arr)
    }

    lineWith = (item) => {
        item.querySelector('.diagram__line').setAttribute('width', '50%');
    }


    template = () => {
        const markup = `
		<div class="diagram__item">
            <p class="diagram__date"></p>
            <div class="diagram__line"></div>
        </div>`;
        const elem = document.createElement('div');
        elem.insertAdjacentHTML('beforeend', markup.trim());
        return elem.firstChild;
    }

    render = (node) => {
        node.forEach(item => {
            console.log(item)
            this.analyticsContainer.querySelector('.diagram__container').appendChild(item);
            this.lineWith(item)
        });
    }

}

