# css-mixin
Css mixin


## what?

```js
import mixin from 'css-mixin'
import { LitElement, html } from 'lit'

class MyElement extends mixin(LitElement) {
  render() {
    return html`
      <style>
        :host() {
          mixin(--css-column)
        }

        header {
          mixin(--css-header)
        }
      </style>
    `
  }
}

```