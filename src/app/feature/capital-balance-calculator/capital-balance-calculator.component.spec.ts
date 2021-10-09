import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalBalanceCalculatorComponent } from './capital-balance-calculator.component';

describe('CapitalBalanceCalculatorComponent', () => {
  let component: CapitalBalanceCalculatorComponent;
  let fixture: ComponentFixture<CapitalBalanceCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalBalanceCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalBalanceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
