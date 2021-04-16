import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrabmediaComponent } from './arrabmedia.component';

describe('ArrabmediaComponent', () => {
  let component: ArrabmediaComponent;
  let fixture: ComponentFixture<ArrabmediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrabmediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrabmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
