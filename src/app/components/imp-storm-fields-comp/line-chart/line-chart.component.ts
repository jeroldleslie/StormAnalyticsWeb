import { Component, OnInit, Input } from '@angular/core';
//import { single, multi } from '../../../data/data';
import { DataService } from '../../../services/data-service.service';
import { colorScheme } from '../../../data/data';

@Component({
  selector: 'se-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  @Input() type;
  single: any[];
  multi: any[];

  data: any[] = [];

  view: any[] = [1200, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Years';
  showYAxisLabel = true;
  yAxisLabel = 'Storm Event Types';



  // line, area
  autoScale = true;
  colorScheme;
  constructor(private _dataService: DataService) {
    Object.assign(this, { colorScheme })
  }

  ngAfterViewInit() {
    
  }

  loadData() {
    if (this.type == "Crops") {
      this._dataService.getCropsDamageLineData().subscribe((datas: any) => {
        this.setData(datas);
      });
    }

    if (this.type == "Property") {
      this._dataService.getPropertyDamageLineData().subscribe((datas: any) => {
        this.setData(datas);
      });
    }

    if (this.type == "Direct Deaths") {
      this._dataService.getDeathsDirectLineData().subscribe((datas: any) => {
        this.setData(datas);
      });
    }

    if (this.type == "Indirect Deaths") {
      this._dataService.getDeathsInDirectLineData().subscribe((datas: any) => {
        this.setData(datas);
      });
    }

    if (this.type == "Direct Injuries") {
      this._dataService.getInjuriesDirectLineData().subscribe((datas: any) => {
        this.setData(datas);
      });
    }

    if (this.type == "Indirect Injuries") {
      this._dataService.getInjuriesInDirectLineData().subscribe((datas: any) => {
        this.setData(datas);
      });
    }


  }

  setData(datas: any) {
    let map = {};
    let temp: any[] = [];
    for (let val of datas) {
      let tot = val["totalAmount"];
      if (this.type == "Crops" || this.type == "Property") {
        tot = tot / 1000000;
      }

      if (map[val["_id"]["event_type"]]) {
        map[val["_id"]["event_type"]]['series'].push({
          "name": val["_id"]["year"] + "",
          "value": tot
        });
      } else {
        map[val["_id"]["event_type"]] = {};

        map[val["_id"]["event_type"]]['name'] = val["_id"]["event_type"];
        map[val["_id"]["event_type"]]['series'] = [];
        map[val["_id"]["event_type"]]['series'].push({
          "name": val["_id"]["year"] + "",
          "value": tot
        });
      }
    }
    for (let d in map) {
      if (map.hasOwnProperty(d)) {
        temp.push(map[d]);
      }
    }
    this.data = temp;
  }

  onSelect(event) {
    //console.log(event);
  }
}
