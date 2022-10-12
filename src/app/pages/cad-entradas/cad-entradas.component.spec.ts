import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadEntradasComponent } from './cad-entradas.component';

describe('CadEntradasComponent', () => {
  let component: CadEntradasComponent;
  let fixture: ComponentFixture<CadEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadEntradasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
