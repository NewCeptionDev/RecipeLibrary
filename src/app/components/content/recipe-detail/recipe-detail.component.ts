import { Component, Input, inject } from "@angular/core"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { SettingsService } from "src/app/services/settings.service"
import { Recipe } from "../../../models/recipe"
import { MatIcon } from "@angular/material/icon";
import { SelectedItemsDisplayComponent } from "../../util/selected-items-display/selected-items-display.component";
import { RequiredTimeDisplayComponent } from "../../util/required-time-display/required-time-display.component";
import { RatingDisplayComponent } from "../../util/rating-display/rating-display.component";
import { PageNumberDisplayComponent } from "../../util/page-number-display/page-number-display.component";

@Component({
    selector: "app-recipe-detail",
    templateUrl: "./recipe-detail.component.html",
    styleUrls: ["./recipe-detail.component.scss"],
    imports: [MatIcon, SelectedItemsDisplayComponent, RequiredTimeDisplayComponent, RatingDisplayComponent, PageNumberDisplayComponent]
})
export class RecipeDetailComponent {
  private settingsService = inject(SettingsService);

  @Input()
  recipe: Recipe | undefined

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
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
