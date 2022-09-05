import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  recipeName: string = "";

  cookbookSelect: FormControl = new FormControl();

  @Input()
  knownCookbooks: string[] = ["Test", "Cookbook", "Cooking", "Try it"];

  filteredCookbooks: Observable<string[]> = new Observable();

  constructor() { }

  ngOnInit(): void {
    this.filteredCookbooks = this.cookbookSelect.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCookbooks(value || ""))
    )
  }
  
  private filterCookbooks(value: string): string[] {
    const filterValue = value.toLowerCase();

    const cookbooksToFilter = [...this.knownCookbooks];

    if(!cookbooksToFilter.includes(value) && !cookbooksToFilter.includes(filterValue) && value.length > 0) {
      cookbooksToFilter.push(value);
    }

    return cookbooksToFilter.filter(option => option.toLowerCase().includes(filterValue));
  }
}
