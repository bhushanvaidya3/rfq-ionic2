import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";

import * as _ from "lodash";

import { ViewRfqDetailsPage, RFQDashboardPage } from "../pages";
import { RfqApi } from "../../shared/shared";
import { RfqCommon } from "../../common/common";
import { RfqHeader, RfqLineItem } from "../../entities/entities";

@Component({
    templateUrl: 'view-rfq.page.html'
})

export class ViewRfqPage implements OnInit {
    rfq: RfqHeader;
    rfqItems: RfqLineItem; 
    headerText: string;   
    isAdd: boolean = false;
    localDate: Date;
    countries: any;
    projectStates: any;
    requiredSoldTos: any;
    selectedCountry: string;
    selectedProjectState: string;
    selectedOriginState: string;
    selectedSoldTo: string;
    createNewLine: boolean = false;
    //Spinners
    soldToSpinner: boolean;
    countrySpinner: boolean;
    stateSpinner: boolean;

    constructor(private nav: NavController, private navParams: NavParams, private loadingController: LoadingController, private toastController: ToastController, private rfqApi: RfqApi) {
        this.rfq = Object.assign({}, this.navParams.data);        
        (this.rfq.RFQ_Nbr == null || this.rfq.RFQ_Nbr == undefined) ? this.isAdd = true : this.isAdd = false; //set Add/Edit Mode
        if(!this.isAdd){
            this.selectedSoldTo = this.rfq.RFQ_SoldTo_CustNbr + "-" + this.rfq.RFQ_SoldTo_CustSeq;
            this.selectedCountry = this.rfq.RFQ_ProjectCountry;
            this.selectedProjectState = this.rfq.RFQ_ProjectState;
            this.selectedOriginState = this.rfq.RFQ_OriginState;
            this.headerText = "Edit RFQ";            
        }
        else{
            this.headerText = "Create RFQ";
        }
    }

    ngOnInit() {
        try {
            this.getRFQDtls_Records();
            this.getRequiredSoldTos();
            this.getProjectCountries();
            this.getProjectStates();
        } catch (error) {
            this.soldToSpinner = this.countrySpinner = this.stateSpinner = false;
            let toast = this.toastController.create({
                message: `Error fetching data for RFQ: ${this.rfq.RFQ_Nbr}`,
                duration: RfqCommon.toasterDuration,
                position: `bottom`
            });
            toast.present();
        }
    }

    itemTapped($event, rfq, rfqLine) {
        this.nav.push(ViewRfqDetailsPage, {
            rfq,
            rfqLine
        });
    }

    goHome() {
        this.nav.popToRoot();
    }

    ionViewDidLoad() {
    }

    showToast(message) {
        //TODO: Save logic yet to be implemented
        let toast = this.toastController.create({
            message: message,
            duration: RfqCommon.toasterDuration,
            position: 'bottom'
        });
        toast.present();
    }

    getRequiredSoldTos() {
        this.soldToSpinner = true;
        this.rfqApi.getRequiredSoldTos().subscribe(data => {
            this.requiredSoldTos = data;
            this.soldToSpinner = false;
        });
    }

    getProjectCountries() {
        this.countrySpinner = true;
        let rfqNbr: string;
        this.isAdd == true ? rfqNbr = "-1": rfqNbr = this.rfq.RFQ_Nbr;  
        this.rfqApi.getAllProjectCountries(rfqNbr).subscribe(data => {
            this.countries = data;
            this.countrySpinner = false;
        });
    }

    getRFQDtls_Records() {
        this.rfqApi.getRFQDtls_Records(this.rfq.RFQ_Nbr).subscribe(data => {
            this.rfqItems = data;
        });
    }

    getProjectStates() {
        this.stateSpinner = true;
        this.rfqApi.getProjectStates(this.selectedCountry).subscribe(data => {
            this.projectStates = data;
            this.stateSpinner = false;
        });
    }

    updateRFQHeader() {
        this.rfqApi.updateRFQHeader(this.rfq).subscribe(data => {
            this.showToast(RfqCommon.rfqUpdated);
        });
    }

    checkUpdateStatus() {
        return (this.stateSpinner == true || this.countrySpinner == true || this.soldToSpinner == true || this.rfq.RFQ_Nbr == undefined || this.rfq.RFQ_Nbr == null);
    }

    onSoldToChange(newValue) {
        let soldTo = _.split(newValue, '-', 2);
        this.rfq.RFQ_SoldTo_CustNbr = soldTo[0];
        this.rfq.RFQ_SoldTo_CustSeq = soldTo[1];
    }

    onProjectStateChange(newValue) {
        this.rfq.RFQ_ProjectState = newValue;
    }

    onOriginStateChange(newValue) {
        this.rfq.RFQ_OriginState = newValue;
    }

    onProjectCountryChange(newValue) {
        this.rfq.RFQ_ProjectCountry = this.selectedCountry = newValue;
        this.getProjectStates();
    }

    createRfqLineItem(){
        let rfq = this.rfq;
        let rfqLine = null;
        this.nav.push(ViewRfqDetailsPage, {
            rfq,
            rfqLine
        });
    }
}