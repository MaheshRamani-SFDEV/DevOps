import { LightningElement, track, api} from 'lwc';
import createCaseRecord from '@salesforce/apex/asgmtResponseDetailController.createCaseRecord';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class asgmtLoanDetail extends LightningElement{
    @api isResponseFound = false;
    @api resDetail;
    @track isLoadingFinish = false;
    @track isTableDataFound = false;
    @track responseDetailFieldMapping;
    @track responseTableFieldMapping;
    @track responseTableFieldData;
    @track isCaseExist = false;
    @track caseId;
    
    connectedCallback(){
        this.isLoadingFinish = true;
        if(this.isResponseFound){
            console.log('###response>>>'+JSON.stringify(this.resDetail));
        
            this.isCaseExist = this.resDetail.caseExist;
            this.responseDetailFieldMapping = this.resDetail.detailFieldMapping;
            this.responseTableFieldMapping = this.resDetail.tableFieldMapping;
            this.responseTableFieldData = this.resDetail.tableFieldData;
            if(this.responseTableFieldData.length > 0){
                this.isTableDataFound = true;
            }else{
                this.isTableDataFound = false;
            }
            console.log('###responseTableFieldData>>>'+JSON.stringify(this.responseTableFieldData));
        }   
    }

    handleCreateCase(){
        this.isLoadingFinish = false;
        var loanId;
        var amount;
        var interest;
        for(let key in this.responseDetailFieldMapping){
            if(this.responseDetailFieldMapping.hasOwnProperty(key)){
                if(this.responseDetailFieldMapping[key].fieldOrder === 1){
                    loanId = this.responseDetailFieldMapping[key].fieldValue;
                }else if(this.responseDetailFieldMapping[key].fieldOrder === 2){
                    amount = this.responseDetailFieldMapping[key].fieldValue;
                }else if(this.responseDetailFieldMapping[key].fieldOrder === 3){
                    interest = this.responseDetailFieldMapping[key].fieldValue;
                }
            }
        }
        createCaseRecord({loanId : loanId, amount: amount, interest: interest})
        .then(data => {
            this.caseId = data;
            this.error = undefined;
            const event = new ShowToastEvent({
                title: 'Success',
                variant: 'success',
                mode: 'sticky',
                message: 'Case record created and caseId is #' + this.caseId
            });
            this.dispatchEvent(event);
            this.isCaseExist = true;
            this.isLoadingFinish = true;
        })
        .catch(error => {
            this.isLoadingFinish = true;
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                mode: 'sticky',
                message: 'Issue while creating case record #' + error
            });
            this.dispatchEvent(event);
            this.error = error;
            this.caseId = undefined;
        });       
    }
}