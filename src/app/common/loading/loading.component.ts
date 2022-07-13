import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements AfterViewInit {

  @Input() color: string = "";
  @Input() displayText: boolean = true;
  @Input() once: boolean = false;

  constructor() { }

  ngAfterViewInit(): void {
    const all = document.getElementsByClassName('loading-component')[0];
    all.setAttribute("style", `color: ${this.color}`)
    document.getElementById('loading-first-name')?.setAttribute('style', `stroke: ${this.color}`);
    document.getElementById('loading-second-name')?.setAttribute('style', `stroke: ${this.color}`);


  }

}
