import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('deneme');
  const toast = inject(ToastrService);
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) return true;

  toast.info('Önce login olmalısınız...');
  router.navigateByUrl('auth/login');
  return true;
};
