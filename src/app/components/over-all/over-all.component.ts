import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { colorScheme } from '../../data/data';
import { TdLoadingService } from '@covalent/core';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
@Component({
  selector: 'over-all',
  templateUrl: './over-all.component.html',
  styleUrls: ['./over-all.component.css']
})
export class OverAllComponent implements OnInit {
  colorScheme;
@ViewChild("bar1") bar1: BarChartComponent;
@ViewChild("bar2") bar2: BarChartComponent;
@ViewChild("bar3") bar3: BarChartComponent;
@ViewChild("bar4") bar4: BarChartComponent;
@ViewChild("bar5") bar5: BarChartComponent;
@ViewChild("bar6") bar6: BarChartComponent;

  lat: number = 42.827754;
  lng: number = -101.460909;

  constructor(private _dataService: DataService, private _loadingService: TdLoadingService) {
    Object.assign(this, { colorScheme })
  }

  selectedValue: string = "Hail";
  selectedYear: number = 2016;
  years: any[] = [];
  event_types: any[] = [{ "event_type": "Landslide" }, { "event_type": "Marine Tropical Storm" }, { "event_type": "Astronomical Low Tide" }, { "event_type": "Dense Smoke" }, { "event_type": "Hail" }, { "event_type": "Winter Weather" }, { "event_type": "Heavy Snow" }, { "event_type": "Dust Devil" }, { "event_type": "Drought" }, { "event_type": "Ice Storm" }, { "event_type": "Tropical Depression" }, { "event_type": "Funnel Cloud" }, { "event_type": "Extreme Cold/Wind Chill" }, { "event_type": "Waterspout" }, { "event_type": "Lake-Effect Snow" }, { "event_type": "Freezing Fog" }, { "event_type": "Sneakerwave" }, { "event_type": "Marine Hail" }, { "event_type": "Dense Fog" }, { "event_type": "Dust Storm" }, { "event_type": "Blizzard" }, { "event_type": "Tropical Storm" }, { "event_type": "Debris Flow" }, { "event_type": "Heavy Rain" }, { "event_type": "Hurricane" }, { "event_type": "Rip Current" }, { "event_type": "Marine High Wind" }, { "event_type": "Excessive Heat" }, { "event_type": "Avalanche" }, { "event_type": "Lightning" }, { "event_type": "Frost/Freeze" }, { "event_type": "Lakeshore Flood" }, { "event_type": "Tsunami" }, { "event_type": "Storm Surge/Tide" }, { "event_type": "Heat" }, { "event_type": "Marine Strong Wind" }, { "event_type": "Coastal Flood" }, { "event_type": "Tornado" }, { "event_type": "Marine Thunderstorm Wind" }, { "event_type": "Flash Flood" }, { "event_type": "Seiche" }, { "event_type": "High Surf" }, { "event_type": "Marine Dense Fog" }, { "event_type": "Strong Wind" }, { "event_type": "Wildfire" }, { "event_type": "Marine Lightning" }, { "event_type": "Flood" }, { "event_type": "Winter Storm" }, { "event_type": "Thunderstorm Wind" }, { "event_type": "High Wind" }, { "event_type": "Sleet" }, { "event_type": "Cold/Wind Chill" }];
  view: any[] = [700, 300];
  positions = [];
  ngOnInit() {
    for(let i=1950;i<=2016;i++){
      this.years.push({ year: i });
    }
  }

  ngAfterViewInit() {
    this.loadMagnitudeData();
    this.loadOverAllData();
    this.loadOverAllDataByYear();
    this.loadMap();
  }

  refresh() {
    this.loadMagnitudeData();
    this.loadOverAllData();
    this.loadOverAllDataByYear();
    this.loadMap();
    this.bar1.loadChart();
    this.bar2.loadChart();
    this.bar3.loadChart();
    this.bar4.loadChart();
    this.bar5.loadChart();
    this.bar6.loadChart();
  }

  loadMap() {
    this._dataService.getLocations(this.selectedYear,this.selectedValue).subscribe(
      (datas: any) => {
        this.positions = [];
        console.log(JSON.stringify(datas));
        //this.positions = datas;
        for (let val of datas) {
          this.positions.push([
            val["lat"], val["lon"]
          ]);
        }
      });
  }

  onEventSelect() {
    this.loadMap();
  }

  magnitudedata;
  cardview: any[] = [1200, 300];

  // pie
  pieShowLegend = false;
  pieView: any[] = [500, 400];
  pieShowLabels = false;
  pieExplodeSlices = false;
  pieDoughnut = false;
  pieGradient = false;
  overAllPieData: any[] = [];

  // bar options
  barview: any[] = [1200, 400];
  barshowXAxis = true;
  barshowYAxis = true;
  bargradient = false;
  barshowLegend = true;
  barshowXAxisLabel = true;
  barxAxisLabel = 'Storm Events';
  barshowYAxisLabel = true;
  baryAxisLabel = 'Occured';
  loadOverAllData() {
    this._dataService.getOverAllEventOccurence().subscribe((datas: any) => {
      let temp: any[] = [];
      for (let val of datas) {
        temp.push({
          "name": val["_id"]["event_type"],
          "value": val["count"]
        });
      }
      this.overAllPieData = temp;
    });
  }

  //line
  lineview: any[] = [1200, 400];
  lineshowXAxis = true;
  lineshowYAxis = true;
  linegradient = false;
  lineshowLegend = true;
  lineshowXAxisLabel = true;
  linexAxisLabel = 'Strom Events';
  lineshowYAxisLabel = true;
  lineyAxisLabel = 'Occurence';
  overAllDataByYear: any[] = [];
  // line, area
  lineautoScale = true;
  loadOverAllDataByYear() {
    this._dataService.getOverAllEventOccurenceByYear().subscribe((datas: any) => {
      let map = {};
      let temp: any[] = [];
      for (let val of datas) {
        let tot = val["count"];
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


          //let val = map[d].series;
          map[d].series.sort((leftSide: any, rightSide: any) => {
            if (parseInt(leftSide.name) > parseInt(rightSide.name)) {
              return -1;
            }
            if (parseInt(leftSide.name) < parseInt(rightSide.name)) {
              return 1;
            }
            return 0;
          })
          //console.log(JSON.stringify(map[d].series));
          temp.push(map[d]);
        }
      }

      this.overAllDataByYear = temp;
    });
  }




  loadMagnitudeData() {
    this._dataService.getMagnitudeData().subscribe((datas: any) => {
      this.setDatas(datas);
    });
  }

  cardData: any[] = [];
  setDatas(datas: any) {
    let temp: any[] = [];
    for (let val of datas) {
      // console.log(val["_id"]["event_type"], val["max"]);
      let name: string = val["_id"]["event_type"];
      if (name.toLowerCase().indexOf("wind") > 0) {
        temp.push({
          "name": name,
          "value": val["max"]
        });
      }

    }
    this.cardData = temp;
  }

  onSelect(event) {
    //console.log(event);
  }



  showRandomMarkers() {
    let randomLat: number, randomLng: number;
    this.positions = [];
    for (let i = 0; i < 9; i++) {
      randomLat = Math.random() * 0.0099 + 43.7250;
      randomLng = Math.random() * 0.0099 + -79.7699;
      this.positions.push([randomLat, randomLng]);
    }
  }
  addMarker() {
    let randomLat = Math.random() * 0.0099 + 43.7250;
    let randomLng = Math.random() * 0.0099 + -79.7699;
    this.positions.push([randomLat, randomLng]);
  }

}
