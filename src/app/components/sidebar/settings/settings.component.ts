import { ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { MatSlideToggleChange } from "@angular/material/slide-toggle"
import { OptionalRecipeFeature } from "src/app/models/optionalRecipeFeature"
import { SettingsService } from "src/app/services/settings.service"
import { ElectronService } from "../../../services/electron.service"

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  private optionalRecipeFeatures: Map<string, OptionalRecipeFeature> = new Map()

  constructor(
    private electronService: ElectronService,
    private settingsService: SettingsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // Dependency Injection
  }

  ngOnInit(): void {
    this.settingsService.settingsChangedEvent.subscribe(() => {
      this.changeDetectorRef.detectChanges()
    })

    this.optionalRecipeFeatures = new Map([
      ["Categories", OptionalRecipeFeature.CATEGORY],
      ["Rating", OptionalRecipeFeature.RATING],
      ["RequiredTime", OptionalRecipeFeature.REQUIRED_TIME],
    ])
  }

  public importLibrary() {
    this.electronService.requestImportLibrary()
  }

  public changeSavePath() {
    this.electronService.requestNewFileSavePath()
  }

  public getCurrentSavePath(): string {
    return this.settingsService.getRecipePath()
  }

  public getOptionalFeatures() {
    return Array.from(this.optionalRecipeFeatures.keys())
  }

  public isOptionalFeatureEnabled(feature: string) {
    const searchedFeature = this.optionalRecipeFeatures.get(feature)

    if (searchedFeature === undefined) {
      throw new Error("Unknown feature given")
    }

    return this.settingsService.getEnabledRecipeFeatures().includes(searchedFeature)
  }

  public toggleOptionalFeature(change: MatSlideToggleChange) {
    const feature = this.optionalRecipeFeatures.get(change.source.id)

    if (feature !== undefined) {
      if (change.checked) {
        this.settingsService.enableRecipeFeature(feature)
      } else {
        this.settingsService.disableRecipeFeature(feature)
      }
    }
  }

  public formatForFrontend(value: string): string {
    let result = ""

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && value.charAt(i) === value.charAt(i).toString().toUpperCase()) {
        result += " "
      }
      result += value.charAt(i)
    }

    return result
  }
}
