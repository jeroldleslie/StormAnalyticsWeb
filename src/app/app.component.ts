import { Component } from '@angular/core';
import { TdLoadingService } from '@covalent/core';


@Component({ // component configurations 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private _loadingService: TdLoadingService) { }

  ngOnInit(): void {
    this._loadingService.register();
    setTimeout(() => {
      this._loadingService.resolve();
    }, 20*1000);
  }


  ngAfterViewInit() {

  }

}


