import { Component, Input } from "@angular/core"
import { Recipe } from "../../../models/recipe"

@Component({
  selector: "app-recipe-overview",
  templateUrl: "./recipe-overview.component.html",
  styleUrls: ["./recipe-overview.component.scss"],
})
export class RecipeOverviewComponent {
  @Input()
  recipe: Recipe | undefined
}
