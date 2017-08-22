import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from "ionic-angular";

@Component({
    templateUrl: 'create-rfq.page.html'
})

export class CreateRfqPage implements OnInit {
    rfq: RFQ;

    constructor(private nav: NavController, private toastController: ToastController) {
        this.initializeRFQ();
    }

    ngOnInit() {}

    goHome() {
        this.nav.popToRoot();
    }

    initializeRFQ() {
        this.rfq = new RFQ();
    }

    createRfq() {
        //TODO: Implement create rfq functionality
        let toast = this.toastController.create({
            message: 'RFQ created successfully!',
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }
}

export class RFQ {
    Rfq_Nbr: string;
    ProjectNbr: string;
    QuoteNbr: string;
    RFQ_Created_By: string;
    RFQ_Date_Created: string;
    RFQ_SoldTo_CustNbr: string;
    RFQ_SoldTo_CustSeq: string;
    RFQ_Updated_By: string;
    RFQ_Date_Updated: string;
}
