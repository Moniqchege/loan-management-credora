import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
    { id: 2, email: 'user1@gmail.com', password: 'user123', role: 'user' }
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
