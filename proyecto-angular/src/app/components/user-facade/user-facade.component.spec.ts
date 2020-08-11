import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFacadeComponent } from './user-facade.component';

describe('UserFacadeComponent', () => {
  let component: UserFacadeComponent;
  let fixture: ComponentFixture<UserFacadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFacadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
