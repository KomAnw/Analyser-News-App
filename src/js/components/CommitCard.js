export class CommitCard {
    constructor(options) {
        this.name = options.name;
        this.email = options.email;
        this.date = options.date;
        this.message = options.message;
        this.img = options.img;
        this.url = options.url;
    }

    template() {
        const markup = `
		<li class="glide__slide">
            <a class="gh-card" target="_blank">
                <p class="gh-card__date"></p>
                <div class="gh-card__author">
                    <img alt="Фото автора" class="gh-card__img">
                    <div class="gh-card__info">
                        <h2 class="gh-card__title"></h2>
                        <p class="gh-card__email"></p>
                    </div>
                </div>
                <p class="gh-card__text"></p>
            </a>
        </li>`;
        const elem = document.createElement('div');
        elem.insertAdjacentHTML('beforeend', markup.trim());
        return elem.firstChild;
    }

    create = () => {
        this.card = this.template()
        this.card.querySelector('.gh-card__img').setAttribute("src", `${this.img}`);
        this.card.querySelector('.gh-card__date').textContent = this.date;
        this.card.querySelector('.gh-card__title').textContent = this.name;
        this.card.querySelector('.gh-card__email').textContent = this.email;
        this.card.querySelector('.gh-card__text').textContent = this.message;
        this.card.querySelector('.gh-card').setAttribute("href", `${this.url}`);
        return this.card;
    }
}