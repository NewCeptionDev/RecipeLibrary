import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AutocompleteWithAddFunctionComponent} from './autocomplete-with-add-function.component';

describe('AutocompleteWithAddFunctionComponent', () => {
  let component: AutocompleteWithAddFunctionComponent;
  let fixture: ComponentFixture<AutocompleteWithAddFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteWithAddFunctionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteWithAddFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
