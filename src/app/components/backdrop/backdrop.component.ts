import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../../services/recipe.service";
import { SearchService } from "../../services/search.service";

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit {

  public foundRecipes: number

  public showBackdrop = true

  public noSearchResults = false

  constructor(private recipeService: RecipeService, private searchService: SearchService) {
    this.foundRecipes = this.recipeService.getRecipeCount()
    this.searchService.getSearchResultsEventEmitter().subscribe(result => {
      if(result.length > 0) {
        this.showBackdrop = false
      } else {
        this.showBackdrop = true
        this.noSearchResults = true
      }
    })
  }

  ngOnInit(): void {
  }

}
