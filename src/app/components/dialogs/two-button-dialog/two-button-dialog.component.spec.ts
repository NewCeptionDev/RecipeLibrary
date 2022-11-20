import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwoButtonDialogComponent} from './two-button-dialog.component';

describe('TwoButtonDialogComponent', () => {
  let component: TwoButtonDialogComponent;
  let fixture: ComponentFixture<TwoButtonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoButtonDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TwoButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
