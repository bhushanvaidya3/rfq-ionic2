import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";

import { RfqCommon } from "../../common/common";
import { RfqApi } from "../../shared/rfq-main.service";
import { RfqHeader, RfqLineItem } from "../../entities/entities";
import { ProductSearchPage } from "../pages";

@Component({
    templateUrl: 'view-rfq-details.page.html'
})

export class ViewRfqDetailsPage implements OnInit {
    rfqHeader: RfqHeader;
    rfqLineItem: RfqLineItem;
    isApproved: boolean;
    isAdd: boolean = false;
    headerText: string;
    saveText: string;
    constructor(private nav: NavController,
        private navParams: NavParams,
        private loadingController: LoadingController,
        private toastController: ToastController,
        private rfqApi: RfqApi) {
        if (this.navParams.data.rfqLine == undefined)
            this.isAdd = true;
        else
            this.isAdd = false;
        this.rfqHeader = this.navParams.data.rfq; 

        if (this.navParams.data.rfq != undefined) {
            this.rfqLineItem = this.navParams.data.rfqLine;
            this.rfqHeader.Status_Id = RfqCommon.rfqInProcessId; //Set default status to InProcess for new RFQ            
        }        
        this.initializeRfqLineItem();
    }

    ngOnInit() {
        let loader = this.loadingController.create({
            content: "Loading..."
        });
        try {
            loader.present();
            //this.getProjectStates();
            loader.dismiss();
        } catch (error) {
            loader.dismissAll();
            let toast = this.toastController.create({
                message: `Error fetching data for RFQ: ${this.rfqLineItem.Dtl_Id}`,
                duration: RfqCommon.toasterDuration,
                position: `bottom`
            });
            toast.present();
        }
    }

    initializeRfqLineItem() {
        if (this.isAdd == false) {
            this.isApproved = (this.rfqLineItem.RFQ_Status === RfqCommon.rfqReadyForQuoteGeneration);
            this.headerText = RfqCommon.rfqEditLineText;
        }
        else {
            this.isApproved = false;
            this.rfqLineItem = new RfqLineItem();
            this.rfqLineItem.RFQ_Status = RfqCommon.rfqInProcess;
            this.rfqLineItem.Line_Status = "true";
            this.headerText = RfqCommon.rfqCreateNewLineText;
        }
        this.isAdd == true ? this.saveText = "Create" : this.saveText = "Update";
    }

    goHome() {
        this.nav.popToRoot();
    }

    ProcessRfqLineItem() {
        if(this.rfqHeader.Hdr_Id == null || this.rfqHeader.Hdr_Id == undefined){
            this.createRFQLineItem();
        }
        else{
            this.rfqApi.updateRFQLineItem(this.rfqHeader, this.rfqLineItem).subscribe(data => {
                let toast = this.toastController.create({
                    message: RfqCommon.rfqLineItemUpdated,
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            });
        }
    }

    createRFQLineItem() {
        let rfqMessage: string;
        (this.rfqHeader.Hdr_Id == null || this.rfqHeader == undefined) ? rfqMessage = RfqCommon.rfqCreated : rfqMessage = RfqCommon.rfqLineItemCreated;
        this.rfqApi.createRFQLineItem(this.rfqHeader, this.rfqLineItem).subscribe(data => {
            let toast = this.toastController.create({
                message: rfqMessage,
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        });
    }

    getRFQLineStatus() {
        //TODO: Implement this...
    }

    showProductSearch(){
        let rfqHeader = this.rfqHeader;
        let rfqLineItem = this.rfqLineItem;
        this.nav.push(ProductSearchPage, {
            rfqHeader,
            rfqLineItem,
            parent: this
        });
    }

    setValues(rfqHeader, rfqLineItem){
        this.rfqHeader = rfqHeader;
        this.rfqLineItem = rfqLineItem;
    }
}