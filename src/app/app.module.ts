import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './components/search/search.component';
import { ExtensibleContainerComponent } from './components/extensible-container/extensible-container.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RatingDisplayComponent } from './components/rating-display/rating-display.component';
import { SelectedItemsDisplayComponent } from './components/selected-items-display/selected-items-display.component';
import {MatTableModule} from '@angular/material/table';
import { SelectItemsDialogComponent } from './components/dialogs/select-items-dialog/select-items-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SearchComponent,
    ExtensibleContainerComponent,
    AddRecipeComponent,
    RatingDisplayComponent,
    SelectedItemsDisplayComponent,
    SelectItemsDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
