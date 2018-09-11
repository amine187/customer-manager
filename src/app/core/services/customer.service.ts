import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../models';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private apiService: ApiService
  ) { }
  
  /**
   * Get specific customer
   * 
   * @param id Customer identifier
   * @returns Customer of given id
   */
  get(id): Observable<Customer> {
    return this.apiService.get('/customers/' + id)
      .pipe(map(data => data));
  }

  /**
   * List of all customers
   */
  list() {
    return this.apiService.get('/customers')
      .pipe(map(data => data));
  }

  /**
   * Remove Customer
   * 
   * @param id Customer identifier
   * @returns deleted customer
   */
  destroy(id): Observable<Customer> {
    return this.apiService.delete('/customers/' + id);
  }

  /**
   * Update a customer or create a new one
   * 
   * @param customer Customer data
   * @returns updated customer
   */
  save(customer): Observable<Customer> {
    // If we're updating an existing customer
    if (customer.hasOwnProperty('_id')) {
      return this.apiService.put('/customers/' + customer._id, customer)
        .pipe(map(data => data));

    // Otherwise, create a new customer
    } else {
      return this.apiService.post('/customers/', customer)
        .pipe(map(data => data));
    }
  }
}
