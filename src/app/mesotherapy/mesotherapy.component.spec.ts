import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesotherapyComponent } from './mesotherapy.component';

describe('MesotherapyComponent', () => {
  let component: MesotherapyComponent;
  let fixture: ComponentFixture<MesotherapyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesotherapyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesotherapyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
