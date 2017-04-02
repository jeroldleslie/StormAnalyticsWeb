import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const MONTHS_MAP = {
  '1': 'january',
  '2': 'february',
  '3': 'march',
  '4': 'april',
  '5': 'may',
  '6': 'june',
  '7': 'july',
  '8': 'august',
  '9': 'september',
  '10': 'october',
  '11': 'november',
  '12': 'december'
};

@Injectable()
export class DataService {

  private apiURL = 'http://localhost:3000';
  private headers: Headers;
  constructor(private _http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Access-Control-Allow-Origin', '*');

  }

//Property Damage
  getPropertyDamagePieData(): any {
    return this._http.get(
      this.apiURL + '/api/propertydamage',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getPropertyDamageTableData(): any {
    return this._http.get(
      this.apiURL + '/api/propertydamagefortable',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getPropertyDamageLineData(): any {
    return this._http.get(
      this.apiURL + '/api/propertydamageline',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  


//Crops Damage
  getCropsDamagePieData(): any {
    return this._http.get(
      this.apiURL + '/api/cropsdamage',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getCropsDamageTableData(): any {
    return this._http.get(
      this.apiURL + '/api/cropsdamagefortable',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getCropsDamageLineData(): any {
    return this._http.get(
      this.apiURL + '/api/cropsdamageline',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }




//Deaths Direct
  getDeathsDirectPieData(): any {
    return this._http.get(
      this.apiURL + '/api/deathsdirect',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getDeathsDirectTableData(): any {
    return this._http.get(
      this.apiURL + '/api/deathsdirectfortable',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getDeathsDirectLineData(): any {
    return this._http.get(
      this.apiURL + '/api/deathsdirectline',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }


  //Deaths InDirect
  getDeathsInDirectPieData(): any {
    return this._http.get(
      this.apiURL + '/api/deathsindirect',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getDeathsInDirectTableData(): any {
    return this._http.get(
      this.apiURL + '/api/deathsindirectfortable',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getDeathsInDirectLineData(): any {
    return this._http.get(
      this.apiURL + '/api/deathsindirectline',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }




//Injuries Direct
  getInjuriesDirectPieData(): any {
    return this._http.get(
      this.apiURL + '/api/injuriesdirect',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getInjuriesDirectTableData(): any {
    return this._http.get(
      this.apiURL + '/api/injuriesdirectfortable',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getInjuriesDirectLineData(): any {
    return this._http.get(
      this.apiURL + '/api/injuriesdirectline',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }


  //Injuries InDirect
  getInjuriesInDirectPieData(): any {
    return this._http.get(
      this.apiURL + '/api/injuriesindirect',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getInjuriesInDirectTableData(): any {
    return this._http.get(
      this.apiURL + '/api/injuriesindirectfortable',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getInjuriesInDirectLineData(): any {
    return this._http.get(
      this.apiURL + '/api/injuriesindirectline',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }


  getMagnitudeData(): any {
    return this._http.get(
      this.apiURL + '/api/minmaxmagnitudes',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }
  

  getOverAllEventOccurence(): any {
    return this._http.get(
      this.apiURL + '/api/overalleventocc',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getOverAllEventOccurenceByYear(): any {
    return this._http.get(
      this.apiURL + '/api/overalleventoccbyyear',
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getLocations(year:number, type:string): any {
    return this._http.get(
      this.apiURL + '/api/locations/'+year+'/'+type,
      { headers: this.headers })
      .map((res) => {
        return res.json();
      });
  }

  getAlphabaticMonth(i) {
    return MONTHS_MAP[i + ""];
  }

}
