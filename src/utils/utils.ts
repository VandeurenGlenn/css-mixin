import { classes } from "../styles/classes.js";
import { mixins } from "../styles/mixins.js";
import { CSSMixins } from "../types.js";
import applyClasses from "./apply-classes.js";
import applyMixins from "./apply-mixins.js";

const apply = async (
  string: string,
  config: 
    {classes?: CSSMixins, mixins?: CSSMixins} = {classes: {}, mixins:{}}
  ): Promise<string> => {
  string = await applyClasses(string, config.classes ? {...classes, ...config.classes} : classes)
  string = await applyMixins(string, config.mixins ? {...mixins, ...config.mixins} : mixins)
  return string
}

export {
  apply,
  applyClasses,
  applyMixins
}