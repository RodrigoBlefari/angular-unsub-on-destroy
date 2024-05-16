import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  public getData(): Observable<string> {
    let text = 'Data Service Date';
    console.log('Service data Chamado com delay 6 segundos');
    return of(text).pipe(delay(6000));
  }
}
