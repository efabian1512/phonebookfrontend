import { Injectable } from '@angular/core';
import { Contact } from './Models/contact';
import { take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactherokuService {

  
  private url="https://myphonebookappbackend.herokuapp.com/";
  
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
