const PAGE_SIZE = '100';
const API_KEY = 'f1d760e519f4417f8c79c8330b35e998';

const form = document.querySelector('.search');
const searchButton = document.querySelector('.search__button');
const result = document.querySelector('.result');
const preloader = document.querySelector('.preloader');
const nothingFound = document.querySelector('.nothing-found');

const title = document.querySelector('.header__title_page-analytics');
const newsAtWeek = document.querySelector('.week');
const headers = document.querySelector('.in-headers');
const analyticsContainer = document.querySelector('.analytics');

const owner = 'KomAnw';
const repo = 'Analyser-News-App'
const container = document.querySelector('.glide__slides');
const points = document.querySelector('.glide__bullets')


export {form, PAGE_SIZE, API_KEY, result, preloader, nothingFound, searchButton}
export {title, newsAtWeek, headers, analyticsContainer}
export {owner, repo, container, points}
