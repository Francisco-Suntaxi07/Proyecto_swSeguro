import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { UsersService } from '../services/users.service';

export const guardsGuard: CanMatchFn = (route, state) => {
  const usersService = inject(UsersService);
  return usersService.getAuthToken();
};
