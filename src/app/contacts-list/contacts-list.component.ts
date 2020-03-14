import { ContactherokuService } from './../contactheroku.service';
import { ContactService } from './../contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../Models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit/*OnDestroy*/{

  contacts:Contact[]=[];

  filteredContacts:Contact[]=[];

  suscription: Subscription;
   
  public page: Number = 1; //Número de página en la que estamos. Será 1 la primera vez que se carga el componente
 
  public totalPages: Number; //Número total de páginas
 
  public numShops: number; //Total de tiendas existentes
 
  private numResults: number = 10;

  constructor(private contactService: ContactService,
    private contactherokuService: ContactherokuService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.contactService.refresh
    .subscribe(()=>{
       this.getAllContacts();
    });
   
    this.getAllContacts();
    
    

  }

  private getAllContacts(){
    this.suscription = this.contactService.getAllContacts()
    .subscribe( 
      contacts=> {
        this.filteredContacts= this.contacts = contacts;
        });
  }

 /* ngOnDestroy():void{
    this.suscription.unsubscribe();
  }*/

  filter(query: string){
    this.filteredContacts = (query) ?
     this.filteredContacts = this.filteredContacts.filter(contact=> contact.name.toLowerCase().includes(query.toLowerCase())||
     contact.telephone.toLowerCase().includes(query.toLowerCase()) || contact.email.toLowerCase().includes(query.toLowerCase()))  :
     this.contacts;

  }

 

}
