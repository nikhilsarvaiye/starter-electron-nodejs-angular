import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomController } from './../../../shared/controllers/dom/dom-controller';

@Component({
    selector: 'side-nav',
    styleUrls: ['./side-nav.component.scss'],
    templateUrl: './side-nav.component.html'
})
export class SideNavComponent implements OnInit {

    public ngOnInit() {
        console.log('hello `Side Nav` component');
    }

    ngAfterViewInit() {
        DomController.updateSideNav();
    }
}

