import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { PieChartGridComponent } from '../pie-chart-grid/pie-chart-grid.component';

const CROP_NUMBER_FORMAT: any = (v: { value: number }) => v.value;
const CROP_CURRENCY_FORMAT: any = (v: { value: number }) => "$" + (v.value / 1000000).toFixed(2) + "M"

@Component({
  selector: 'se-damage-on-time',
  templateUrl: './damage-on-time.component.html',
  styleUrls: ['./damage-on-time.component.css']
})
export class DamageOnTimeComponent {

  @Input() type;
  constructor(private _dataService: DataService) { }

  @ViewChild("pie") pie: PieChartComponent;
  @ViewChild("gauge") gauge: PieChartComponent;
  @ViewChild("line") line: LineChartComponent;
  @ViewChild("grid") grid: PieChartGridComponent;

  data: any[] = [];
  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'year';
  toolTitle = "";
  pieTitle = "";
  gaugeTitle = "";
  lineTitle = "";
  gridTitle = "";
  private options: any = {
    legend: { position: 'right' }
  }

  ngOnInit() {
    if (this.type == "Crops") {
      this.toolTitle = "Crops damage costs (in million dollars)"
      this.pieTitle = "Total damage costs (pie)"
      this.gaugeTitle = "Total damage costs (gauge)"
      this.lineTitle = "Yearly damage costs"
      this.gridTitle = "Damage costs (%)"
    }

    if (this.type == "Property") {
      this.toolTitle = "Property damage costs (in million dollars)"
      this.pieTitle = "Total damage costs (pie)"
      this.gaugeTitle = "Total damage costs (gauge)"
      this.lineTitle = "Yearly damage costs"
      this.gridTitle = "Damage costs (%)"
    }

    if (this.type == "Direct Deaths") {
      this.toolTitle = "Direct deaths due to storm"
      this.pieTitle = "Total direct deaths (pie)"
      this.gaugeTitle = "Total direct deaths (gauge)"
      this.lineTitle = "Yearly direct deaths"
      this.gridTitle = "Damage direct deaths (%)"
    }
    if (this.type == "Indirect Deaths") {
      this.toolTitle = "Indirect deaths due to storm"
      this.pieTitle = "Total indirect deaths (pie)"
      this.gaugeTitle = "Total indirect deaths (gauge)"
      this.lineTitle = "Yearly indirect deaths"
      this.gridTitle = "Damage indirect deaths (%)"

    }

    if (this.type == "Direct Injuries") {
      this.toolTitle = "Direct injuries due to storm"
      this.pieTitle = "Total direct injuries (pie)"
      this.gaugeTitle = "Total direct injuries (gauge)"
      this.lineTitle = "Yearly direct injuries"
      this.gridTitle = "Damage direct injuries (%)"
    }
    if (this.type == "Indirect Injuries") {
      this.toolTitle = "Indirect injuries due to storm"
      this.pieTitle = "Total direct injuries (pie)"
      this.gaugeTitle = "Total indirect injuries (gauge)"
      this.lineTitle = "Yearly indirect injuries"
      this.gridTitle = "Damage indirect injuries (%)"
    }
  }
  ngAfterViewInit() {
    this.refresh();
  }

  refresh() {
    this.pie.loadPieChart();
    this.gauge.loadPieChart();
    this.grid.loadPieChart();
    this.line.loadData();
  }

  loadDataTable() {
    this._dataService.getCropsDamageTableData().subscribe((datas: any) => {
      let map = {};
      let temp: any = [];
      for (let val of datas) {
        if (map[val["_id"]["year"]]) {
          map[val["_id"]["year"]][this._dataService.getAlphabaticMonth(val["_id"]["month"])] = { 'value': val["totalAmount"] }
        } else {
          map[val["_id"]["year"]] = {};
          map[val["_id"]["year"]]['year'] = { 'value': val["_id"]["year"] };

          map[val["_id"]["year"]]['january'] = { 'value': 0 }
          map[val["_id"]["year"]]['february'] = { 'value': 0 }
          map[val["_id"]["year"]]['march'] = { 'value': 0 }
          map[val["_id"]["year"]]['april'] = { 'value': 0 }
          map[val["_id"]["year"]]['may'] = { 'value': 0 }
          map[val["_id"]["year"]]['june'] = { 'value': 0 }
          map[val["_id"]["year"]]['july'] = { 'value': 0 }
          map[val["_id"]["year"]]['august'] = { 'value': 0 }
          map[val["_id"]["year"]]['september'] = { 'value': 0 }
          map[val["_id"]["year"]]['october'] = { 'value': 0 }
          map[val["_id"]["year"]]['november'] = { 'value': 0 }
          map[val["_id"]["year"]]['december'] = { 'value': 0 }


          map[val["_id"]["year"]][this._dataService.getAlphabaticMonth(val["_id"]["month"])] = { 'value': val["totalAmount"] }
        }
        //console.log(datas);
      }
      for (let d in map) {
        if (map.hasOwnProperty(d)) {
          temp.push(map[d]);
        }
      }

      this.data = temp;
      this.filteredData = this.data;
      this.filteredTotal = this.data.length;
    });
  }

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }




  columns: any[] = [
    { name: 'year', label: 'Year', numeric: true, format: CROP_NUMBER_FORMAT },
    { name: 'january', label: 'January', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'february', label: 'February', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'march', label: 'March', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'april', label: 'April', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'may', label: 'May', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'june', label: 'June', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'july', label: 'July', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'august', label: 'August', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'september', label: 'September', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'october', label: 'October', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'november', label: 'November', numeric: true, format: CROP_CURRENCY_FORMAT },
    { name: 'december', label: 'December', numeric: true, format: CROP_CURRENCY_FORMAT },
  ];

}
