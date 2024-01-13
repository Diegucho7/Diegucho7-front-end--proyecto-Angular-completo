import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';


@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb          = inject (FormBuilder);
  private AuthService = inject(AuthService);
  private router      = inject ( Router )

  public myForm: FormGroup = this.fb.group({
    email:['dvelarde140@gmail.com', [Validators.required, Validators.email]],
    password:['123456', [Validators.required, Validators.minLength(6)]]
  });

  login(){
    const {email,password} = this.myForm.value;

    this.AuthService.login(email,password).
    subscribe({
      next: () => this.router.navigateByUrl('/dasboard'),
      error: (message) => {
        Swal.fire('Error',message,'error')
      }
    } 
      
    )
  }

}
