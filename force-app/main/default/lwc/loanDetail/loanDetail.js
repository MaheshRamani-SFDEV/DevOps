import { LightningElement, track, api} from 'lwc';
import getResponseDetail from '@salesforce/apex/asgmtResponseDetailController.getResponseDetail';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class loanDetail extends LightningElement{
    @api recordId;
    @track isLoadingFinish = false;
    @api isResponseFound = false;
    @track responseDetailFieldMapping;
    @track responseTableFieldMapping;
    @track responseTableFieldData;
    @api resDetail;
    
    connectedCallback(){
        if(this.isResponseFound){
            console.log('In loan Detail1S>>>>>>>>>>>>');
            console.log('###Loan Detail res Detail>>>'+JSON.stringify(this.resDetail));
            this.responseDetailFieldMapping = this.resDetail.detailFieldMapping;
            this.responseTableFieldMapping = this.resDetail.tableFieldMapping;
            //this.responseTableFieldData = this.responseDetailWrapp[0].tableFieldData;
            console.log('###Loan Detail res DetailFieldMapping>>>'+JSON.stringify(this.responseDetailFieldMapping));
            
            console.log('###Loan Detail res TableFieldMapping>>>'+JSON.stringify(this.responseTableFieldMapping));
        }    
    }
}