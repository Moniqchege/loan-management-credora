import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  mode: 'login' | 'register' = 'login';

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }
}
