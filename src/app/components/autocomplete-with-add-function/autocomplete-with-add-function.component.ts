import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete-with-add-function',
  templateUrl: './autocomplete-with-add-function.component.html',
  styleUrls: ['./autocomplete-with-add-function.component.scss']
})
export class AutocompleteWithAddFunctionComponent implements OnInit {

  @Input()
  public labelName: string = "Add new"

  @Input()
  public itemName: string = "Items";

  @Input()
  public knownItems: string[] = [];

  @Input()
  public clearOnSelect: boolean = true;

  itemSelect: FormControl = new FormControl();

  filteredItems: Observable<string[]> = new Observable();

  @Output()
  public onItemSelected: EventEmitter<string> = new EventEmitter();

  @Input()
  public filterFunction: ((val: string) => boolean) | undefined = undefined;

  @Input()
  public refreshFilteredItems: Observable<void> = new Observable();

  constructor() { }

  ngOnInit(): void {
    this.filteredItems = this.itemSelect.valueChanges.pipe(
      startWith(''),
      map(value => this.filterItems(value || ""))
    )

    this.refreshFilteredItems.subscribe(() => {
      this.itemSelect.setValue("");
    })
  }

  private filterItems(value: string): string[] {
    const filterValue = value.toLowerCase();

    const itemsToFilter = [...this.knownItems];

    if(!itemsToFilter.includes(value) && !itemsToFilter.includes(filterValue) && value.length > 0) {
      itemsToFilter.push(value);
    }

    return itemsToFilter.filter(option => option.toLowerCase().includes(filterValue) && (this.filterFunction === undefined || this.filterFunction(option)));
  }

  public onItemSelect(value: string) {
    this.onItemSelected.emit(value);
    if(this.clearOnSelect) {
      this.itemSelect.setValue("");
    }
  }
}
