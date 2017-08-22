import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from "ionic-angular";

import { ViewRfqDetailsPage } from "../pages";
import { RfqApi } from "../../shared/shared";
import { RfqHeader, RfqLineItem } from "../../entities/entities";

@Component({
    templateUrl: 'product-search.page.html'
})

export class ProductSearchPage implements OnInit {
    headerText: string = "Product Search";
    products: any;
    queryText: string;
    rfqHeader: RfqHeader;
    rfqLineItem: RfqLineItem;
    parent: any;

    constructor(private nav: NavController, private navParams: NavParams, private loadingController: LoadingController, private rfqApi: RfqApi) {
        this.rfqHeader = this.navParams.data.rfqHeader;
        this.rfqLineItem = this.navParams.data.rfqLineItem;
        this.parent = this.navParams.data.parent;
    }

    ngOnInit() { }

    ionViewDidLoad() {
        this.initializeItems();
    }

    initializeItems() {
        let loader = this.loadingController.create({
            content: "Loading..."
        });
        loader.present();
        try {
            this.rfqApi.getProducts(this.rfqHeader.RFQ_SoldTo_CustNbr, this.rfqHeader.RFQ_SoldTo_CustSeq).subscribe(data => {
                this.products = data;
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

        this.products = this.products.filter((product) => {
            return (product.ProductNbr.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1);
        })
    }

    doRefresh(refresher) {
        try {
            this.getItems(this.queryText);
            refresher.complete();
        } catch (error) {
            refresher.complete();
        }
    }

    itemTapped($event, product) {
        this.rfqLineItem.Product_Nbr = product.ProductNbr;
        this.parent.setValues(this.rfqHeader, this.rfqLineItem);
        this.nav.pop();
    }
}