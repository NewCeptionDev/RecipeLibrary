export interface Recipe {
  id: number
  recipeName: string
  cookbook: string
  ingredients: string[]
  categories: string[]
  rating: number
  requiredTime: number | undefined
  pageNumber: string
}

export namespace Recipe {
  export function equals(recipe1: Recipe, recipe2: Recipe) {
    const idEquals = recipe1.id === recipe2.id
    const recipeNameEquals = recipe1.recipeName === recipe2.recipeName
    const cookbookEquals = recipe1.cookbook === recipe2.cookbook
    const ingredientsEqual =
      recipe1.ingredients.length === recipe2.ingredients.length &&
      recipe1.ingredients.every((ingredient) => recipe2.ingredients.includes(ingredient))
    const categoriesEqual =
      recipe1.categories.length === recipe2.categories.length &&
      recipe1.categories.every((category) => recipe2.categories.includes(category))
    const ratingEquals = recipe1.rating === recipe2.rating
    const requiredTimeEquals = recipe1.requiredTime === recipe2.requiredTime
    const pageNumberEquals = recipe1.pageNumber === recipe2.pageNumber

    return (
      idEquals &&
      recipeNameEquals &&
      cookbookEquals &&
      ingredientsEqual &&
      categoriesEqual &&
      ratingEquals &&
      requiredTimeEquals &&
      pageNumberEquals
    )
  }
}
