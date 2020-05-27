import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { CommonModule } from '@angular/common';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StocksComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedUiChartModule,
        NoopAnimationsModule
      ],
      providers: [PriceQueryFacade, provideMockStore({})]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
