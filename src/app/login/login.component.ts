import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  credentials = {
    username : "test4",
    password : "test4"
  };


  ngOnInit(): void {
  }

  constructor(private m_serverService: ServerService, private m_http: HttpClient, private m_router: Router) {
    this.m_serverService.authenticate(this.credentials["username"], this.credentials["password"]);
  }

  logout() {
    this.m_http.post('logout', {}).pipe(
      finalize(() => {
        this.m_serverService.authenticated = false;
        this.m_router.navigateByUrl('/login');
      })
    ).subscribe();
  }

  authenticated() { return this.m_serverService.authenticated; }

  login() {
    this.m_serverService.authenticate(this.credentials, () => {
        this.m_router.navigateByUrl('/');
    });
    return false;
  }

}
