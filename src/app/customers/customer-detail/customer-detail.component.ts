import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';

import { CustomerService } from '../../core/services/customer.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Customer, Toastr } from '../../core/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  customerForm: FormGroup;
  bsModalRef: BsModalRef;
  toastrConfig: Toastr;
  customerFullName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
  ) {
    this.toastrConfig = {
      timeOut: 3000,
      enableHtml: true
    }
  }

  ngOnInit() {
    this.buildForm();
    this.route.data.subscribe((data: { customer: Customer }) => {
      if (data.customer) {
        this.customer = data.customer;
        this.customerFullName = `${this.customer.firstName} ${this.customer.lastName}`;
        this.customer.birthDate = this.datePipe.transform(this.customer.birthDate, 'yyyy-MM-dd');
        this.customer.lastContact = this.datePipe.transform(this.customer.lastContact, 'yyyy-MM-ddThh:mm'); // this.formatDateTime(this.customer.lastContact, 'time');
        this.customerForm.patchValue(this.customer);
      }
    });
  }
  /**
   * Edit Customer
   */
  editCustomer() {
    this.customerForm.value._id = this.customer._id;
    this.customerService.save(this.customerForm.value).subscribe(customer => {
      this.customerFullName = `${customer.firstName} ${customer.lastName}`;
      this.toastrService.success(
        `Customer <span class='text-capitalize'><b>${customer.firstName}</b></span> edited seccussfully.`,
        'Edit Customer',
        this.toastrConfig
      );
    }, (error) => {
      this.toastrService.error(
        error,
        'Edit Customer',
        this.toastrConfig
      );
    });
  }
  /**
   * Delete customer
   */
  deleteCustomer() {
    this.customerService.destroy(this.customer._id).subscribe(customer => {
      this.router.navigate(['/customers']);
    }, (error) => {
      this.toastrService.error(
        error,
        'Delete Customer',
        this.toastrConfig
      );
    });
  }
  /**
   * Open confirmation modal when click on delete button
   */
  openModal() {
    const initialState = {
      body: 'Are you sure you want to delete this Customer ?',
      title: `Delete Customer <span class="text-danger text-capitalize">${this.customer.firstName} ${this.customer.lastName}</span>`,
      confirmBtnClass: 'btn btn-danger',
      confirmBtnName: 'Yes',
      cancelBtnName: 'No',
      hasCloseBtn: false,
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.modalService.onHide.subscribe((reason: string) => {
      if (reason == 'Yes') {
        this.deleteCustomer();
      }
    });
  }
  /**
   * Build Edit form
   */
  buildForm() {
    this.customerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      lastContact: new FormControl(null, Validators.required),
      gender: new FormControl('m', Validators.required),
      customerLifetimeValue: new FormControl(0, Validators.min(0)),
    });
  }

}
