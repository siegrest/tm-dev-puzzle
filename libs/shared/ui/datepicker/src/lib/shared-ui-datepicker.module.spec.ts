import { async, TestBed } from '@angular/core/testing';
import { SharedUiDatepickertModule } from './shared-ui-datepicker.module';

describe('SharedUiDatepickertModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiDatepickertModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiDatepickertModule).toBeDefined();
  });
});
