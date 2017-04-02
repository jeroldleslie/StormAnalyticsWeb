// imports all the nessesary classes, interfaces and services
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import 'hammerjs';
import { NguiMapModule} from '@ngui/map';

import { AppComponent } from './app.component';

import { CovalentCoreModule } from '@covalent/core';
import { DataService } from './services/data-service.service';

import { DamageOnTimeComponent } from './components/imp-storm-fields-comp/damage-on-time/damage-on-time.component';
import { LineChartComponent } from './components/imp-storm-fields-comp/line-chart/line-chart.component';
import { PieChartComponent } from './components/imp-storm-fields-comp/pie-chart/pie-chart.component';
import { PieChartGridComponent } from './components/imp-storm-fields-comp/pie-chart-grid/pie-chart-grid.component';
import { OverAllComponent } from './components/over-all/over-all.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DamageOnTimeComponent,
    LineChartComponent,
    PieChartComponent,
    PieChartGridComponent,
    OverAllComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CovalentCoreModule.forRoot(),
    NgxChartsModule,
    BrowserAnimationsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyB0zeINOoOL1mplBvmM8yvSpqXDGrjBcUw'})

  ],
  schemas: [

  ],
  entryComponents: [
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
