import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule, TooltipModule } from 'ngx-bootstrap';

import { CustomersListComponent } from './customers-list/customers-list.component';
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
    CoreModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [CustomersListComponent, LoaderComponent],
  providers: [
    CustomersResolver,
    DatePipe,
  ]
})
export class CustomersModule { }
