import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchQuery = '';
  showSearchBar = true;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        const hiddenRoutes = ['/login', '/register', '/dashboard'];
        this.showSearchBar = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }

  onSearch(): void {
    localStorage.setItem('searchQuery', this.searchQuery);
    this.searchQuery = '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
