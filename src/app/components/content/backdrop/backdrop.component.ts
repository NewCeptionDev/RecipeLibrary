import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { RecipeService } from "../../../services/recipe.service"
import { SearchService } from "../../../services/search.service"

@Component({
  selector: "app-backdrop",
  templateUrl: "./backdrop.component.html",
  styleUrls: ["./backdrop.component.scss"],
})
export class BackdropComponent implements OnInit {
  public foundRecipes: number = 0

  public showBackdrop = true

  public noSearchResults = false

  constructor(private recipeService: RecipeService, private searchService: SearchService, private changeDetector: ChangeDetectorRef) {
    this.searchService.getSearchResultsEventEmitter().subscribe((result) => {
      if (result.length > 0) {
        this.showBackdrop = false
      } else {
        this.showBackdrop = true
        this.noSearchResults = true
      }
    })

    this.recipeService.recipeChangeEvent.subscribe(() => {
      this.foundRecipes = this.recipeService.getRecipeCount();
      this.changeDetector.detectChanges()
    })
  }

  ngOnInit(): void {}
}
