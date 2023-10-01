import { Component, Inject, inject, OnInit } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  public content: string = ""

  snackBarRef = inject(MatSnackBarRef);

  ngOnInit(): void {
  }

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public snackbarData: {content: string}
  ) {
    this.content = snackbarData.content
  }
}
