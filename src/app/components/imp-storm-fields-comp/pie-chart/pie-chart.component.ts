import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { colorScheme } from '../../../data/data';

@Component({
  selector: 'se-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  @Input() type;
  // pie

  @Input() showPie:boolean = false;

  colorScheme;
  showLabels = false;
  showLegend = false;
  
  explodeSlices = false;
  doughnut = false;
  data: any[] = [];
  constructor(private _dataService: DataService) { 
    Object.assign(this, { colorScheme })
  }
  units = ""

  ngOnInit() {
    if (this.type == "Crops") {
      this.units = "Millions"
    }

    if (this.type == "Property") {
      this.units = "Millions"
    }

    if (this.type == "Direct Deaths") {
      this.units = "Deaths"
    }
    if (this.type == "Indirect Deaths") {
      this.units = "Deaths"
    }

    if (this.type == "Direct Injuries") {
      this.units = "Injuries"
    }
    if (this.type == "Indirect Injuries") {
      this.units = "Injuries"
    }
  }

  ngAfterViewInit() {
    this.loadPieChart();
  }

  loadPieChart() {

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
    let temp: any[] = [];
    for (let val of datas) {
      let value = val["totalAmount"]
      if (this.type == "Crops" || this.type == "Property") {
        value = parseFloat((val["totalAmount"] / 1000000).toFixed(2))
      }
      temp.push({
        "name": val["_id"]["event_type"],
        "value": value
      });
    }
    this.data = temp;
  }
  view: any[] = [585, 480];


  onSelect(event) {
    //console.log(event);
  }

}
