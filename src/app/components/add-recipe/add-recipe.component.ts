import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { AutocompleteWithAddFunctionComponent } from '../autocomplete-with-add-function/autocomplete-with-add-function.component';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipeName: string = "";

  cookbookName: string = "";

  selectedIngredients: string[] = [];

  selectedCategories: string[] = [];

  rating: number = -1;

  knownCookbooks: string[];

  knownIngredients: string[];

  knownCategories: string[];

  filteredCookbooks: Observable<string[]> = new Observable();

  @Output()
  public onRecipeAdded: EventEmitter<void> = new EventEmitter();

  constructor(private recipeService: RecipeService) {
    this.knownCookbooks = this.recipeService.getAllKnownCookbooks();
    this.knownIngredients = this.recipeService.getAllKnownIngredients();
    this.knownCategories = this.recipeService.getAllKnownCategories();
   }

  ngOnInit(): void {
  }


  public updateRating(newRating: number) {
    this.rating = newRating;
  }

  public updateSelectedIngredients(ingredientList: string[]) {
    this.selectedIngredients = ingredientList;
  }

  public updateSelectedCategories(categoryList: string[]) {
    this.selectedCategories = categoryList;
  }

  public updateCookbookName(name: string) {
    this.cookbookName = name;
  }

  public addRecipe() {
    this.recipeService.addRecipe({
      recipeName: this.recipeName,
      cookbook: this.cookbookName,
      ingredients: this.selectedIngredients,
      categories: this.selectedCategories,
      rating: this.rating
    });
    this.onRecipeAdded.emit();
  }
}
