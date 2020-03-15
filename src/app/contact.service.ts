import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contact } from './Models/contact';
import { take, map, tap,catchError } from 'rxjs/operators';
import { Subject,throwError} from 'rxjs';
import { AppError } from './common/app-error';
import { NotFoundError } from './common/not-found-error';
import { BadInput } from './common/bad-input';



@Injectable({
  providedIn: 'root'
})
export class ContactService {
 
  private url="/";
  private _refresh = new Subject<void>();

  constructor(private http: HttpClient) { }


  getAllContacts(){
    return this.http.get<Contact[]>(this.url).pipe(
      catchError(this.handleError)
    );
    
  }

  getContactById(id:string){
    return  this.http.get(this.url +id).pipe(take(1)).pipe(map(contact => new Contact(contact)));
  }

  addContact(contact){
    
     return this.http.post(this.url,contact).pipe(
      tap(()=>{
        this._refresh.next();
      }),
        catchError(this.handleError)
      );
    
  }

  updateContact(id:string,contact){
  
      return this.http.put(this.url +id,contact).pipe(
        tap(()=>{
          this._refresh.next();
        }),
          catchError(this.handleError)
        );

  }

  deleteContact(id:string){

       return this.http.delete(this.url +id).pipe(
        tap(()=>{
          this._refresh.next();
        }),
        catchError(this.handleError)
        );
    

  }
 

  get refresh(){
    return this._refresh;
  }


  private handleError(error: Response){

    if(error.status === 400)
    return throwError(new BadInput);

    if(error.status === 404)
    return throwError(new NotFoundError());

   return throwError(new AppError(error));

  }
}
