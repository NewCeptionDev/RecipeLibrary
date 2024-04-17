import { OptionalRecipeFeature } from "./OptionalRecipeFeature"

export interface Settings {
  recipeSavePath: string
  enabledRecipeFeatures: OptionalRecipeFeature[]
}
