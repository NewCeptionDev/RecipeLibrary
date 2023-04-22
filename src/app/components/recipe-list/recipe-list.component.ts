import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe";
import { SearchService } from "../../services/search.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  public showSearchResults = false

  public selectedRecipe: number = -1

  public shownRecipes: Recipe[] = []

  constructor(private searchService: SearchService) {
    this.searchService.getSearchResultsEventEmitter().subscribe(newSearchResults => {
      this.showSearchResults = true
      this.shownRecipes = newSearchResults
    })
  }

  ngOnInit(): void {
  }

  selectRecipe(selectedRecipe: number): void {
    if(this.selectedRecipe === selectedRecipe) {
      this.selectedRecipe = -1
    } else {
      this.selectedRecipe = selectedRecipe
    }
  }

}
