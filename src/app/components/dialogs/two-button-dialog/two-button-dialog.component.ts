import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-two-button-dialog",
  templateUrl: "./two-button-dialog.component.html",
  styleUrls: ["./two-button-dialog.component.scss"],
})
export class TwoButtonDialogComponent implements OnInit {
  public title: string = "";

  public content: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { title: string; content: string },
  ) {
    this.title = dialogData.title;
    this.content = dialogData.content;
  }

  ngOnInit(): void {}
}
