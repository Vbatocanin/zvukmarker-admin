import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  hide = true;
  f_username = new FormControl('', [Validators.required]);
  f_email = new FormControl('', [Validators.required, Validators.email]);
  f_password = new FormControl('', [Validators.required]);
  f_password2 = new FormControl('', [Validators.required]);


  constructor() { }


  ngOnInit(): void {

  }

  register(){

    console.log(this.f_email.value);
    console.log();

  }



  getEmailErrorMessage() {
    if (this.f_email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.f_email.hasError('email') ? 'Not a valid email' : '';
  }
}
