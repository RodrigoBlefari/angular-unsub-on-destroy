import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  template: '/',
})

//COMPONENTE ABSTRATO PARA IMPLEMENTAR O UNSUB
export class UnsubCompoment implements OnDestroy {
    
  protected unsub$ = new Subject();

  unsubOnDestroy() {
    return <T>(observable: Observable<T>): Observable<T> =>
      observable.pipe(takeUntil(this.unsub$));
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
    throw new Error('Method not implemented.');
  }
}
