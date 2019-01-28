export default class {
    constructor(options) {
        this.defaults = {
            el: document,
            name: 'scroll',
            class: 'is-inview',
            repeat: false
        }

        this.el = options.el ? options.el : this.defaults.el;
        this.name = options.name ? options.name : this.defaults.name;
        this.class = options.class ? options.class : this.defaults.class;
        this.repeat = options.repeat ? options.repeat : this.defaults.repeat;

        this.windowHeight = window.innerHeight;
        this.els = [];
        this.scrollPosition = 0;
        this.frame = false;

        window.addEventListener('scroll', () => {
            this.checkScroll();
        }, false);

        window.addEventListener('resize', () => {
            this.checkResize();
        }, false);

        window.onload = () => {
            this.init();
        }
    }

    init() {
        const els = this.el.querySelectorAll('[data-'+this.name+']');

        els.forEach((el, i) => {
            const offset = el.getBoundingClientRect().top;
            const limit = offset + el.offsetHeight;
            let repeat = el.dataset[this.name + '-repeat'];

            if(repeat == 'false') {
                repeat = false;
            } else if (repeat != undefined) {
                repeat = true;
            } else {
                repeat = this.repeat;
            }

            this.els[i] = {
                el: el,
                offset: offset,
                limit: limit,
                repeat: repeat,
                inView: false
            }
        });

        this.checkScroll();
    }

    checkScroll() {
        if (this.els.length) {
            this.scrollPosition = window.scrollY;

            if(!this.frame) {
                requestAnimationFrame(() => {
                    this.detectElements();
                });
                this.frame = true;
            }
        }
    }

    checkResize() {
        if (this.els.length) {
            this.windowHeight = window.innerHeight;

            if(!this.frame) {
                requestAnimationFrame(() => {
                    this.updateElements();
                });
                this.frame = true;
            }
        }
    }

    detectElements() {
        const scrollTop = this.scrollPosition;
        const scrollBottom = scrollTop + this.windowHeight;

        this.els.forEach((el, i) => {
            if (!el.inView) {
                if ((scrollBottom > el.offset) && (scrollTop < el.limit)) {
                    if (el.repeat) {
                        this.els[i].inView = true;
                    } else {
                        this.els.splice(i, 1);
                    }

                    el.el.classList.add(this.class);
                }
            } else {
                if ((scrollBottom < el.offset) || (scrollTop > el.limit)) {
                    this.els[i].inView = false;
                    el.el.classList.remove(this.class);
                }
            }
        });

        this.frame = false;
    }

    updateElements() {
        this.els.forEach((el, i) => {
            const offset = el.el.getBoundingClientRect().top;
            const limit = offset + el.el.offsetHeight;

            this.els[i].offset = offset;
            this.els[i].limit = offset;
        });

        this.frame = false;
    }
}
