import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = JSON.parse(localStorage.getItem('customers')!) || [];

  getCustomers(): Customer[] {
    return this.customers;
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  updateCustomer(customer: Customer) {
    const index = this.customers.findIndex(c => c.id === customer.id);
    if (index !== -1) {
      this.customers[index] = customer;
      localStorage.setItem('customers', JSON.stringify(this.customers));
    }
  }

  deleteCustomer(customerId: number) {
    this.customers = this.customers.filter(c => c.id !== customerId);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }
}
