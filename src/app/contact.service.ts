import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './Models/contact';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 
  private url="/api/v1/contact/";
  constructor(private http: HttpClient) { }


  getAllContacts(){
    return this.http.get<Contact[]>(this.url);
  }

  getContactById(id:string){
    return  this.http.get(this.url +id).pipe(take(1)).pipe(map(contact => new Contact(contact)));
  }

  addContact(contact){
    
     return this.http.post(this.url,contact);
    
  }

  updateContact(id:string,contact){
  
      return this.http.put(this.url +id,contact);

  }

  deleteContact(id:string){

       return this.http.delete(this.url +id);
    

  }
}
