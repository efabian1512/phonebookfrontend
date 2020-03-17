import { ContactService } from './../contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../Models/contact';


@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit{

  contacts:Contact[]=[];

  filteredContacts:Contact[]=[];

  suscription: Subscription;
   
  constructor(private contactService: ContactService) { }

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


  filter(query: string){
    this.filteredContacts = (query) ?
     this.filteredContacts = this.filteredContacts.filter(contact=> contact.name.toLowerCase().includes(query.toLowerCase())||
     contact.telephone.toLowerCase().includes(query.toLowerCase()) || contact.email.toLowerCase().includes(query.toLowerCase()))  :
     this.contacts;

  }

 

}
