export class NewsApi {
    constructor(url) {
        this.url = url;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    async getNews() {
        const response = await fetch(this.url)
        const news = await response.json();
        return news;
    }
} 