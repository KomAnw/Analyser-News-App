import { Api } from './Api.js';

export class GhApi extends Api {
    constructor()
}

/// constants.js
export const API_KEY = 'f1d760e519f4417f8c79c8330b35e998';
export const PAGE_SIZE = 100;

// utils.js
export const createUrl = (url, queryParams) => {
  if (!queryParams) {
    return url
  }
  // TODO: fix it
  const params = Object.keys(queryParams).reduce((acc, currKey) => `${acc}&${currKey}=${queryParams[currKey]}`, '');
  return `${url}?${params}`;
}

// NewsList.js
import NewsCard from 'NewsCard.js';

class NewsList {
  constructor(containerId) {
     this.container = this.getContainerNode(containerId);
     this.newsCards = []
  }

  getContainerNode(containerId) {
    // ...
  }

  //
  updateNews(news) {
    this.newsCards = news.map(newsItem => new NewsCard(newsItem));
    this.renderCards();
  }

  renderCards() {
    this.newsCards.forEach(() => {
      // RENDER KAKTO
    })
    // ....
  }
}
  
// NewsApi.js
import { API_KEY, PAGE_SIZE } from 'src/constants';
import { createUrl } from 'src/utils';

export class NewsApi {
  constructor() {
    this.url = 'http://newsapi.org/v2/everything';
    this.defaultParams = {
      sortBy: 'popularity',
      pageSize: API_KEY,
      apiKey: PAGE_SIZE,
      to: 10,
      from: 0,
    }
  }

  getNews(queryParams) {
    const url = createUrl(this.url, { ...this.defaultParams, ...queryParams })
    return fetch(url).then(res => res.json());
  }
}

// MVC
// index.js
const newsApi = new NewsApi();
const newsList = new NewsList(containerId);
async function callback(searchInput) {
  const news = await newsApi.getNews({ searchInput }); // 1. получаем данные
  // 2. локальное хранилище
  newsList.updateNews(news); // 3. показываем данные
}
const search = new SearchInput(callback, form);