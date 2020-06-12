import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedDestinationsComponent } from './used-destinations.component';

describe('UsedDestinationsComponent', () => {
  let component: UsedDestinationsComponent;
  let fixture: ComponentFixture<UsedDestinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedDestinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
