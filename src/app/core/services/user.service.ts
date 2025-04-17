import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'users';

  constructor() {
    this.initializeUsersInLocalStorage();
  }

  private initializeUsersInLocalStorage(): void {
    const users = localStorage.getItem(this.localStorageKey);
    if (!users) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  getUserById(id: number): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  addUser(newUser: User): void {
    const users = this.getUsers();
    newUser.id = this.generateNextUserId(users);
    users.push(newUser);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  private generateNextUserId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }
}
