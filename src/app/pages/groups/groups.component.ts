import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  hello: string;

  constructor() { }

  ngOnInit() {
    this.hello = 'hello to you';
  }

}
