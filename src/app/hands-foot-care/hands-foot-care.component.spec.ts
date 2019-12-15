import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsFootCareComponent } from './hands-foot-care.component';

describe('HandsFootCareComponent', () => {
  let component: HandsFootCareComponent;
  let fixture: ComponentFixture<HandsFootCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandsFootCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandsFootCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
