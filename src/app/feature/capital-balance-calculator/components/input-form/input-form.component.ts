import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControls } from './constants/form-controls.constants';
import { getCapitalInputForm } from './models/create-input-form';
import { CapitalInputFormModel } from './models/input-form.model';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
  @Output() public formValueEmitted = new EventEmitter<CapitalInputFormModel>();
  @Output() public clearDataEmitted = new EventEmitter();

  public capitalInputForm!: FormGroup;
  public formControls = FormControls;

  constructor(private fb: FormBuilder) {}

  /**
   * Angular's OnInit implementation
   *
   * @memberof InputFormComponent
   */
  public ngOnInit(): void {
    this.initForm();
  }

  /**
   *  handles form submit and emits form value
   *
   * @memberof InputFormComponent
   */
  public onSubmit(): void {
    if (this.capitalInputForm.valid) {
      this.formValueEmitted.emit(this.capitalInputForm.value);
    }
  }

  /**
   *  handles form reset and emits reset event
   *
   * @memberof InputFormComponent
   */
  public reset(): void {
    this.capitalInputForm.reset();
    this.clearDataEmitted.emit();
  }

  /**
   *  initializes form
   *
   * @memberof InputFormComponent
   */
  private initForm() {
    this.capitalInputForm = getCapitalInputForm(this.fb);
  }
}
