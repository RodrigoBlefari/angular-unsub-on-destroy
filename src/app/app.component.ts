import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-unsub-on-destroy';
  mostrar: boolean = true;

  constructor() {
    console.log('APP COMPONENT');
  }
}
