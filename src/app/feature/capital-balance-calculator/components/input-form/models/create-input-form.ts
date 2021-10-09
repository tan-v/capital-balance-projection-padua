import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function getCapitalInputForm(fb: FormBuilder): FormGroup {
  return fb.group({
    salary: [null, Validators.required],
    contributions: [],
    inflation_rate: [],
    earnings: [],
    fees: [],
    tax: [],
    withdrawals: [],
    withdrawalStartYear: [],
  });
}
