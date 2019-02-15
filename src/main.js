export default class {
    constructor(options = {}) {
        this.defaults = {
            el: document,
            name: 'scroll',
            class: 'is-inview',
            offset: 0,
            repeat: false
        }

        Object.assign(this, this.defaults, options);

        this.windowHeight = window.innerHeight;
        this.els = [];
        this.scrollPosition = 0;
        this.frame = false;

        this.checkScroll = this.checkScroll.bind(this);
        this.checkResize = this.checkResize.bind(this);

        window.addEventListener('scroll', this.checkScroll, false);
        window.addEventListener('resize', this.checkResize, false);

        this.init();
    }

    init() {
        this.scrollPosition = window.scrollY;

        const els = this.el.querySelectorAll('[data-'+this.name+']');

        els.forEach((el, i) => {
            let cl = el.dataset[this.name + '-class'] || this.class;
            let top = el.getBoundingClientRect().top + this.scrollPosition;
            let bottom = top + el.offsetHeight;
            let offset = parseInt(el.dataset[this.name + '-offset']) || parseInt(this.offset);
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
                class: cl,
                top: top + offset,
                bottom: bottom,
                offset: offset,
                repeat: repeat,
                inView: false
            }
        });

        this.detectElements();
    }

    update() {
        this.updateElements();
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
                if ((scrollBottom > el.top) && (scrollTop < el.bottom)) {
                    this.setInView(el, i);
                }
            } else {
                if ((scrollBottom < el.top) || (scrollTop > el.bottom)) {
                    this.setOutOfView(el, i);
                }
            }
        });

        this.frame = false;
    }

    setInView(el, i) {
        if (el.repeat) {
            this.els[i].inView = true;
        } else {
            this.els.splice(i, 1);
        }

        el.el.classList.add(el.class);
    }

    setOutOfView(el, i) {
        this.els[i].inView = false;
        el.el.classList.remove(el.class);
    }

    updateElements() {
        this.els.forEach((el, i) => {
            const top = el.el.getBoundingClientRect().top + this.scrollPosition;
            const bottom = top + el.el.offsetHeight;

            this.els[i].top = top + el.offset;
            this.els[i].bottom = bottom;
        });

        this.frame = false;
    }

    destroy() {
        window.removeEventListener('scroll', this.checkScroll, false);
        window.removeEventListener('resize', this.checkResize, false);
    }
}
