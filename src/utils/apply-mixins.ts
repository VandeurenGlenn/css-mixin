import { CSSMixins } from "../types.js"

const mixinInMixin = async (string: string, mixins: CSSMixins): Promise<string> => {
  const matches = string.match(/mixin\(\-\-(.*)\)/g);
  if (matches) {
    for (const match of matches) {
      const mixin = mixins[match]
      string = string.replace(match, mixin)
    }
  }
  return string
}

export default async (string: string, mixins: CSSMixins): Promise<string> => {
  const matches = string.match(/mixin\(\-\-(.*)\)/g);
  if (matches) for (const match of matches) {
    const mixin = await mixinInMixin(mixins[match], mixins)
    string = string.replace(match, mixin)
  }
  return string
}