import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {
  constructor() {}

  validateUrl(control: FormControl): { [s: string]: boolean } {
    const Url = 'https://baconipsum.com/api/?type=all-meat&paras=1';
    if (control.value === Url) {
      return null
    }
     return { urlWrong: true };;
  }
}
