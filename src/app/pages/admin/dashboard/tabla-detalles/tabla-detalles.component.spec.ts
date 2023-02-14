import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDetallesComponent } from './tabla-detalles.component';

describe('TablaDetallesComponent', () => {
  let component: TablaDetallesComponent;
  let fixture: ComponentFixture<TablaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
