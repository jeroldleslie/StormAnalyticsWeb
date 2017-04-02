import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { colorScheme } from '../../../data/data';
@Component({
  selector: 'se-pie-chart-grid',
  templateUrl: './pie-chart-grid.component.html',
  styleUrls: ['./pie-chart-grid.component.css']
})
export class PieChartGridComponent implements OnInit {


  @Input() type;
  ngOnInit() {
  }

  // pie
  colorScheme;
  gradient = false;
  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  data: any[] = [];
  constructor(private _dataService: DataService) {
    Object.assign(this, { colorScheme })
  }

  ngAfterViewInit() {
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

  view: any[] = [1200, 1200];
  // options
  showLegend = true;


  onSelect(event) {
    // console.log(event);
  }


}
