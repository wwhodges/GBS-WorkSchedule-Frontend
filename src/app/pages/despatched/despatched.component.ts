import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-despatched',
  templateUrl: './despatched.component.html',
  styleUrls: ['./despatched.component.scss']
})
export class DespatchedComponent implements OnInit {
    testForm = new FormGroup({});

    fishes = [{ id: 1, name: 'pike', size: 'big'}, { id: 2, name: 'salmon', size: 'massive'}];

  constructor() { }

  ngOnInit() {
    this.fishes.forEach((fish) => {
      this.testForm.addControl(fish.id.toString(), new FormGroup({
        fishName: new FormControl(fish.name),
        fishSize: new FormControl(fish.size)
      }));
    });
    console.log(this.testForm);
    this.testForm.valueChanges.subscribe((data) => this.changeval(data));
  }

  changeval(data) {
    console.log(this.testForm);
  }

}
