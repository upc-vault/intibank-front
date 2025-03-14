import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bank-front-end';

  constructor(public authService: AuthenticationService) {};

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  // register(registerModel: Register) {
  //   this.authService.register(registerModel).subscribe();
  // }

  // login(loginModel: Login) {
  //   this.authService.login(loginModel).subscribe((jwtModel) => {
  //     localStorage.setItem('jwtToken', jwtModel.data.token);
  //   });
  // }
}
