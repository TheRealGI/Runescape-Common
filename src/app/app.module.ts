import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashEventPageComponent } from './components/flash-event-page/flash-event-page.component';
import {CalendarModule} from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';




@NgModule({
  declarations: [
    AppComponent,
    FlashEventPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
