import { apply } from "./utils/utils.js";

/**
 * @module CSSMixin
 * @mixin Backed
 * @param {class} base class to extend from
 */

export default (base) => {
  return class CSSMixin extends base {
    // TODO: these are not the droids your looking for... (is this acceptable to use for lit?)
    get #style(): HTMLStyleElement {
      return this.shadowRoot.querySelector('style');
    }

    constructor() {
      super();
    }

    connectedCallback() {
      super.connectedCallback && super.connectedCallback()

      this.#init()
    }
    
    async #init() {
      if ('_$litElement$' in this.constructor) {
        if (this.updateComplete) await this.updateComplete
      }
      this.style.innerHTML = await apply(this.#style.innerHTML)
    }
  }
}
