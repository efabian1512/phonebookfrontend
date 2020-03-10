export class Contact{

    id:string;
    name:string;
    telephone:string;
    email:string;

    constructor(object){
        Object.assign(this,object);
    }

  
}