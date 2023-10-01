import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms"
import { Observable, map, startWith } from "rxjs"
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";

@Component({
  selector: "app-autocomplete-with-add-function",
  templateUrl: "./autocomplete-with-add-function.component.html",
  styleUrls: ["./autocomplete-with-add-function.component.scss"],
})
export class AutocompleteWithAddFunctionComponent implements OnInit {
  @Input()
  public labelName: string = "Add new"

  @Input()
  public itemName: string = "Items"

  @Input()
  public knownItems: string[] = []

  @Input()
  public startValue: string | undefined

  @Input()
  public clearOnSelect: boolean = true

  itemSelect: FormControl = new FormControl()

  filteredItems: Observable<string[]> = new Observable()

  @Output()
  public itemSelected: EventEmitter<string> = new EventEmitter()

  @Input()
  public filterFunction: ((val: string) => boolean) | undefined = undefined

  @Input()
  public refreshFilteredItems: Observable<void> = new Observable()

  @Input()
  public disableAddFunction: boolean = false

  @ViewChild('autoCompleteInputField')
  private autocompleteInputElement!: ElementRef<HTMLInputElement>

  @ViewChild('autoCompleteInputField', {read: MatAutocompleteTrigger})
  private autocompleteTrigger!: MatAutocompleteTrigger

  ngOnInit(): void {
    if (this.startValue) {
      this.itemSelect.setValue(this.startValue)
    }

    this.filteredItems = this.itemSelect.valueChanges.pipe(
      startWith(""),
      map((value) => this.filterItems(value || ""))
    )

    this.refreshFilteredItems.subscribe(() => {
      this.itemSelect.setValue("")
    })
  }

  private filterItems(value: string): string[] {
    const filterValue = value.toLowerCase()

    const itemsToFilter = [...this.knownItems]

    if (
      !this.disableAddFunction &&
      !itemsToFilter.includes(value) &&
      !itemsToFilter.includes(filterValue) &&
      value.length > 0
    ) {
      itemsToFilter.push(value)
    }

    return itemsToFilter.filter(
      (option) =>
        option.toLowerCase().includes(filterValue) &&
        (this.filterFunction === undefined || this.filterFunction(option))
    )
  }

  public onItemSelect(value: string) {
    this.itemSelected.emit(value)
    if (this.clearOnSelect) {
      this.itemSelect.setValue("")
    }
  }

  public handleKeyUpEvent(keyUpEvent: KeyboardEvent) {
    if(keyUpEvent.key === "Enter" && !this.disableAddFunction) {
      const value = this.autocompleteInputElement.nativeElement.value

      if(value.trim() === "") {
        return;
      }

      this.onItemSelect(value.trim())
      this.autocompleteTrigger.closePanel()

      keyUpEvent.preventDefault()
    }
  }
}
