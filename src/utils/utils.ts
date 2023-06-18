import { classes } from "../styles/classes.js";
import { mixins } from "../styles/mixins.js";
import applyClasses from "./apply-classes.js";
import applyMixins from "./apply-mixins.js";

const apply = async (string: string) => {
  string = await applyClasses(string, classes)
  string = await applyMixins(string, mixins)
  return string
}

export {
  apply,
  applyClasses,
  applyMixins
}