import { CSSMixins } from "../types.js";

export default async (string: string, classes: CSSMixins) => {
    const matches = string.match(/apply((.*))/g);
    if (matches) for (const match of matches) {
      string = string.replace(match, classes[match])
    }
    return string
}