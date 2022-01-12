import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomValidatorService } from './services/custom-validator.service';
import { RandomTextService } from './services/random-text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  textForm: FormGroup;
  letters: number;
  storeSubscription: Subscription;
  topTen = {};
  isLoading = false;
  error;
  constructor(
    private _formBuilder: FormBuilder,
    private randomTextService: RandomTextService,
    private customValidatorService: CustomValidatorService
  ) {}

  ngOnInit(): void {
    this.textForm = this._formBuilder.group({
      text: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ]),
      ],
      url: [
        'https://baconipsum.com/api/?type=all-meat&paras=1',
        Validators.compose([
          Validators.required,
          this.customValidatorService.validateUrl,
        ]),
      ],
    });
    this.textForm.get('text').valueChanges.subscribe((value) => {
      this.letters = this.countWord(value);
    });
  }

  /**
   * This functions takes a string and count the number of word inside the string without the spaces
   * @param myString
   * @returns
   */
  private countWord(myString: string): number {
    // use / /g to remove all spaces from the string
    let remText = myString.replace(/ /g, '');
    // get the length of the string after removal
    return (length = remText.length);
  }
  /**
   * this function will submit a form and get the url then pass is to the http get
   * after getting the response a BehaviorSubject subject is being called to print the result
   */
  onSubmit() {
    console.log('hi');
    let url = this.textForm.get('url').value;
    this.isLoading = true;
    this.randomTextService
      .getURl(url)
      .pipe(switchMap((data) => this.randomTextService.storeText))
      .subscribe(
        (data) => {
          this.topTen = data;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.error = err;
        }
      );
  }
  ngOnDestroy(): void {
    this.storeSubscription ? this.storeSubscription.unsubscribe() : null;
  }
}

// https://baconipsum.com/api/?type=all-meat&paras=1
