import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import * as _ from 'lodash';

import { ViewRfqPage } from "../pages";
import { RfqApi } from "../../shared/shared";

@Component({
    templateUrl: 'rfq-search.page.html'
})

export class RfqSearchPage implements OnInit {

    rfqs: any;
    rfq_type: string;
    rfq_title: string;
    queryText: string;

    constructor(private nav: NavController, private navParams: NavParams, private toastController: ToastController, private rfqApi: RfqApi, private loadingController: LoadingController) {
        this.rfq_type = navParams.data;
    }

    ngOnInit() { }

    itemTapped($event, rfq) {
        this.nav.push(ViewRfqPage, rfq);
    }

    ionViewDidLoad() {
        this.initializeItems();
    }

    initializeItems() {
        let loader = this.loadingController.create({
            content: "Loading..."
        });
        loader.present();
        try {
            this.rfqApi.getRFQs().subscribe(data => {            
                switch (this.rfq_type) {
                    case 'search':
                        this.rfq_title = 'Select a RFQ';
                        this.rfqs = data;
                        break;
                    case 'converted':
                        this.rfq_title = 'Converted RFQs';
                        this.rfqs = _(data).slice(7, 20).value();
                        break;
                    case 'expired':
                        this.rfq_title = 'Expired RFQs';
                        this.rfqs = _(data).slice(3, 5).value();
                        break;
                    default:
                        this.rfq_title = 'Select a RFQ';
                        this.rfqs = data;
                        break;
                }
                loader.dismiss();
            });
        } catch (error) {
            loader.dismissAll();
        }
    }

    getItems(ev: any) {
        if (!this.queryText) {
            return this.initializeItems();
        }

        this.rfqs = this.rfqs.filter((rfq) => {
            return (rfq.ProjectNbr.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1);
        })
    }

    doRefresh(refresher){
        try {
            this.getItems(this.queryText);
            refresher.complete();            
        } catch (error) {
            refresher.complete();
        }
    }
}