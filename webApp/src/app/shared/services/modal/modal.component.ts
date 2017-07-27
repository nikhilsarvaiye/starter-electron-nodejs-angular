import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ModalOptions, ModalButton, Modal, ModalBody, ModalColorCode, ModalSize, ModalClassHelper } from './modal.classes';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { HandleError } from './../../../core/error/error.handler';

@Component({
    selector: 'modal',
    styleUrls: [
    ],
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, AfterViewInit {

    @ViewChild('modalDialog') public modalDialogDirective: ModalDirective;

    public modal: Modal;
    
    constructor() {
        this.modal = new Modal();
    }

    public ngOnInit() {
        console.log('hello `ModalComponent` component');
    }

    public ngAfterViewInit() {

    }

    public errorSummary(messsage: string, errors: Array<HandleError>): void {
        this.hide();
        this.modal.title = "Error";
        this.modal.options.headerClasses = ModalClassHelper.getBackgroundClass(ModalColorCode.Danger);
        this.modal.body = new ModalBody("", messsage, errors);
        this.modal.buttons = new Array<ModalButton>();
        this.modal.buttons.push(new ModalButton("Okay", () => {
            this.hide();
        }));
        this.show();
    }
    
    public error(messsage: string): void {
        this.hide();
        this.modal.title = "Error";
        this.modal.options.headerClasses = ModalClassHelper.getBackgroundClass(ModalColorCode.Danger);
        this.modal.body = new ModalBody(messsage);
        this.modal.buttons = new Array<ModalButton>();
        this.modal.buttons.push(new ModalButton("Okay", () => {
            this.hide();
        }));
        this.show();
    }

    public success(messsage: string, callback?: () => void): void {
        this.hide();
        this.modal.title = "Success";
        this.modal.options.headerClasses = ModalClassHelper.getBackgroundClass(ModalColorCode.Success);
        this.modal.body = new ModalBody(messsage);
        this.modal.buttons = new Array<ModalButton>();
        this.modal.buttons.push(new ModalButton("Okay", () => {
            this.hide();
            if(callback)
                callback();
        }));
        this.show();
    }

    public info(messsage: string, callback?: () => void): void {
        this.hide();
        this.modal.title = "Info";
        this.modal.options.headerClasses = ModalClassHelper.getBackgroundClass(ModalColorCode.Info);
        this.modal.body = new ModalBody(messsage);
        this.modal.buttons = new Array<ModalButton>();
        this.modal.buttons.push(new ModalButton("Okay", () => {
            this.hide();
            if(callback)
                callback();
        }, ModalClassHelper.getButtonClass(ModalColorCode.Info)));
        this.show();
    }

    public confirm(messsage: string, callback: (result: boolean) => void): void {
        this.hide();
        this.modal.title = "Confirm";
        this.modal.options.headerClasses = ModalClassHelper.getBackgroundClass(ModalColorCode.Warning);
        this.modal.body = new ModalBody(messsage);
        this.modal.buttons = new Array<ModalButton>();
        this.modal.buttons.push(new ModalButton("Yes", () => {
            this.hide();
            callback(true);
        }, ModalClassHelper.getButtonClass(ModalColorCode.Warning)));
        this.modal.buttons.push(new ModalButton("No", () => {
            this.hide();
            callback(false);
        }));
        this.show();
    }

    public show(): void {
        this.modalDialogDirective.show();
    }

    public hide(modalDialogDirective?: ModalDirective): void {
        this.modalDialogDirective = modalDialogDirective || this.modalDialogDirective;
        this.modalDialogDirective.hide();
    }
}

export { ModalOptions, ModalButton, Modal, ModalBody, ModalColorCode, ModalSize, ModalClassHelper }