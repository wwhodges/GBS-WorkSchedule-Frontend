import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-wrapper',
  templateUrl: './loader-wrapper.component.html',
  styleUrls: ['./loader-wrapper.component.scss']
})
export class LoaderWrapperComponent implements OnInit {

  @Input() showSpinner = false;

  constructor() { }

  ngOnInit() {
  }

}
