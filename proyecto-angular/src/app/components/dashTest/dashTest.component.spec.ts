import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTestComponent } from './dashTest.component';

describe('DashTestComponent', () => {
  let component: DashTestComponent;
  let fixture: ComponentFixture<DashTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
