import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { json } from 'express';


@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})



export class RegisterPageComponent {

  private fb          = inject (FormBuilder);
  private registerService = inject(RegisterService);
  private router      = inject ( Router )

  // constructor(
  //   name : String ,
  //   lastname : String ,
  //   email : String ,
  //   password : String ,
  //   password2 : String 
  //   ){

  // }



  public Form: FormGroup = this.fb.group({
   
    name:['',[Validators.required, Validators.minLength(6)]],
    lastname:['',[Validators.required, Validators.minLength(6)]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]],
    password2:['', [Validators.required, Validators.minLength(6)]],
    
  });
  save(){
    console.log("hola mundo");
  }

}
