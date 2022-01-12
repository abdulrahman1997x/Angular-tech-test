import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RandomTextService {
  storeText = new BehaviorSubject<any>(null); // BehaviorSubject is used becuase it saves the previous value and its good for storing
  constructor(private http: HttpClient) {}

  /**
   *  this function will return each word occurence inside a sencence
   * @param str a string
   * @returns
   */
  private getMostUsedWords(str: string): {} {
    let obj = {};

    str.split(' ').forEach((el, i, arr) => {
      obj[el] = obj[el] ? ++obj[el] : 1;
    });

    return obj;
  }
  /**
   *
   * @param obj object of words and its occurences ex {'apple':2}
   * @param num number of item to be returnd of an object
   * @returns
   */
  private pickHighest = (obj: { [key: string]: number }, num = 1) => {
    const requiredObj = {};
    if (num > Object.keys(obj).length) {
      return false;
    }
    Object.keys(obj)
      .sort((a, b) => obj[b] - obj[a])
      .forEach((key, ind) => {
        if (ind < num) {
          requiredObj[key] = obj[key];
        }
      });
    delete requiredObj[''];
    return requiredObj;
  };
  /**
   * this function will call an api to get a text and then return the Observable and it will store  top ten most used Words inside a storeText.
   * @param url url passed to retrive the text
   * @returns
   */
  getURl(url): Observable<any> {
    return this.http.get(url).pipe(
      catchError((err) => throwError(err)),
      map((data: string[]) => {
        let obj = this.getMostUsedWords(data[0]);
        let topTenWords = this.pickHighest(obj, 10);
        this.storeText.next(topTenWords);
      })
    );
  }
}
