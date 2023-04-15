import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../../models/recipe";

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  @Input()
  recipe: Recipe | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
