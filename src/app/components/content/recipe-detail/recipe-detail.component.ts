import { Component, Input } from "@angular/core"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { SettingsService } from "src/app/services/settings.service"
import { Recipe } from "../../../models/recipe"

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"],
})
export class RecipeDetailComponent {
  @Input()
  recipe: Recipe | undefined

  constructor(private settingsService: SettingsService) {
    // Dependency Injection
  }

  public isCategoryFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.CATEGORY)
  }

  public isRatingFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.RATING)
  }

  private getEnabledOptionalRecipeFeatures() {
    return this.settingsService.getEnabledRecipeFeatures()
  }
}
