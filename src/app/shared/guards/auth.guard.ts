// src/app/shared/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.currentUserValue) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
