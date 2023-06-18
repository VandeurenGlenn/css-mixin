import { CSSMixins } from "../types.js";

export const mixins: CSSMixins = {
  'mixin(--css-row)': `display: flex;
  flex-direction: row;`,

  'mixin(--css-column)': `display: flex;
  flex-direction: column;`,

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
  border-radius: 2px;`
 }