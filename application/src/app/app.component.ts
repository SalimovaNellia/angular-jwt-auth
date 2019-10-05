import { Component } from '@angular/core';
import { AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentToken: string;
  title = 'angular-jwt-project';

  constructor(private authService: AuthService ) {
    this.authService.currentToken.subscribe(currentToken => this.currentToken = currentToken);
  }

  logout() {
    this.authService.logout();
  }

}
