import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  title: string;
  confirmBtnName: string = 'Yes';
  confirmBtnClass: string = 'btn btn-default';
  cancelBtnName: string = 'Close';
  cancelBtnClass: string = 'btn btn-white';
  hasCloseBtn: boolean = true;
  hasCancelBtn: boolean = true;
  body: string;
  list: any[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
  }

  /**
   * Close the modal and update dissmiss reason 
   * when click on confirm button
   */
  confirm() {
    this.modalService.setDismissReason('Yes');
    this.bsModalRef.hide();
  }

}
