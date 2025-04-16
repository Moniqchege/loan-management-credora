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
    firstName:  '',
    lastName:  '',
    email:  '',
    password:  '',
    confirmPassword:  '',
  };

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}


  onSignup() {
    if (this.signupObj.password !== this.signupObj.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const adminEmail = 'admin1@gmail.com';
    const adminPassword = 'PassworD';

    

    const userRole = (
      this.signupObj.EmailId === adminEmail && 
      this.signupObj.password === adminPassword) ? 'Admin' : 'User';

    const newUser = {
      firstName: this.signupObj.firstName,
      lastName: this.signupObj.lastName,
      email: this.signupObj.EmailId,
      password: this.signupObj.password,
    };

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful');
    this.router.navigateByUrl('signin');
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
