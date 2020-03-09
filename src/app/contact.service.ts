import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 
  private url="/api/v1/contact/";
  constructor(private http: HttpClient) { }


  getAllContacts(){
    return this.http.get(this.url);
  }

  addContact(contact){
    
     this.http.post(this.url,contact,{responseType:'text'}).subscribe(response => console.log(response));
    
  }
}
