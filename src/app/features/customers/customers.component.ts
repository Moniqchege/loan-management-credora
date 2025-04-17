import { Component, OnInit } from '@angular/core';
import { Customer } from '../../core/models/customer.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  customer: Customer = { id: 0, identification: '', name: '', email: '', phone: '' };
  isEditing = false;

  ngOnInit() {
    const storedCustomers = localStorage.getItem('customers');
    const searchQuery = localStorage.getItem('searchQuery')?.toLowerCase() || '';
  
    if (storedCustomers) {
      const allCustomers = JSON.parse(storedCustomers);
      this.customers = searchQuery
        ? allCustomers.filter((c: any) =>
            c.name.toLowerCase().includes(searchQuery)
          )
        : allCustomers;
    }
  }

  saveCustomer() {
    if (this.isEditing) {
      const index = this.customers.findIndex(c => c.id === this.customer.id);
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
    this.customers = this.customers.filter(c => c.id !== id);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  resetForm() {
    this.customer = { id: 0, identification: '', name: '', email: '', phone: '' };
    this.isEditing = false;
  }
}
