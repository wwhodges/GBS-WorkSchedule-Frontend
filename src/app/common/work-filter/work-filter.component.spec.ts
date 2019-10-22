import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFilterComponent } from './work-filter.component';

describe('WorkFilterComponent', () => {
  let component: WorkFilterComponent;
  let fixture: ComponentFixture<WorkFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
