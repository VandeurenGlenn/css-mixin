/**
 * @module LitMixin
 * @mixin Backed
 * @param {class} base class to extend from
 */
const mixins = {
    'mixin(--css-row)': `display: flex;
        flex-direction: row;
  `,
    'mixin(--css-column)': `display: flex;
        flex-direction: column;
  `,
    'mixin(--css-center)': `align-items: center;`,
    'mixin(--css-header)': `height: 128px;
        width: 100%;
        background: var(--primary-color);
        color: var(--text-color);
        mixin(--css-column)`,
    'mixin(--css-flex)': `flex: 1;`,
    'mixin(--css-flex-2)': `flex: 2;`,
    'mixin(--css-flex-3)': `flex: 3;`,
    'mixin(--css-flex-4)': `flex: 4;`,
    'mixin(--material-palette)': `--dark-primary-color: #00796B;
        --light-primary-color: #B2DFDB;
        --primary-color: #009688;
        --text-color: #FFF;
        --primary-text-color: #212121;
        --secondary-text-color: #757575;
        --divider-color: #BDBDBD;
        --accent-color: #4CAF50;
        --disabled-text-color: #BDBDBD;
        --primary-background-color: #f9ffff;
        --dialog-background-color: #FFFFFF;`,
    'mixin(--css-hero)': `display: flex;
        max-width: 600px;
        max-height: 340px;
        height: 100%;
        width: 100%;
        box-shadow: 3px 2px 4px 2px rgba(0,0,0, 0.15),
                    -2px 0px 4px 2px rgba(0,0,0, 0.15);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 2px;
  `
};
const classes = {
    'apply(--css-row)': `.row {
        mixin(--css-row)
      }
   `,
    'apply(--css-column)': `.column {
        mixin(--css-column)
      }
   `,
    'apply(--css-flex)': `.flex {
        mixin(--css-flex)
      }
   `,
    'apply(--css-flex-2)': `.flex-2 {
     mixin(--css-flex-2)
   }`,
    'apply(--css-flex-3)': `.flex-3 {
     mixin(--css-flex-3)
   }`,
    'apply(--css-flex-4)': `.flex-4 {
     mixin(--css-flex-4)
   }`,
    'apply(--css-center)': `.center {
        align-items: center;
      }
   `,
    'apply(--css-center-center)': `.center-center {
        align-items: center;
        justify-content: center;
      }
   `,
    'apply(--css-header)': `header, .header {
     mixin(--css-header)
   }`,
    'apply(--css-hero)': `.hero {
      mixin(--css-hero)
   }`
};
var mixin = base => {
    return class CSSMixin extends base {
        get style() {
            return this.shadowRoot.querySelector('style');
        }
        constructor() {
            super();
            // this._transformClass = this._transformClass.bind(this)
        }
        connectedCallback() {
            // TODO: test
            console.warn('test!!');
            if (super.connectedCallback)
                super.connectedCallback();
            // TODO: Implement better way to check if LitMixin is used
            if (this.render)
                this.hasLitMixin = true;
            else if (this.template)
                console.log('element');
            this._init();
        }
        _init() {
            if (this.hasLitMixin) {
                if (!this.rendered) {
                    return requestAnimationFrame(() => {
                        this._init();
                    });
                }
            }
            const style = this.shadowRoot.querySelector('style');
            // const matches = style.innerHTML.match(/apply((.*))/g);
            this._applyClasses(style.innerHTML).then(innerHTML => {
                if (innerHTML)
                    this.style.innerHTML = innerHTML;
                this._applyMixins(style.innerHTML).then(innerHTML => {
                    if (innerHTML)
                        this.style.innerHTML = innerHTML;
                });
            }).catch(error => {
                console.error(error);
            });
            // this._applyVariables(matches, style);
        }
        _applyMixins(string) {
            const mixinInMixin = string => {
                const matches = string.match(/mixin((.*))/g);
                if (matches) {
                    for (const match of matches) {
                        const mixin = mixins[match];
                        string = string.replace(match, mixin);
                    }
                }
                return string;
            };
            return new Promise((resolve, reject) => {
                const matches = string.match(/mixin((.*))/g);
                if (matches)
                    for (const match of matches) {
                        const mixin = mixinInMixin(mixins[match]);
                        console.log(mixin);
                        string = string.replace(match, mixin);
                        // return [
                        //   match, mixins[match]
                        // ]
                    }
                resolve(string);
            });
        }
        _applyClasses(string) {
            return new Promise((resolve, reject) => {
                const matches = string.match(/apply((.*))/g);
                if (matches)
                    for (const match of matches) {
                        // this._applyMixins(classes[match]).then(klass => {
                        string = string.replace(match, classes[match]);
                        // });
                    }
                // this.style.innerHTML = string;
                resolve(string);
            });
        }
    };
};

export { mixin as default };
