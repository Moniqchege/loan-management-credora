import { Component, OnInit } from '@angular/core';
import { Customer } from '../../core/models/customer.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  customer: Customer = {
    id: 0,
    identification: '',
    name: '',
    email: '',
    phone: '',
  };
  isEditing = false;
  searchQuery: string = '';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.loadCustomers();  // Initial load
    this.searchService.searchQuery$.subscribe((query) => {
      this.searchQuery = query;
      this.loadCustomers();  // Re-load customers whenever the search query changes
    });
  }

  loadCustomers(): void {
    const storedCustomers = localStorage.getItem('customers');

    if (storedCustomers) {
      const allCustomers: Customer[] = JSON.parse(storedCustomers);
      this.customers = this.searchQuery
        ? allCustomers.filter((c: Customer) =>
            c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : allCustomers;
    }
  }

  onSearch(): void {
    this.searchService.setSearchQuery(this.searchQuery.trim());
    this.searchQuery = '';  // Clear the input field immediately
  }

  saveCustomer() {
    if (this.isEditing) {
      const index = this.customers.findIndex((c) => c.id === this.customer.id);
      if (index > -1) this.customers[index] = { ...this.customer };
    } else {
      this.customer.id = Date.now();
      this.customers.push({ ...this.customer });
    }

    localStorage.setItem('customers', JSON.stringify(this.customers));
    this.resetForm();
  }

  editCustomer(customer: Customer) {
    this.customer = { ...customer };
    this.isEditing = true;
  }

  deleteCustomer(id: number) {
    this.customers = this.customers.filter((c) => c.id !== id);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  resetForm() {
    this.customer = {
      id: 0,
      identification: '',
      name: '',
      email: '',
      phone: '',
    };
    this.isEditing = false;
  }

  isHighlighted(name: string): boolean {
    if (!this.searchQuery) return false;
    return name.toLowerCase().includes(this.searchQuery.toLowerCase());
  }

  clearHighlight(): void {
    this.searchService.clearSearchQuery(); // clears from service
    this.searchQuery = ''; // clears local
    this.loadCustomers();  // refresh customers to remove highlight
  }
  
}
