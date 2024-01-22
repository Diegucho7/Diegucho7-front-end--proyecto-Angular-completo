import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { json } from 'express';
import { AuthService } from '../../services/auth.service';
import { register } from 'module';
import { RegisterResponse } from '../../interfaces';


@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})



export class RegisterPageComponent {

  private fb          = inject (FormBuilder);
  private registerService = inject(RegisterService);
  private router      = inject ( Router )

  get currentHero(): RegisterResponse{

    const userRegister = this.UserForm.value as RegisterResponse;
    return userRegister;

  }



  public UserForm: FormGroup = this.fb.group({
   
    name:['',[Validators.required, Validators.minLength(6)]],
    lastname:['',[Validators.required, Validators.minLength(6)]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]],
    password2:['', [Validators.required, Validators.minLength(6)]],
    
  });
  register(){
    //  this.AuthService.register
  }

}
