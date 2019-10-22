import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnscheduledComponent } from './unscheduled.component';

describe('UnscheduledComponent', () => {
  let component: UnscheduledComponent;
  let fixture: ComponentFixture<UnscheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnscheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnscheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
