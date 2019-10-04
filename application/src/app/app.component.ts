import { Component } from '@angular/core';
import { AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-jwt-project';

  constructor(private authService: AuthService ) {
  }

  logIn = this.authService.logIn;

  logout() {
    this.authService.logout();
  }

}
