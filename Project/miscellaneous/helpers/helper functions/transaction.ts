export function transactionStatus(status:string){
    if(status === 'TXN_SUCCESS'){
        return 'Success'
    }
    else{
        return 'Fail'
    }

}