import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Observable } from "rxjs"
import { Recipe } from "src/app/models/recipe"
import { DialogsService } from "src/app/services/dialogs.service"
import { RecipeService } from "src/app/services/recipe.service"
import { ItemDataSource } from "src/app/util/ItemDataSource"

@Component({
  selector: "app-edit-recipes",
  templateUrl: "./edit-recipes.component.html",
  styleUrls: ["./edit-recipes.component.scss"],
})
export class EditRecipesComponent implements OnInit {
  public recipes: Recipe[] = []

  public tableDataSource: ItemDataSource<Recipe> = new ItemDataSource<Recipe>([])

  public columns: string[] = ["name", "edit", "delete"]

  @Output()
  public editRecipe: EventEmitter<Recipe> = new EventEmitter()

  @Input()
  public reloadRecipes: Observable<void> = new Observable()

  constructor(private recipeService: RecipeService, private dialogService: DialogsService) {
    // Dependency Injection
  }

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
  }

  private updateShownRecipes() {
    this.recipes = this.recipeService.getAllRecipes()
    this.tableDataSource.setData(this.recipes)
  }

  public editRecipeTrigger(recipe: Recipe) {
    this.editRecipe.emit(recipe)
  }
}
