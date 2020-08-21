export class Card {
    constructor(data) {
        this.newsUrl = data.url;
        this.date = data.date;
        this.title = data.title;
        this.paragraph = data.paragraph;
        this.publisher = data.publisher;
        this.img = data.img;
        this.card = null;
    }
    template() {
        const markup = `
		<a href="" class="card" target="_blank">
            <img src="" alt="Картинка новости" class="card__image">
            <p class="card__date"></p>
            <h3 class="card__title"></h3>
            <p class="card__paragraph"></p>
            <p class="card__publisher"></p>
        </a>`;
        const elem = document.createElement('div');
        elem.insertAdjacentHTML('beforeend', markup.trim());
    	return elem.firstChild;
    }

    create = () => {
        this.card = this.template()
        this.card.querySelector('.card__image').setAttribute("src", `${this.img}`);
        this.card.querySelector('.card__date').textContent = this.date;
        this.card.querySelector('.card__title').textContent = this.title;
        this.card.querySelector('.card__paragraph').textContent = this.paragraph;
        this.card.querySelector('.card__publisher').textContent = this.publisher;
        this.card.setAttribute("href", `${this.newsUrl}`);
        return this.card;
    }
}