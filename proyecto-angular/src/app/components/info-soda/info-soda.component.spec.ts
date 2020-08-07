import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSodaComponent } from './info-soda.component';

describe('InfoSodaComponent', () => {
  let component: InfoSodaComponent;
  let fixture: ComponentFixture<InfoSodaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSodaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSodaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
