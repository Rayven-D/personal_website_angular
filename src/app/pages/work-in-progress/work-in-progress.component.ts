import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-work-in-progress',
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.scss']
})
export class WorkInProgressComponent implements AfterViewInit {
  public workText = ""
  constructor() { }

  ngAfterViewInit(): void {
    this.writeText();
  }

  private writeText(){
    const text = [..."Work in Progress"];
    text.forEach( (letter, index) =>{
      setTimeout(() =>{
        this.workText += letter;
        console.log(this.workText)
      }, index * 100)
    })
  }

}
