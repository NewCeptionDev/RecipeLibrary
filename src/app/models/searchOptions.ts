import { SortOptions } from "./sortOptions";
import { SortDirection } from "./sortDirection";

export interface SearchOptions {
  minimumRating: number
  requiredIngredients: string[]
  includedCategories: string[]
  includedCookbooks: string[]
  sortOption?: SortOptions
  sortDirection?: SortDirection
}
