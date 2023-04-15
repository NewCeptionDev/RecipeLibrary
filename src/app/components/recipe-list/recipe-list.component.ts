import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  public selectedRecipe: number = -1

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  getRecipes(): Recipe[] {
    return this.recipeService.getAllRecipes()
  }

  selectRecipe(selectedRecipe: number): void {
    if(this.selectedRecipe === selectedRecipe) {
      this.selectedRecipe = -1
    } else {
      this.selectedRecipe = selectedRecipe
    }
  }

}
