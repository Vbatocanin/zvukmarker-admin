import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  hide = true;
  credentials = {
    username : "test4",
    password : "test4"
  };

  constructor() { }


  ngOnInit(): void {

  }

  register(){}
}
