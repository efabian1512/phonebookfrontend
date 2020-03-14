import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contact } from './Models/contact';
import { take, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 
  private url="/api/phonebook/contact/";
  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }


  getAllContacts(){
    return this.http.get<Contact[]>(this.url);
    
  }

  getContactById(id:string){
    return  this.http.get(this.url +id).pipe(take(1)).pipe(map(contact => new Contact(contact)));
  }

  addContact(contact){
    
     return this.http.post(this.url,contact).pipe(
      tap(()=>{
        this._refresh.next();
      }));
    
  }

  updateContact(id:string,contact){
  
      return this.http.put(this.url +id,contact).pipe(
        tap(()=>{
          this._refresh.next();
        }));

  }

  deleteContact(id:string){

       return this.http.delete(this.url +id).pipe(
        tap(()=>{
          this._refresh.next();
        }));
    

  }

  get refresh(){
    return this._refresh;
  }
}
