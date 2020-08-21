import '../../vendor/normalize.css';
import '../index/index.css';

import { Statistics } from '../../js/components/Statistics'
import {title, newsAtWeek, headers, analyticsContainer} from '../../js/constants/constants.js'

const st = new Statistics(title, newsAtWeek, headers, analyticsContainer);
st.setGeneralInfo();