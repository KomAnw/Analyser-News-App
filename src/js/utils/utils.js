import { NewsApi } from '../../js/modules/NewsApi.js';
import { NewsCard } from '../components/NewsCard.js'
import { NewsCardList } from '../components/NewsCardList.js'

import { result, preloader, nothingFound, searchButton } from '../constants/constants.js'

let arrCardsNode = [];
let arrSorage = [];

const date = new Date();

function getActualDate() {
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const day = date.getDate()
    if (month > 10) {
        const actualDate = `${year}-${month}-${day}`
        return actualDate
    }
    else {
        const actualDate = `${year}-0${month}-${day}`
        return actualDate
    }
}

function dateForSevenDays() {
    const now7 = new Date();
    const week = now7.setDate(date.getDate() - 6);
    const week7 = new Date(week);
    const year = week7.getFullYear();
    const month = week7.getMonth() + 1;
    const day = week7.getDate();
    if (month > 10) {
        const actualDate = `${year}-${month}-${day}`
        return actualDate
    }
    else {
        const actualDate = `${year}-0${month}-${day}`
        return actualDate
    }
}

const actualDate = getActualDate();
const futureDate = dateForSevenDays();

//Функции прелоадера
function error() {
    nothingFound.style.display = "flex"
}

function nothingFoundError() {
    nothingFound.querySelector('.nothing-found__title').textContent = 'Во время запроса произошла ошибка.';
    nothingFound.querySelector('.nothing-found__paragraph').textContent = `Возможно, проблема с соединением или сервер недоступен.
    Подождите немного и попробуйте ещё раз`;
    nothingFound.style.display = "flex"
}

function preloaderClose() {
    preloader.style.display = "none"
}

function resetAllContainers() {
    preloader.style.display = "flex";
    nothingFound.style.display = "none";
    result.style.display = "none"
}

export function searchCallback(url, inputValue) {

    resetAllContainers();

    const newsApi = new NewsApi(url);
    newsApi.getNews()
        .then(data => {
            function resultStatus() {
                if (!data.totalResults) {
                    error();
                }
                else {
                    result.style.display = "flex";
                    createNewsCard(data)
                }
            }
            pushDataToStorage(data, inputValue);
            setTimeout(resultStatus, 1000);
        })
        .catch(() => setTimeout(nothingFoundError, 1000))
        .finally(() => setTimeout(preloaderClose, 1000))

    function createNewsCard(data) {
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
            arrSorage.push(cardsNode)
        })
        addCardToList(arrCardsNode);
        arrCardsNode = [];
    }

    function pushDataToStorage(data, inputValue) {
        sessionStorage.setItem('input', JSON.stringify(inputValue))
        sessionStorage.setItem('data', JSON.stringify(data))

        const mentions = numberOfMentions(data, inputValue);
        const dateArr = dateForStatistics();
        const articlesOnDay = numberOfArticles(data);
        const articlesOnDayArr =[]
        for(let i in articlesOnDay){
            articlesOnDayArr.push(articlesOnDay[i])
        }
        const arrayDaysAndLines = dateArr.concat(articlesOnDayArr)
        const reqData = {
            yourReq: inputValue,
            totalResults: data.totalResults,
            mentionsNum: mentions,
            date: dateArr,
            graph: articlesOnDay,
            arrayDaysAndLines: arrayDaysAndLines,
        }
        const jsonObj = JSON.stringify(reqData)
        localStorage.setItem('analytics', jsonObj)
    }
}

function addCardToList(arrCardsNode) {
    const cardList = new NewsCardList(arrCardsNode, result)
    cardList.setEventListener();
    unblockSearchButton();
}

//функции для lStorage
function numberOfMentions(data, inputValue) {
    let counter = 0;
    const reg = new RegExp(`${inputValue}`, 'gi');
    data.articles.forEach(item => {
        if (item.description.match(reg)) {
            counter += 1;
        }
    })
    return counter
}

function dateForStatistics() {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const dateSeven = date.setDate(date.getDate() - 6);
    const newDate = new Date(dateSeven)
    const dateAndDay = [];
    let today = newDate.getDay();
    let day = null;
    for (let i = 0; i < 7; i++) {
        if (today > 6) {
            today = 0;
        }
        const date = newDate.getDate() + i;
        for (let q in days) {
            if (q == today) {
                day = days[q]
            }
        }
        dateAndDay.push(`${date}, ${day}`)
        today++;
    }
    return dateAndDay;
}

function numberOfArticles(data) {
    const arr = []
    data.articles.forEach(item => {
        const firstStr = item.publishedAt.match(/\d+T/)
        const lastStr = firstStr[0].split(/T/).join('').substr([0][1])
        arr.push(lastStr)

    })

    const numArticles = arr.reduce(function (acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});
    return numArticles;
}

//разблокировка кнопки после запроса
function unblockSearchButton() {
    searchButton.removeAttribute('disabled');
    searchButton.classList.remove('search__button_disabled');
}


export { actualDate, futureDate }