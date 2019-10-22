import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespatchedComponent } from './despatched.component';

describe('DespatchedComponent', () => {
  let component: DespatchedComponent;
  let fixture: ComponentFixture<DespatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
