import { LitElement } from "lit";
import { classes, mixins } from "./styles/styles.js";

/**
 * @module CSSMixin
 * @mixin Backed
 * @param {class} base class to extend from
 */

export default (base) => {
  return class CSSMixin extends base {

    get style() {
      return this.shadowRoot.querySelector('style');
    }
    constructor() {
      super();
    }
    
    connectedCallback() {
      // TODO: test
      console.warn('test!!');
      if (super.connectedCallback) super.connectedCallback();
      // TODO: Implement better way to check if LitMixin is used
      if (this.render) this.hasLit = true;
      else if (this.template) console.log('element');

      this.#init()
    }
    
    async #init() {
      if (this.hasLit) await this.updateComplete
      
      const style = this.shadowRoot.querySelector('style')
      let innerHTML = await this.#applyClasses(style.innerHTML)
      innerHTML = await this.#applyMixins(innerHTML)
      this.style.innerHTML = innerHTML
    }

    #applyMixins(string) {
      const mixinInMixin = string => {
        const matches = string.match(/mixin((.*))/g)
        if (matches) {
          for (const match of matches) {
            const mixin = mixins[match]
            string = string.replace(match, mixin)
          }
        }
        return string
      }

      return new Promise((resolve, reject) => {
        const matches = string.match(/mixin((.*))/g)
        if (matches) for (const match of matches) {
          const mixin = mixinInMixin(mixins[match])
          string = string.replace(match, mixin)
        };
        resolve(string)
      });
    }

    #applyClasses(string) {
      return new Promise((resolve, reject) => {
        const matches = string.match(/apply((.*))/g);
        if (matches) for (const match of matches) {
          string = string.replace(match, classes[match])
        }
        resolve(string)
      });
    }
  }
}