import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { CapitalBalanceCalculatorComponent } from './capital-balance-calculator.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { ChartDisplayComponent } from './components/chart-display/chart-display.component';

@NgModule({
  declarations: [
    CapitalBalanceCalculatorComponent,
    DataTableComponent,
    InputFormComponent,
    ChartDisplayComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, TableModule],
  exports: [CapitalBalanceCalculatorComponent],
})
export class CapitalBalanceCalculatorModule {}
