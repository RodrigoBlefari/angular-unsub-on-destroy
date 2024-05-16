import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  auditTime,
  debounceTime,
  first,
  fromEvent,
  interval,
  map,
  of,
  scheduled,
  skipUntil,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
  timer,
} from 'rxjs';
import { DataService } from 'src/app/services/data-service.service';
import { UnsubCompoment } from '../unsub.component';

@Component({
  selector: 'app-app-filho',
  templateUrl: './app-filho.component.html',
  styleUrls: ['./app-filho.component.scss'],
})
export class AppFilhoComponent
  extends UnsubCompoment
  implements OnInit, OnDestroy
{
  private valuesRjxOperators = interval(1000);
  // private unsub$ = new Subject();
  data$!: Observable<string>;

  constructor(private dataService: DataService) {
    // PARA EXTENDER CLASSES O TYPESCRIPT PRECISA DO
    // SUPER PARA EXECUTAR O CONSTRUTOR
    super();
  }

  ngOnInit() {
    console.log('FILHO INIT');

    // this.asyncPipeByService();
    // this.customPipe();
    // this.unsubOld();

    // this.rxjsOperatorTake();
    // this.rxjsOperatorTakeWile();
    // this.rxjOperatorFirst();
    // this.rxjOperatorSkipUntil();
    // this.rxjOperatorTakeLast();
    // this.rxjOperatorthrottleTime();
    // this.rxjsOperatorsDebounceTime();
    // this.rxjsOperatorsAuditTime();

    // this.subscribeAdd();
    // this.subscribeRemove();
    // this.subscribeClosed();
    // this.subscribeUnsubscribe();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  // ngOnDestroy(): void {
  //   this.unsub$.next(null);
  //   this.unsub$.complete();
  //   console.log('FILHO DESTROY');
  // }

  asyncPipeByService() {
    this.data$ = this.dataService.getData();
  }

  customPipe() {
    let intervalOld = interval(1000);

    intervalOld.pipe(this.unsubOnDestroy()).subscribe((value) => {
      console.log('pipe unsuBOnDestor value: ', value);
    });
  }

  unsubOld() {
    let subOld$ = new Subject();
    let intervalOld = interval(1000);

    intervalOld.pipe(takeUntil(subOld$)).subscribe((value) => {
      console.log('unsubOld value: ', value);
      if (value > 5) subOld$.next(null);
    });
  }

  rxjsOperatorTake() {
    this.valuesRjxOperators.pipe(take(3)).subscribe(console.log);
  }

  rxjsOperatorTakeWile() {
    // Exemplo Básico
    // Emitir valores enquanto a condição for verdadeira
    let count = 10;
    this.valuesRjxOperators
      .pipe(takeWhile((value) => value < count, false))
      .subscribe((vl) => {
        console.log(vl);
        console.log(count);
        count--;
      });

    /////////////////////////////////////////////////////////////

    // Exemplo com Fluxo de Dados Assíncrono
    // Usando interval para emitir valores periodicamente
    // Emite valores a cada segundo, parando quando o valor é igual ou superior a 5
    interval(1000)
      .pipe(takeWhile((value) => value < 5))
      .subscribe(console.log);
    // Output: 0, 1, 2, 3, 4 (um por segundo)

    /////////////////////////////////////////////////////////////

    // Exemplo com Condição Baseada em Estado Externo
    // Usando uma variável externa para controlar a condição
    let threshold = 3;
    // Emite valores enquanto forem menores que o valor da variável externa `threshold`
    of(1, 2, 3, 4, 5)
      .pipe(takeWhile((value) => value < threshold))
      .subscribe(console.log);
    // Output: 1, 2

    /////////////////////////////////////////////////////////////

    // Exemplo com inclusive Flag
    // Usando a flag inclusive para incluir o valor que falha na condição
    // Emite valores enquanto forem menores que 3, incluindo o valor que falha na condição (3)
    of(1, 2, 3, 4, 5)
      .pipe(takeWhile((value) => value < 3, true))
      .subscribe(console.log);
    // Output: 1, 2, 3

    /////////////////////////////////////////////////////////////

    // Exemplo com tap para Depuração
    // Usando tap para visualizar os valores emitidos antes de aplicar takeWhile
    // Emite valores enquanto forem menores que 4, com log intermediário
    interval(1000)
      .pipe(
        tap((value) => console.log('Before takeWhile:', value)),
        takeWhile((value) => value < 4)
      )
      .subscribe((value) => console.log(value + 1));
    // Output: Before takeWhile: 1, 2, 3, 4
    // 1, 2, 3

    /////////////////////////////////////////////////////////////

    // Exemplo com Operadores Combinados
    // Combinando takeWhile com outros operadores RxJS
    // Captura eventos de clique e emite as coordenadas do clique enquanto o eixo X for menor que 200
    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY })),
        takeWhile((coords) => coords.x < 200)
      )
      .subscribe((coords) => {
        console.log(`Clicked at: ${coords.x}, ${coords.y}`);
      });

    /////////////////////////////////////////////////////////////

    // Exemplo com Observable Completo
    // Usando takeWhile para completar o Observable baseado em uma condição
    const subject = new Subject<number>();
    // Emite valores enquanto forem menores que 10
    subject.pipe(takeWhile((value) => value < 10)).subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completed'),
    });
    subject.next(1); // Output: 1
    subject.next(5); // Output: 5
    subject.next(10); // Completa e não emite 10
  }

  rxjOperatorFirst() {
    // O operador first emite apenas o primeiro valor
    // ou o primeiro valor que satisfaz uma condição opcional e completa.
    // Emite apenas o primeiro valor
    of(1, 2, 3, 4, 5).pipe(first()).subscribe(console.log);
    Output: 1;
    // Emite o primeiro valor que satisfaz a condição
    of(1, 2, 3, 4, 5)
      .pipe(first((value) => value >= 3))
      .subscribe(console.log);
    // Output: 3
  }

  rxjOperatorSkipUntil() {
    // O operador skipUntil ignora os valores emitidos por
    // um Observable até que outro Observable emita um valor.
    // Ignora valores até que o temporizador emita (após 3 segundos)
    interval(1000)
      .pipe(skipUntil(timer(3000)))
      .subscribe(console.log);
    // Output: 3, 4, 5, 6, ...
  }

  rxjOperatorTakeLast() {
    // O operador takeLast emite apenas os últimos n valores de um Observable.
    // Emite apenas os últimos 2 valores
    of(1, 2, 3, 4, 5).pipe(takeLast(2)).subscribe(console.log);
    // Output: 4, 5
  }

  rxjOperatorthrottleTime() {
    // O operador throttleTime emite o primeiro valor e, em seguida,
    // ignora os valores subsequentes durante um período de tempo específico.
    // Emite um valor a cada 2 segundos
    interval(1000).pipe(throttleTime(2000)).subscribe(console.log);
    // Output: 0, 2, 4, 6, ...
  }

  rxjsOperatorsDebounceTime() {
    // O operador debounceTime emite um valor do
    // Observable após um período de tempo específico ter passado sem outra emissão.

    // Emite um valor após 300ms desde a última emissão
    fromEvent(document, 'click')
      .pipe(debounceTime(300))
      .subscribe((event) => {
        console.log('Clicked:', event);
      });
  }

  rxjsOperatorsAuditTime() {
    // O operador auditTime emite o último valor emitido pelo
    // Observable dentro de um intervalo de tempo especificado.

    interval(500).pipe(auditTime(2000)).subscribe(console.log);
  }

  subscribeAdd() {
    let sub = new Subscription();
    const sub1 = new Subscription(() => console.log('Sub1 cleanup'));
    const sub2 = new Subscription(() => console.log('Sub2 cleanup'));

    sub.add(sub1);
    sub.add(sub2);

    // Ao cancelar a assinatura principal, todas as assinaturas adicionadas são canceladas
    sub.unsubscribe();
    // Output:
    // Sub1 cleanup
    // Sub2 cleanup
  }

  subscribeClosed() {
    let sub = new Subscription();
    console.log(sub.closed); // false

    sub.unsubscribe();
    console.log(sub.closed); // true
  }

  subscribeRemove() {
    let sub = new Subscription();

    const sub1 = new Subscription(() => console.log('Sub1 cleanup'));
    const sub2 = new Subscription(() => console.log('Sub2 cleanup'));

    sub.add(sub1);
    sub.add(sub2);

    // Removendo sub1
    sub.remove(sub1);

    // Apenas sub2 será limpo quando a assinatura principal for cancelada
    sub.unsubscribe();
    // Output:
    // Sub2 cleanup
  }
  subscribeUnsubscribe() {
    let sub = new Subscription(() => console.log('Main subscription cleanup'));

    const sub1 = new Subscription(() => console.log('Sub1 cleanup'));
    const sub2 = new Subscription(() => console.log('Sub2 cleanup'));

    sub.add(sub1);
    sub.add(sub2);

    // Cancelando a inscrição principal
    sub.unsubscribe();
    // Output:
    // Sub1 cleanup
    // Sub2 cleanup
    // Main subscription cleanup
  }
}
