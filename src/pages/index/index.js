import '../../vendor/normalize.css';
import './index.css';
// переменные
import { form } from '../../js/constants/constants.js';
// классы
import { SearchInput } from '../../js/components/SearchInput.js';
// функции
import { searchCallback } from '../../js/utils/utils.js';

const search = new SearchInput(searchCallback, form)
search.setEventListeners();