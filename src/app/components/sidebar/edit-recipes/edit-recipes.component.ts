import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core"
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import { Recipe } from "src/app/models/recipe"
import { DialogsService } from "src/app/services/dialogs.service"
import { RecipeService } from "src/app/services/recipe.service"
import { ItemDataSource } from "src/app/util/ItemDataSource"
import { MatFormField, MatInput } from "@angular/material/input"
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow,
} from "@angular/material/table"
import { MatIconButton } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon"

@Component({
  selector: "app-edit-recipes",
  templateUrl: "./edit-recipes.component.html",
  styleUrls: ["./edit-recipes.component.scss"],
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
  ],
})
export class EditRecipesComponent implements OnInit {
  private recipeService = inject(RecipeService)

  private dialogService = inject(DialogsService)

  public recipes: Recipe[] = []

  public tableDataSource: ItemDataSource<Recipe> = new ItemDataSource<Recipe>([])

  public columns: string[] = ["name", "edit", "delete"]

  @Output()
  public editRecipe: EventEmitter<Recipe> = new EventEmitter()

  @Input()
  public reloadRecipes: Observable<void> = new Observable()

  private searchTerm: string = ""

  public searchRecipeFormControl: FormControl = new FormControl(this.searchTerm)

  public async openDeleteDialog(recipe: Recipe) {
    const confirmDelete = await this.dialogService.deleteRecipe(recipe.recipeName)

    if (confirmDelete) {
      this.recipeService.removeRecipe(recipe.id)
      this.updateShownRecipes()
    }
  }

  ngOnInit(): void {
    this.updateShownRecipes()
    this.reloadRecipes.subscribe(() => this.updateShownRecipes())

    this.searchRecipeFormControl.valueChanges.subscribe((change: string) => {
      this.searchTerm = change
      this.updateShownRecipes()
    })
  }

  private updateShownRecipes() {
    this.recipes = this.recipeService
      .getAllRecipes()
      .filter((recipe) => recipe.recipeName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    this.tableDataSource.setData(this.recipes)
  }

  public editRecipeTrigger(recipe: Recipe) {
    this.editRecipe.emit(recipe)
  }
}
