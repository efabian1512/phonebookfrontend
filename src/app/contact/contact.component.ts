import { ContactherokuService } from './../contactheroku.service';
import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {take} from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';



@Component({
  selector: 'phonebook',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact:any={};
  id;
  addAddress = false;
  form = new FormGroup({
    
    name: new FormControl('',Validators.required),
    telephone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    address: new FormControl(),
    city: new FormControl(),
    country: new FormControl()
  });

  constructor(
    private contactService: ContactService,
    private contactHerokuService: ContactherokuService,
    private route: ActivatedRoute,
    private router: Router) { }

  

 
  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

 

    if(this.id)
      this.contactService.getContactById(this.id).pipe(take(1))
      .subscribe(
        contact => {
          this.contact = contact;
          this.name.setValue(this.contact.name);
          this.telephone.setValue(this.contact.telephone);
          this.email.setValue(this.contact.email); 
          this.address.setValue(this.contact.address);
          this.city.setValue(this.contact.city);
          this.country.setValue(this.contact.country); 
          });
    }

  
  save(contact){

   if(this.id) this.contactService.updateContact(this.id,contact).pipe(take(1))
   .subscribe(
     response => {
       response
      },
     (error: AppError) =>{
      if(error instanceof BadInput){
        this.form.setErrors(error);
      }
      else throw error;
    });

   else this.contactService.addContact(contact).pipe(take(1)).subscribe(response => {response},
    (error: AppError) =>{
      if(error instanceof BadInput)
        this.form.setErrors(error.originalError);
      
      else throw error;
      });


  this.router.navigate(['/']);
 
   }

   delete(){

    if(!confirm('Are you sure you want to delete this contact?'))return;

      this.contactService.deleteContact(this.id).pipe(take(1))
      .subscribe(
        response => {
          response
        },
        (error: AppError) =>{
          if(error instanceof NotFoundError)
            alert("This post has already been deleted.");
          
          else throw error;
          
        });

      this.router.navigate(['/']);

   }

   addingAddress(){
      this.addAddress = !this.addAddress;
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
  get address (){
    return this.form.get('address');
  }

  get city(){
    return this.form.get('city');
  }

  get country(){
    return this.form.get('country');
  }



}
