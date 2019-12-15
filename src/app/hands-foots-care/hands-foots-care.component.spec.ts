import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsFootsCareComponent } from './hands-foots-care.component';

describe('HandsFootsCareComponent', () => {
  let component: HandsFootsCareComponent;
  let fixture: ComponentFixture<HandsFootsCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandsFootsCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandsFootsCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
