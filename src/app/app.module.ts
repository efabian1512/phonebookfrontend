import { RouterModule } from '@angular/router';
import { ContactService } from './contact.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { AppErrorHandler } from './common/app-error-handler';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactsListComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:ContactsListComponent},
      {path:'contact/create',component:ContactComponent},
      {path:'contact/edit/:id',component:ContactComponent},
      {path:'**',component:ContactsListComponent},
     
    ], {useHash:true})
  ],
  providers: [
    ContactService,
    {provide: ErrorHandler, useClass:AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
