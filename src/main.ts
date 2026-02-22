import { enableProdMode, provideZoneChangeDetection, importProvidersFrom } from "@angular/core"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"


import { environment } from "./environments/environment"
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AppComponent } from "./app/app.component";

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, MatIconModule, MatButtonModule, MatInputModule, FormsModule, MatAutocompleteModule, ReactiveFormsModule, MatTableModule, MatDialogModule, MatSnackBarModule, MatSlideToggleModule)]
})
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err))
