import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { DialogsService } from 'src/app/services/dialogs.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { ItemDataSource } from 'src/app/util/ItemDataSource';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.scss']
})
export class EditRecipesComponent implements OnInit {

  public recipes: Recipe[] = [];

  public tableDataSource: ItemDataSource<Recipe>;

  public columns: string[] = ["name", "edit", "delete"]

  constructor(private recipeService: RecipeService, private dialogService: DialogsService) { 
    this.tableDataSource = new ItemDataSource(this.recipes);
    this.updateShownRecipes();
  }

  public openDeleteDialog(recipe: Recipe) {
    this.dialogService.openTwoButtonDialog("Delete recipe", "Are you sure that you want to delete Recipe " + recipe.recipeName + "?\nA deleted recipe cannot be recovered.").afterClosed().subscribe(result => {
      if(result) {
        this.recipeService.removeRecipe(recipe);
        this.updateShownRecipes();
      }
    })
  }

  ngOnInit(): void {
  }

  private updateShownRecipes() {
    this.recipes = this.recipeService.getAllRecipes();
    this.tableDataSource.setData(this.recipes);
  }

}
