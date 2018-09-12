import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule, TooltipModule } from 'ngx-bootstrap';
import { DataTableModule } from 'angular-6-datatable';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersResolver } from './customers-resolver.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    CoreModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [CustomerDetailComponent, CustomersListComponent, LoaderComponent],
  providers: [
    CustomersResolver,
    DatePipe,
  ]
})
export class CustomersModule { }
