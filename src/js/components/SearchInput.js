import {actualDate, futureDate, searchCallback} from '../utils/utils.js';
import {PAGE_SIZE, API_KEY} from '../constants/constants.js'

export class SearchInput {
    constructor(searchCallback, form) {
        this.searchCallback = searchCallback;
        this.form = form;
        this.inputValue = null;
    }

    handlerValidation = () => {
        const input = this.form.querySelector('input');
        const button = this.form.querySelector('button');

        let isValid = this.checkInputValidity(input);
        this.setSubmitButtonState(button, isValid);
    }

    checkInputValidity = (input) => {
        if (input.validity.valueMissing) {
            this.form.querySelector('.error').textContent = 'Нужно ввести ключевое слово';
            this.form.querySelector('.error').classList.add('error_active');
            return false;
        }
        if (input.validity.tooShort || input.validity.tooLong) {
            this.form.querySelector('.error').textContent = 'Длина не может быть меньше 2 или больше 30 символов';
            this.form.querySelector('.error').classList.add('error_active');
            return false;
        }
        this.form.querySelector('.error').classList.remove('error_active');
        return true;
    }

    setSubmitButtonState = (button, isAllValid) => {
        if (isAllValid === true) {
            button.removeAttribute('disabled');
            button.classList.remove('search__button_disabled');
            this.getUserReq();
        } else {
            button.toggleAttribute('disabled', true);
            button.classList.add('search__button_disabled');
        }
    }

    getUserReq = () => {
        this.inputValue = this.form.querySelector('input').value;
    }

    setUserReq = () => {
        event.preventDefault();
        this.url = 'http://newsapi.org/v2/everything?' +
        `q=${this.inputValue}&` + 
        `from=${actualDate}&` +
        `to=${futureDate}&` +
        'sortBy=popularity&' +
        `pageSize=${PAGE_SIZE}&` +
        `apiKey=${API_KEY}`;
        this.searchCallback(this.url, this.inputValue);
        
        this.setSubmitButtonState(this.form.querySelector('button'), false);
    }

    setEventListeners = () => {
        this.form.querySelector('input').addEventListener('input', this.handlerValidation);
        this.form.querySelector('button').addEventListener('click', this.setUserReq);
    }

    removeEventListeners = () => {
    }
}