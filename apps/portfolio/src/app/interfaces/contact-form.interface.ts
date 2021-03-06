import { AbstractControl, FormGroup } from '@angular/forms';

export interface IContactForm extends FormGroup {
  controls: {
    name: AbstractControl;
    email: AbstractControl;
    header: AbstractControl;
    message: AbstractControl;
    domain: AbstractControl;
  };
}

export interface IContectFormValue {
  name: string;
  email: string;
  header: string;
  message: string;
  domain: string;
}
