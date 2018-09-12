import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastrService } from 'ngx-toastr';

import { ModalComponent } from '../../shared/modal/modal.component';
import { CustomerService } from '../../core/services/customer.service';
import { Customer, Toastr } from '../../core/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

    customers: Array<Customer>;
    bsModalRef: BsModalRef;
    toastrConfig: Toastr;
    customerForm: FormGroup;
    dataLoader: boolean;
    searchString: string;

    @ViewChild('lgModal')
    lgModal: ModalDirective;

    constructor(
        private customerService: CustomerService,
        private modalService: BsModalService,
        private toastrService: ToastrService) {
    }

    ngOnInit() {
        this.displayCustomers();
        this.buildForm();
        this.toastrConfig = {
            timeOut: 3000,
            enableHtml: true,
        };
    }
    /**
     * Display list of all customers
     */
    displayCustomers() {
        this.dataLoader = true;
        this.customerService.list().subscribe(data => {
            this.dataLoader = false;
            this.customers = data;
        }, () => {
            this.dataLoader = false;
        });
    }
    /**
     * Delete customer
     * 
     * @param customer customer data
     */
    deleteCustomer(customer) {
        this.customerService.destroy(customer._id).subscribe(customer => {
            if (customer && customer.hasOwnProperty('_id')) {
                this.customers = this.customers.filter(res => res._id !== customer._id);
                this.toastrService.success(
                    `Customer <span class='text-capitalize'><b>${customer.firstName} ${customer.lastName}</b></span> deleted seccussfully.`,
                    'Delete Customer',
                    this.toastrConfig
                );
            }
        }, (error) => {
            this.toastrService.error(
                error,
                'Delete Customer',
                this.toastrConfig
            );
        });
    }
    /**
     * Create a new customer
     */
    createCustomer() {
        this.lgModal.hide();
        this.customerService.save(this.customerForm.value).subscribe(customer => {
            this.customers.unshift(customer);
            this.clearForm();
            this.toastrService.success(
                `Customer <span class='text-capitalize'><b>${customer.firstName} ${customer.lastName}</b></span> created seccussfully.`,
                'Create Customer',
                this.toastrConfig
            );
        }, (error) => {
            this.clearForm();
            this.toastrService.error(
                error,
                'Create Customer',
                this.toastrConfig
            );
        });
    }
    /**
     * Confirmation modal opened when click on delete button
     * 
     * @param customer customer data
     */
    openModal(customer) {
        const initialState = {
            body: 'Are you sure you want to delete this Customer ?',
            title: `Delete Customer <span class="text-danger text-capitalize">${customer.firstName} ${customer.lastName}</span>`,
            confirmBtnClass: 'btn btn-danger',
            confirmBtnName: 'Yes',
            cancelBtnName: 'No',
            hasCloseBtn: false,
        };
        this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
        this.modalService.onHide.subscribe((reason: string) => {
            if (reason == 'Yes') {
                this.deleteCustomer(customer);
            }
        });
    }
    /**
     * Build form to create a new customer
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
    /**
     * Reset form after create a customer
     */
    clearForm() {
        this.customerForm.reset();
    }

}
