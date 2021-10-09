import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CapitalBalanceCalculatorModule } from './feature/capital-balance-calculator/capital-balance-calculator.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CapitalBalanceCalculatorModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
