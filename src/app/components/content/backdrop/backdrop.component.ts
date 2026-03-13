import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core"
import { RecipeService } from "../../../services/recipe.service"
import { SearchService } from "../../../services/search.service"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-backdrop",
  templateUrl: "./backdrop.component.html",
  styleUrls: ["./backdrop.component.scss"],
  imports: [MatIcon],
})
export class BackdropComponent implements OnInit {
  private recipeService = inject(RecipeService)

  private searchService = inject(SearchService)

  private changeDetector = inject(ChangeDetectorRef)

  public foundRecipes: number = 0

  public showBackdrop = true

  public noSearchResults = false

  ngOnInit(): void {
    this.searchService.getSearchResultsEventEmitter().subscribe((result) => {
      if (result.length > 0) {
        this.showBackdrop = false
      } else {
        this.showBackdrop = true
        this.noSearchResults = true
      }
      this.changeDetector.detectChanges()
    })

    this.recipeService.getRecipeChangeEvent().subscribe(() => {
      this.foundRecipes = this.recipeService.getRecipeCount()
      this.changeDetector.detectChanges()
    })
  }
}
