import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true
})
export class SidebarComponent {
  isSidebarOpen = false;
  isLargeScreen = window.innerWidth >= 768;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    if (!this.isLargeScreen) {
      this.isSidebarOpen = false;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.isLargeScreen = window.innerWidth >= 768;
    if (this.isLargeScreen) {
      this.isSidebarOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideSidebar = target.closest('.sidebar');
    const clickedOpenBtn = target.closest('.open-btn');

    if (!clickedInsideSidebar && !clickedOpenBtn && !this.isLargeScreen) {
      this.isSidebarOpen = false;
    }
  }
}