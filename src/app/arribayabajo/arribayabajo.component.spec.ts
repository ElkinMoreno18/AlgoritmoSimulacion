import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArribayabajoComponent } from './arribayabajo.component';

describe('ArribayabajoComponent', () => {
  let component: ArribayabajoComponent;
  let fixture: ComponentFixture<ArribayabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArribayabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArribayabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
