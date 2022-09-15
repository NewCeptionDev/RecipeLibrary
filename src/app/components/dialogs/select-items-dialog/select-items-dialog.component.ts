import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map, Observable, ReplaySubject, startWith } from 'rxjs';
import { SelectItemsDialogData } from 'src/app/models/selectItemsDialogData';
import { ItemDataSource } from 'src/app/util/ItemDataSource';

@Component({
  selector: 'app-select-items-dialog',
  templateUrl: './select-items-dialog.component.html',
  styleUrls: ['./select-items-dialog.component.scss']
})
export class SelectItemsDialogComponent implements OnInit {

  public data: string[] = [];

  public tableDataSource: ItemDataSource<string>;

  public columns: string[] = ["name", "action"]

  public headline: string;

  public refreshAutocompleteItems: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: SelectItemsDialogData) { 
    this.headline = dialogData.headline;
    this.data = dialogData.data;
    this.tableDataSource = new ItemDataSource(this.data);
  }

  ngOnInit(): void {
  }

  notAlreadyIncludedInData = (val: string): boolean => {
    return !this.data.includes(val);
  }

  public onItemSelect(value: string) {
    if(!this.data.includes(value)) {
      this.data.push(value);
      this.tableDataSource.setData(this.data);
    }
  }

  public removeElement(element: string) {
    this.data.splice(this.data.indexOf(element), 1)
    this.tableDataSource.setData(this.data);
    this.refreshAutocompleteItems.emit();
  }

}
