import { Component, Input } from "@angular/core"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { SettingsService } from "src/app/services/settings.service"
import { Recipe } from "../../../models/recipe"

@Component({
  selector: "app-recipe-overview",
  templateUrl: "./recipe-overview.component.html",
  styleUrls: ["./recipe-overview.component.scss"],
})
export class RecipeOverviewComponent {
  @Input()
  recipe: Recipe | undefined

  constructor(private settingsService: SettingsService) {
    // Dependency Injection
  }

  public isRatingRecipeFeatureEnabled() {
    return this.getEnabledRecipeFeature().includes(OptionalRecipeFeature.RATING)
  }

  public isRequiredTimeRecipeFeatureEnabled() {
    return this.getEnabledRecipeFeature().includes(OptionalRecipeFeature.REQUIRED_TIME)
  }

  private getEnabledRecipeFeature() {
    return this.settingsService.getEnabledRecipeFeatures()
  }
}
