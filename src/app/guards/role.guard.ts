import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);

  let requiredRoles = route.data['roles'] || []; //sol taraf boş ise bunu boş array yap.
  if (authService.isAuthorized(requiredRoles)) return true;

  toastr.info('Bu sayfayı görüntülemeye yetkiniz bulunmamaktadır.');
  router.navigateByUrl('/');
  return true;
  return true;
};
