import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  username = "";
  password = "";


  ngOnInit(): void {
  }

  constructor (private m_serverService: ServerService,
               private m_http: HttpClient,
               private m_router: Router,
               private m_snackBar: MatSnackBar) {
  }

  logout() {
    this.m_http.post('logout', {}).pipe(
      finalize(() => {
        this.m_serverService.authenticated = false;
        this.m_serverService.logout();
        this.m_router.navigateByUrl('/login');
      })
    ).subscribe();
  }

  async login() {
    let credentials = {
      'password': this.password,
      'username': this.username
    }
    let isValid = await this.m_serverService.authenticate(credentials);
    console.log(isValid);
    if (!isValid) {
      this.openSnackBar("Incorrect credentials", "Close")
      this.username = "";
      this.password = "";
    }
  }

  goToRegister() {
    this.m_router.navigate(['/register'])
  }

  openSnackBar(message: string, action: string) {
    this.m_snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
