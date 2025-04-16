import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'loan-management-credora';

  get isAuthPage(): boolean {
    const currentUrl = window.location.pathname;
    return currentUrl.includes('login') || currentUrl.includes('register');
  }
}
