import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentMakeupComponent } from './permanent-makeup.component';

describe('PermanentMakeupComponent', () => {
  let component: PermanentMakeupComponent;
  let fixture: ComponentFixture<PermanentMakeupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanentMakeupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanentMakeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
