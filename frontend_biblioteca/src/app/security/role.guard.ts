import { ActivatedRoute, ActivatedRouteSnapshot, CanMatchFn } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';

export const roleGuard: CanMatchFn = (route, state) => {
  const usersService = inject(UsersService);

  const authRole = (route: ActivatedRouteSnapshot): boolean => {
    const roles = ["administrador", "estudiante", "superadmin"];
    const expectedRoles = route.data['expectedRoles'] as string[]; 
    const roleMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== -1);
    return (roleMatches < 0) ? false : true;
  };

  return true;
};



