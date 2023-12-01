import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { WindowComponent } from './shared/window/window.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropComponent } from './shared/drop/drop.component';
import { FilterItemsPipe } from './filter-items.pipe';
import { SelectorComponent } from './shared/window/selector/selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    WindowComponent,
    DropComponent,
    FilterItemsPipe,
    SelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
