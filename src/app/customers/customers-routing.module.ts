import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersResolver } from './customers-resolver.service';

const routes: Routes = [
    { path: '', redirectTo: '/customers', pathMatch: 'full' },
    {
        path: 'customers',
        data: {
            breadcrumb: 'Customers'
        },
        children: [
            {
                path: '',
                component: CustomersListComponent,
                data: {
                    breadcrumb: ''
                },
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule { }