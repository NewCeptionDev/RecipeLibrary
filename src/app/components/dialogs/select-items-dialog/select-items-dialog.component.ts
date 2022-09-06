import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map, Observable, ReplaySubject, startWith } from 'rxjs';
import { SelectItemsDialogData } from 'src/app/models/selectItemsDialogData';

@Component({
  selector: 'app-select-items-dialog',
  templateUrl: './select-items-dialog.component.html',
  styleUrls: ['./select-items-dialog.component.scss']
})
export class SelectItemsDialogComponent implements OnInit {

  public data: string[];

  public tableDataSource: ItemDataSource;

  public colums: string[] = ["name", "action"]

  public headline: string;

  public knownItems: string[];

  itemSelect: FormControl = new FormControl();

  filteredItems: Observable<string[]> = new Observable();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: SelectItemsDialogData) { 
    this.headline = dialogData.headline;
    this.data = dialogData.data;
    this.tableDataSource = new ItemDataSource(this.data);
    this.knownItems = dialogData.knownItems;
  }

  ngOnInit(): void {
    this.filteredItems = this.itemSelect.valueChanges.pipe(
      startWith(''),
      map(value => this.filterItems(value || ""))
    )
  }
  
  private filterItems(value: string): string[] {
    const filterValue = value.toLowerCase();

    const itemsToFilter = [...this.knownItems];

    if(!itemsToFilter.includes(value) && !itemsToFilter.includes(filterValue) && value.length > 0) {
      itemsToFilter.push(value);
    }

    return itemsToFilter.filter(option => option.toLowerCase().includes(filterValue) && !this.data.includes(option));
  }

  public onItemSelect(value: string) {
    if(!this.data.includes(value)) {
      this.data.push(value);
      this.itemSelect.setValue("");
      this.tableDataSource.setData(this.data);
    }
  }

  public removeElement(element: string) {
    this.data.splice(this.data.indexOf(element), 1)
  }

}

class ItemDataSource extends DataSource<string> {
  private dataStream = new ReplaySubject<string[]>();

  constructor(initialData: string[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<string[]> {
    return this.dataStream;
  }

  disconnect() {
  }

  setData(data: string[]) {
    this.dataStream.next(data);
  }
}
