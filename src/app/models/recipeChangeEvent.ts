import { Recipe } from "./recipe";
import { RecipeAction } from "./recipeAction";

export interface RecipeChangeEvent {
  recipe: Recipe,
  event: RecipeAction
}
