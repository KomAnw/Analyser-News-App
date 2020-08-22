import '../../vendor/normalize.css';
import '../index/index.css';

import { Statistics } from '../../js/components/Statistics'
import {title, newsAtWeek, headers, analyticsContainer} from '../../js/constants/constants.js'

const statistics = new Statistics(title, newsAtWeek, headers, analyticsContainer);
statistics.setGeneralInfo();