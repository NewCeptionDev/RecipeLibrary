import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { AutocompleteWithAddFunctionComponent } from '../autocomplete-with-add-function/autocomplete-with-add-function.component';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  @Input()
  recipeInput: Recipe | undefined;

  recipe: Recipe = {
    recipeName: "",
    cookbook: "",
    ingredients: [],
    categories: [],
    rating: -1
  };

  editing: boolean = false;

  knownCookbooks: string[];

  knownIngredients: string[];

  knownCategories: string[];

  filteredCookbooks: Observable<string[]> = new Observable();

  @Output()
  public onRecipeChange: EventEmitter<void> = new EventEmitter();

  constructor(private recipeService: RecipeService) {
    this.knownCookbooks = this.recipeService.getAllKnownCookbooks();
    this.knownIngredients = this.recipeService.getAllKnownIngredients();
    this.knownCategories = this.recipeService.getAllKnownCategories();
   }

  ngOnInit(): void {
    if(this.recipeInput) {
      this.editing = true;
      this.recipe = {...this.recipeInput};
    }
  }


  public updateRating(newRating: number) {
      this.recipe.rating = newRating;
  }

  public updateSelectedIngredients(ingredientList: string[]) {
    this.recipe.ingredients = ingredientList;
  }

  public updateSelectedCategories(categoryList: string[]) {
    this.recipe.categories = categoryList;
  }

  public updateCookbookName(name: string) {
    this.recipe.cookbook = name;
  }

  public finalizeRecipe() {
    if(this.editing && this.recipeInput) {
      this.recipeService.updateRecipe(this.recipeInput, this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }
    this.onRecipeChange.emit();
  }
}
