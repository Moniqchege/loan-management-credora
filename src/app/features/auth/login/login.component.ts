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
  loginObj:Partial<User> = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onLogin():void{
    const { username, email, password } = this.loginObj;

    if (!email || !password || !username) {
      alert('Please fill in all fields');
      return;
    }

    const user = this.userService.getUserByEmailAndPassword(email, password, username);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Welcome, ${username}`);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid email or password')
    }
  }

  goToSignup(): void {
    this.router.navigate(['/register']);
  }
}
