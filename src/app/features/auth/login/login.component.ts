import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj = {
    EmailId: '',
    password: ''
  };

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onLogin(): void {
    const users = this.userService.getUsers();

    const matchedUser = users.find((user: User) =>
      user.email === this.loginObj.EmailId &&
      user.password === this.loginObj.password
    );

    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      alert(`Welcome ${matchedUser.role === 'admin' ? 'Admin' : 'User'}!`);
      
      if (matchedUser.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      alert('Invalid email or password.');
    }
  }

  goToSignup(): void {
    console.log('Navigating to signup...');
    this.router.navigate(['/register']);
  }
}
