import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from "ionic-angular";
import * as _ from 'lodash';

import { RfqSearchPage, ViewRfqPage, CreateRfqPage } from "../pages";
import { RfqApi } from "../../shared/shared";

@Component({
    templateUrl: 'rfq-dashboard.page.html'
})

export class RFQDashboardPage implements OnInit {
    rfqs: any;
    rfq_title: string;
    constructor(private nav: NavController, private loadingController: LoadingController, private rfqApi: RfqApi) { }

    ngOnInit() { 
        this.rfq_title = "SPSX RFQ";
    }

    goToRFQs() {
        this.nav.push(RfqSearchPage);
    }

    ionViewDidLoad() {
        this.initializeItems();        
    }

    ionViewWillEnter(){ }

    initializeItems() {
        let loader = this.loadingController.create({
            content: "Loading..."
        })
        loader.present();
        try {
            this.rfqApi.getRFQs().subscribe(data => {
                this.rfqs = _(data).slice(0, 4).value();  
                loader.dismiss();             
            });             
        } catch (error) {
            loader.dismissAll();
        }
    }

    itemTapped($event, rfq) {
        this.nav.push(ViewRfqPage, rfq)
    }

    createRFQ() {
        this.nav.push(ViewRfqPage, null);
    }
}