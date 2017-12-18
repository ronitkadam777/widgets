import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgGridModule } from 'angular2-grid';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule.forRoot(require('highcharts'), require('highcharts/highcharts-more'), require('highcharts/modules/heatmap'), require('highcharts/modules/drilldown')),
    NgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
