import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {take} from 'rxjs/operators';
import { Contact } from '../Models/contact';


@Component({
  selector: 'phonebook',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact:any={};
  id;
  form = new FormGroup({
    
    name: new FormControl('',Validators.required),
    telephone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email)
  });

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) { }

  

 
  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

 

    if(this.id)
      this.contactService.getContactById(this.id).pipe(take(1)).subscribe(contact => 
        {this.contact = contact;
          this.name.setValue(this.contact.name);
          this.telephone.setValue(this.contact.telephone);
          this.email.setValue(this.contact.email); 
        
        });
      
      

   
    }

  
  save(contact){

   if(this.id) this.contactService.updateContact(this.id,contact).pipe(take(1)).subscribe(response => response);
   else this.contactService.addContact(contact).pipe(take(1)).subscribe(response => response);


  this.router.navigate(['/']);
 
   }

   delete(){

    if(!confirm('Are you sure you want to delete this contact?'))return;

      this.contactService.deleteContact(this.id).pipe(take(1)).subscribe(response => response);

      this.router.navigate(['/']);

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
