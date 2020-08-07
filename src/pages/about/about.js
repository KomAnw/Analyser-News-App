import '../../vendor/normalize.css';
import '../index/index.css';
import '../../../node_modules/@glidejs/glide/dist/css/glide.core.min.css'
// import '../../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css'

import Glide from '@glidejs/glide'

const glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    focusAt: 1,
    gap: 16,
    autoplay: 5000,
    animationDuration: 600,
    peek: 100,
    breakpoints:
    {
        1200: {
            perView: 3,
            gap: 8,
            peek: 50,
        },

        1020: {
            perView: 2,
            gap: 6,
            peek: 100,
        },

        820:{
            perView: 2,
            gap: 6,
            peek: 50,
        },

        768:{
            perView: 2,
            gap: 6,
            peek: 
            {
                before: 0,
                after: 50 
            },
        },

        740: {
            perView: 2,
            gap: 8,
            peek: 0,
        },

        700: {
            perView: 1,
            gap: 0,
            peek: 0
        }
    },
    width: 200,
})

// const Example = function (Glide, Components, Events) {
//     return {
//         mount() {
//             console.log(Components.Sizes.slideWidth)
//             Components.Sizes.setupSlides(400)
//         }
//     }
// }

// new Glide('.glide', 'Sizes').mount({
//     'Example': Example
// })
  
glide.mount()