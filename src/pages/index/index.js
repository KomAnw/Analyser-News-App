import '../../vendor/normalize.css';
import './index.css';
// переменные
import { form, result } from '../../js/constants/constants.js';
// классы
import { SearchInput } from '../../js/components/SearchInput.js';
// функции
import { searchCallback } from '../../js/utils/utils.js';
import { NewsCard } from '../../js/components/NewsCard.js'
import { NewsCardList } from '../../js/components/NewsCardList.js'


const search = new SearchInput(searchCallback, form)
search.setEventListeners();

if("input" in sessionStorage){
    result.style.display = "flex";
}

window.onload = function () {
    if("data" in sessionStorage){
        const arrCardsNode = [];
    const data = JSON.parse(sessionStorage.getItem('data'));

    data.articles.forEach(item => {
        const newsData = {
            publisher: item.source.name,
            title: item.title,
            date: item.publishedAt,
            paragraph: item.description,
            img: item.urlToImage,
            url: item.url,
        }

        const card = new NewsCard(newsData);
        const cardsNode = card.create();
        arrCardsNode.push(cardsNode);
    })

    const cardList = new NewsCardList(arrCardsNode, result)
    cardList.setEventListener();

    const input = JSON.parse(sessionStorage.getItem('input'));
    form.querySelector('input').value = input;
    }
}