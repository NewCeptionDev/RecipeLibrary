export interface SearchOptions {
  searchTerm: string,
  minimumRating: number,
  requiredIngredients: string[],
  includedCategories: string[],
  includedCookbooks: string[]
}
