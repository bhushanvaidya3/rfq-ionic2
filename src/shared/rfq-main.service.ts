import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from "@angular/http";

import 'rxjs';
import { Observable } from "rxjs/Observable";

import { RfqCommon } from "../common/common";

@Injectable()
export class RfqApi {
    private baseURL: string;
    private fireBaseURL: string;
    private rfqs = {};
    private soldTos = {};

    private headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) {
        this.baseURL = RfqCommon.baseUrl;
        this.fireBaseURL = RfqCommon.fireBaseUrl;
    }

    getRFQs(): Observable<any> {
        return this.http.get(`${this.baseURL}/RFQApi/GetRFQs`)
            .map((res: Response) => {
                this.rfqs = res.json();
                return this.rfqs;
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }

    getRFQDtls_Records(rfqId: string) {
        return this.http.get(`${this.baseURL}/RFQApi/GetRFQDtls_Records/${rfqId}`)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }

    getRequiredSoldTos() {
        return this.http.get(`${this.baseURL}/RFQApi/GetRequiredSoldTos/${RfqCommon.loggedInUser}`)
            .map((res: Response) => {
                this.soldTos = JSON.parse(res.json());
                return this.soldTos;
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }

    getAllProjectCountries(rfqId: string) {
        return this.http.get(`${this.baseURL}/RFQApi/GetAllProjectCountries/${RfqCommon.commExternalRole}/${RfqCommon.Internal_External}/${rfqId}`)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }

    getProjectStates(country: string) {
        return this.http.get(`${this.baseURL}/RFQApi/GetProjectOriginStates/${RfqCommon.loggedInUser}/${country}`)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }

    getProducts(soldToCustNbr: string, soldToCustSeq: string) {
        return this.http.get(`${this.baseURL}/RFQApi/GetProducts/${soldToCustNbr}/${soldToCustSeq}/${RfqCommon.loggedInUser}`)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }

    updateRFQHeader(rfq: any) {
        return this.http.post(`${this.baseURL}/RFQApi/UpdateRFQHeader/${RfqCommon.loggedInUser}`, JSON.stringify(rfq), {
            headers: this.headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }

    updateRFQLineItem(rfq: any, rfqLine: any) {
        let body = JSON.stringify({
            rfqHeader: rfq,
            rfqLineItem: rfqLine
        });
        return this.http.post(`${this.baseURL}/RFQApi/UpdateRFQLineItem/${RfqCommon.loggedInUser}`, body, {
            headers: this.headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }

    createRFQLineItem(rfq: any, rfqLine: any) {
        let body = JSON.stringify({
            rfqHeader: rfq,
            rfqLineItem: rfqLine
        });
        return this.http.post(`${this.baseURL}/RFQApi/CreateRFQLineItem/${RfqCommon.loggedInUser}`, body, {
            headers: this.headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw(console.log(error)));
    }
}