import { ContactService } from './../contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../Models/contact';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit,OnDestroy {

  contacts:Contact[]=[];

  suscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {

    this.suscription = this.contactService.getAllContacts().subscribe( contacts=> this.contacts = contacts);
  }

  ngOnDestroy():void{
    this.suscription.unsubscribe();
  }

}
