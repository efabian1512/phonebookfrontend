import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('',Validators.required),
    telephone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email)
  });

  constructor(private contactService: ContactService) { }

  contact={};

  onSubmit(){

   
   this.contactService.addContact(this.form.value);
 

  }
 
  ngOnInit(): void {
   
    this.contactService.getAllContacts().subscribe(contacts => console.log(contacts));
   /* this.contactService.addContact(this.contact);
    console.log(this.contact);*/

  }

  

  get name (){
    return this.form.get('name');
  }

  get telephone(){
    return this.form.get('telephone');
  }

  get email(){
    return this.form.get('email');
  }

}
