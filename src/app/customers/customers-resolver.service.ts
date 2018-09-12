
import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Customer } from '../core/models';
import { CustomerService } from '../core/services/customer.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CustomersResolver implements Resolve<Customer> {
    constructor(
        private customerService: CustomerService,
        private router: Router
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
    ): Observable<any> {
        return this.customerService.get(route.params['id'])
            .pipe(catchError((err) => this.router.navigateByUrl('/')));
    }
}