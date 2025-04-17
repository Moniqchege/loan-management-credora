import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string = ''
  signupObj: any = {
    username: '',
    email:  '',
    password:  '',
    confirmPassword:  '',
  };

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}


  onSignup() {
    const { username, email, password, confirmPassword} = this.signupObj;

    if (!username || !email || !password || !confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match'
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const usernameExists = users.some((user: any) => user.username === username);
    const emailExists = users.some((user: any) => user.email === email);

    if (usernameExists) {
      this.errorMessage = 'Username already exists';
      return;
    }

    if (emailExists) {
      this.errorMessage = 'Email already registered';
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful');
    this.router.navigate(['/login']);
  }

  goToSignin() {
    this.router.navigate(['/login']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
