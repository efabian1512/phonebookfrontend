export class Contact{

    id:string;
    name:string;
    telephone:string;
    email:string;
    address:string;
    city:string;
    country:string;

    constructor(object){
        Object.assign(this,object);
    }

  
}