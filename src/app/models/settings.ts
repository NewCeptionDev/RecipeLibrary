import { OptionalRecipeFeature } from "./optionalRecipeFeature"

export interface Settings {
  recipeSavePath: string
  enabledRecipeFeatures: OptionalRecipeFeature[]
}
