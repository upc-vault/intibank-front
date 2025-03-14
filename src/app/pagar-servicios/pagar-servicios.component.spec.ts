import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarServiciosComponent } from './pagar-servicios.component';

describe('PagarServiciosComponent', () => {
  let component: PagarServiciosComponent;
  let fixture: ComponentFixture<PagarServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
