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

  public isCategoryRecipeFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.CATEGORY)
  }

  public isRatingRecipeFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.RATING)
  }

  public isRequiredTimeRecipeFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.REQUIRED_TIME)
  }

  public isPageNumberRecipeFeatureEnabled() {
    return this.getEnabledOptionalRecipeFeatures().includes(OptionalRecipeFeature.PAGE_NUMBER)
  }

  private getEnabledOptionalRecipeFeatures() {
    return this.settingsService.getEnabledRecipeFeatures()
  }
}
