import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrosPage } from './registros.page';

describe('RegistrosPage', () => {
  let component: RegistrosPage;
  let fixture: ComponentFixture<RegistrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
