import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication/authentication.service';

export const authGuard = () => {

  if (inject(AuthenticationService).isAuthenticated()) {
    return true;
  }


  return inject(Router).parseUrl('/login');
};