
export class RfqCommon {
    static readonly fireBaseUrl = "https://mobile-rfq-i2.firebaseio.com/";    
    //static readonly baseUrl = "http://atvaidyb63k/SPSX.Mobile.RFQ.Service"; //VS 2010
    static readonly baseUrl = "http://atvaidyb63k/SPSX.Mobile.RFQ.API/"; //VS 2013    
    
    static readonly loggedInUser = "AaronD";
    static readonly loggedInUserId = "3d50881a-8647-4bbe-910f-a7eef4972aae";
    static readonly Internal_External = "E";
    static readonly commExternalRole = "External Sales";

    static readonly toasterDuration = 2000;

    static GetISODate(localDate:any): string {
        return new Date(parseInt(localDate.substr(6))).toISOString();
    }

    //RFQ Status
    static readonly rfqReadyForQuoteGeneration = "ReadyForQuoteGeneration";
    static readonly rfqInProcess ="InProcess";
    static readonly rfqInProcessId = "1";

    //messages
    static readonly rfqUpdated = "RFQ updated successfully!";
    static readonly rfqLineItemUpdated = "RFQ Line Item saved successfully!";
    static readonly rfqCreated = "RFQ created successfully!";
    static readonly rfqLineItemCreated = "RFQ line item created successfully!";
    static readonly rfqCreateNewLineText = "Create New Line";
    static readonly rfqEditLineText = "Edit Line";
}