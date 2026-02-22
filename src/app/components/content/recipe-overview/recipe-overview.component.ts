import { Component, Input, inject } from "@angular/core"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { SettingsService } from "src/app/services/settings.service"
import { Recipe } from "../../../models/recipe"
import { MatIcon } from "@angular/material/icon";
import { RequiredTimeDisplayComponent } from "../../util/required-time-display/required-time-display.component";
import { RatingDisplayComponent } from "../../util/rating-display/rating-display.component";

@Component({
    selector: "app-recipe-overview",
    templateUrl: "./recipe-overview.component.html",
    styleUrls: ["./recipe-overview.component.scss"],
    imports: [MatIcon, RequiredTimeDisplayComponent, RatingDisplayComponent]
})
export class RecipeOverviewComponent {
  private settingsService = inject(SettingsService);

  @Input()
  recipe: Recipe | undefined

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
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
