import '../../vendor/normalize.css';
import '../index/index.css';
import '../../../node_modules/@glidejs/glide/dist/css/glide.core.min.css'
import '../../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css'

import Glide from '@glidejs/glide'

const glide = new Glide('.glide',  {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    focusAt: 1,
    gap: 16,
    autoplay: 3000,
    animationDuration: 600,
    peek: 100,
    breakpoints:
    {
        1000: {
            perView: 2,
            gap: 8,
            peek: 50,
        },

        580: {
            perView: 1,
            gap: 8,
            peek: 50,
        },

        400: {
            perView: 1,
            gap: 8,
            peek: 0,
        }
    },
    width: 200,
})

glide.on('resize', function() {
    return length = 100;
})


glide.mount();