import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler{
    handleError(error){

        if(error.status === 500){
            alert('Contact not found');
        }else{
            alert('An unexpected error has occurred.');
            console.log(JSON.stringify(error));
            
        }
        

        
    }
}