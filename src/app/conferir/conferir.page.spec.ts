import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferirPage } from './conferir.page';

describe('ConferirPage', () => {
  let component: ConferirPage;
  let fixture: ComponentFixture<ConferirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
