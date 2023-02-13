import {Component} from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import it from '@angular/common/locales/it';
import {registerLocaleData} from '@angular/common';

registerLocaleData(it);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pizzastore';

  constructor(public authService: AuthService) {
  }
}
