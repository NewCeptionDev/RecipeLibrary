import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit {

  public foundRecipes: number

  constructor(private recipeService: RecipeService) {
    this.foundRecipes = this.recipeService.getRecipeCount()
  }

  ngOnInit(): void {
  }

}
