import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string, username: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password && u.username === username);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  register(email: string, password: string, username: string): boolean {
    const users = this.getUsers();
    const userExists = users.some(u => u.email === email);

    if (!userExists) {
      const newUser = { 
        id: Date.now(),
        username,
        email,
        password
       }; 
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users)); 
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  private getUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  // private generateUserId(users: User[]): number {
    // if (users.length === 0) return 1;
    // return Math.max(...users.map(user => user.id)) + 1;
  // }
}
