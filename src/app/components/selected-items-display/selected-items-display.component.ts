import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItemsDialogData } from 'src/app/models/selectItemsDialogData';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-selected-items-display',
  templateUrl: './selected-items-display.component.html',
  styleUrls: ['./selected-items-display.component.scss']
})
export class SelectedItemsDisplayComponent implements OnInit {

  @Input()
  public editable: boolean = true;

  @Input()
  public data: string[] = []

  public colums: string[] = ["name", "action"]

  @Input()
  public headline: string = "Name";

  @Input()
  public knownItems: string[] = [];

  @Output()
  public onUpdateData: EventEmitter<string[]> = new EventEmitter();

  constructor(public dialogService: DialogsService) { }

  ngOnInit(): void {
  }

  public openDialog() {
    if(this.editable) {
      this.dialogService.openSelectItemsDialog({
        data: this.data,
        headline: this.headline,
        knownItems: this.knownItems
      })
    }
  }
}
