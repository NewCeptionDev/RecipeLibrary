import { Recipe } from "./recipe";

export interface Library {
  version: number,
  recipes: Recipe[]
}
