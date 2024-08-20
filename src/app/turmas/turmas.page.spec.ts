import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TurmasPage } from './turmas.page';

describe('TurmasPage', () => {
  let component: TurmasPage;
  let fixture: ComponentFixture<TurmasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
