import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { colorScheme } from '../../data/data';
@Component({
  selector: 'se-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  colorScheme;
  @Input() type;
  // pie
  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  data: any[] = [];

  barview: any[] = [1200, 450];
  barshowXAxis = true;
  barshowYAxis = true;
  bargradient = false;
  barshowLegend = true;
  barshowXAxisLabel = true;
  barxAxisLabel = 'Storm Events';
  barshowYAxisLabel = true;
  baryAxisLabel = 'Counts';

  constructor(private _dataService: DataService) {
    Object.assign(this, { colorScheme })
  }


  ngOnInit() {
    if (this.type == "Crops") {
      this.baryAxisLabel = "Crops Damage Costs (in millions)"
    }

    if (this.type == "Property") {
      this.baryAxisLabel = "Property Damage Costs (in millions)"
    }

    if (this.type == "Direct Deaths") {
      this.baryAxisLabel = "Number of Direct Deaths"
    }
    if (this.type == "Indirect Deaths") {
      this.baryAxisLabel = "Number of Indirect Deaths"
    }

    if (this.type == "Direct Injuries") {
      this.baryAxisLabel = "Number of Direct Injuries"
    }
    if (this.type == "Indirect Injuries") {
      this.baryAxisLabel = "Number of Indirect Injuries"
    }
  }

  ngAfterViewInit() {
    this.loadChart();

  }

  loadChart() {

    if (this.type == "Crops") {
      this._dataService.getCropsDamagePieData().subscribe((datas: any) => {
        this.setDatas(datas);
      });
    }

    if (this.type == "Property") {
      this._dataService.getPropertyDamagePieData().subscribe((datas: any) => {
        this.setDatas(datas);
      });
    }

    if (this.type == "Direct Deaths") {
      this._dataService.getDeathsDirectPieData().subscribe((datas: any) => {
        this.setDatas(datas);
      });
    }
    if (this.type == "Indirect Deaths") {
      this._dataService.getDeathsInDirectPieData().subscribe((datas: any) => {
        this.setDatas(datas);
      });
    }

    if (this.type == "Direct Injuries") {
      this._dataService.getInjuriesDirectPieData().subscribe((datas: any) => {
        this.setDatas(datas);
      });
    }
    if (this.type == "Indirect Injuries") {
      this._dataService.getInjuriesInDirectPieData().subscribe((datas: any) => {
        this.setDatas(datas);
      });
    }
  }


  setDatas(datas: any) {

    let list = [];
    let temp: any[] = [];
    for (let val of datas) {
      list.push({ "event_type": [val["_id"]["event_type"]] });
      let value = val["totalAmount"]
      if (this.type == "Crops" || this.type == "Property") {
        value = parseFloat((val["totalAmount"] / 1000000).toFixed(2))
      }
      temp.push({
        "name": val["_id"]["event_type"],
        "value": value
      });
    }


    temp.sort((leftSide: any, rightSide: any) => {
      if (leftSide.value > rightSide.value) {
        return -1;
      }
      if (leftSide.value < rightSide.value) {
        return 1;
      }
      return 0;
    })
    this.data = temp;
  }
  view: any[] = [500, 400];
  // options
  showLegend = true;




  onSelect(event) {
    // console.log(event);
  }

}
