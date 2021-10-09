import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function getCapitalInputForm(fb: FormBuilder): FormGroup {
  return fb.group({
    salary: [null, Validators.required],
    contributions: [null, Validators.required],
    inflation_rate: [null, Validators.required],
    earnings: [null, Validators.required],
    fees: [null, Validators.required],
    tax: [null, Validators.required],
    withdrawals: [null, Validators.required],
    withdrawalStartYear: [
      null,
      Validators.compose([Validators.required, Validators.pattern('\\d{4}')]),
    ],
  });
}
