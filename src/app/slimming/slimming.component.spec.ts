import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlimmingComponent } from './slimming.component';

describe('SlimmingComponent', () => {
  let component: SlimmingComponent;
  let fixture: ComponentFixture<SlimmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlimmingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlimmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
