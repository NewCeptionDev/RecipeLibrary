import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SelectItemsDialogData} from 'src/app/models/selectItemsDialogData';
import {ItemDataSource} from 'src/app/util/ItemDataSource';

@Component({
  selector: 'app-select-items-dialog',
  templateUrl: './select-items-dialog.component.html',
  styleUrls: ['./select-items-dialog.component.scss'],
})
export class SelectItemsDialogComponent implements OnInit {
  public data: string[] = [];

  public tableDataSource: ItemDataSource<string>;

  public columns: string[] = ['name', 'action'];

  public headline: string;

  public onlyKnownItems: boolean = false;

  public refreshAutocompleteItems: EventEmitter<void> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: SelectItemsDialogData
  ) {
    this.headline = dialogData.headline;
    this.data = dialogData.data;
    this.tableDataSource = new ItemDataSource(this.data);
    this.onlyKnownItems = dialogData.onlyAllowKnownItems ?? false;
  }

  ngOnInit(): void {}

  notAlreadyIncludedInData = (val: string): boolean => {
    return !this.data.includes(val);
  };

  public onItemSelect(value: string) {
    if (!this.data.includes(value)) {
      this.data.push(value);
      this.tableDataSource.setData(this.data);
    }
  }

  public removeElement(element: string) {
    this.data.splice(this.data.indexOf(element), 1);
    this.tableDataSource.setData(this.data);
    this.refreshAutocompleteItems.emit();
  }
}
