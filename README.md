Documentação do Projeto Angular com RxJS

Este projeto Angular demonstra o uso de RxJS para trabalhar com observáveis assíncronos, diferentes tipos de subscriptions e uma variedade de operadores RxJS.
Componente AppFilho

O componente AppFilhoComponent é responsável por exibir e gerenciar dados assíncronos e demonstra o uso de diferentes operadores RxJS e subscriptions.
Métodos Principais

    ngOnInit(): Este método é chamado quando o componente é inicializado. Ele demonstra o uso de vários operadores RxJS para manipular observáveis.

    ngOnDestroy(): Este método é chamado quando o componente é destruído. Ele é responsável por cancelar todas as assinaturas usando uma subscription do tipo Subject.

Operadores RxJS Demonstrados

    take(): Emite apenas os primeiros n valores de um Observable.

    takeWhile(): Emite valores enquanto uma condição fornecida for verdadeira.

    first(): Emite apenas o primeiro valor emitido por um Observable.

    skipUntil(): Ignora os valores emitidos por um Observable até que outro Observable emita um valor.

    takeLast(): Emite apenas os últimos n valores de um Observable.

    throttleTime(): Emite o primeiro valor e, em seguida, ignora os valores subsequentes durante um período de tempo específico.

    debounceTime(): Emite um valor do Observable após um período de tempo específico ter passado sem outra emissão.

    auditTime(): Emite o último valor emitido pelo Observable dentro de um intervalo de tempo especificado.

Uso de Pipe Async no Angular

    asyncPipeByService(): Este método utiliza o pipe async no Angular para lidar com um Observable assíncrono retornado por um serviço.

Subscrições e Gerenciamento

    UnsubComponent: Este é um componente abstrato que implementa a lógica para cancelar todas as assinaturas quando o componente é destruído.

Serviço DataService

O serviço DataService fornece um método getData() que retorna um Observable assíncrono simulado com um atraso.
Componente AppComponent

O componente AppComponent é o componente principal do aplicativo, responsável por exibir o botão para controlar a exibição do componente AppFilhoComponent.
Utilização no Template HTML


<button (click)="mostrar = !mostrar">/ Esconder component Filho</button>
<app-app-filho *ngIf="mostrar"></app-app-filho>
<router-outlet></router-outlet>

Este trecho de código no template HTML do AppComponent exibe o botão para controlar a visibilidade do componente AppFilhoComponent e também fornece um local para a navegação entre rotas.

## Operadores RxJS e Tipos de Subscriptions

RxJS é uma biblioteca reativa para JavaScript que facilita o trabalho com streams de dados assíncronos. Abaixo estão alguns dos operadores RxJS mais comuns e seus subtipos, bem como os tipos de subscriptions disponíveis:

### Operadores de Transformação

- **`map()`**: Transforma os valores emitidos por um Observable, aplicando uma função a cada valor.
- **`pluck()`**: Seleciona uma propriedade específica de cada objeto emitido por um Observable.
- **`switchMap()`**: Mapeia cada valor emitido por um Observable para um novo Observable e descarta os Observables anteriores.
- **`mergeMap()`**: Mapeia cada valor emitido por um Observable para um novo Observable e os mescla em uma única saída.

### Operadores de Filtragem

- **`filter()`**: Filtra os valores emitidos por um Observable com base em uma condição.
- **`take()`**: Emite apenas os primeiros n valores de um Observable e completa.
- **`distinctUntilChanged()`**: Emite apenas valores do Observable que são diferentes do valor anterior.
- **`debounceTime()`**: Emite um valor do Observable após um período de tempo específico ter passado sem outra emissão.

### Operadores de Combinação

- **`combineLatest()`**: Combina os valores emitidos por vários Observables em um único Observable, emitindo um array de valores.
- **`merge()`**: Combina vários Observables em um único Observable, emitindo todos os valores em ordem de chegada.
- **`zip()`**: Combina os valores emitidos por vários Observables em pares, emitindo uma matriz de valores emparelhados.

### Operadores de Tempo

- **`debounceTime()`**: Emite um valor do Observable após um período de tempo específico ter passado sem outra emissão.
- **`throttleTime()`**: Emite o primeiro valor e, em seguida, ignora os valores subsequentes durante um período de tempo específico.
- **`delay()`**: Atrasa a emissão de valores do Observable por um determinado período de tempo.

### Tipos de Subscriptions

- **`Subscription`**: Uma assinatura básica que pode ser usada para adicionar outras assinaturas e cancelá-las em um único ponto.
- **`Subject`**: Um tipo especial de Observable que permite valores serem compartilhados entre múltiplas assinaturas.
- **`BehaviorSubject`**: Um tipo de Subject que armazena o valor mais recente emitido e o emite imediatamente para novas assinaturas.
- **`ReplaySubject`**: Um tipo de Subject que armazena um buffer de valores emitidos e os reenvia para novas assinaturas.

### Variantes e Subtipos

Além dos operadores e tipos de subscriptions mencionados acima, existem também variantes e subtipos desses operadores e subscriptions, como:

- **Flags**: Usados para sinalizar eventos ou estados específicos em um stream de dados.
- **Tap**: Usado para depuração, permite observar valores sem alterá-los.
- **Debounce**: Atrasa a emissão de valores do Observable, mas ignora os valores emitidos durante o atraso.

## Pipe Async no Angular

O pipe `async` no Angular é usado para lidar com observáveis assíncronos no template HTML. Por exemplo:

```html
<div *ngIf="data$ | async as data">
  <p>{{ data }}</p>
</div>
