import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DastTestCompoment } from './dashTest.component';

describe('ErrorComponent', () => {
  let component: DastTestCompoment;
  let fixture: ComponentFixture<DastTestCompoment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DastTestCompoment ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DastTestCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
