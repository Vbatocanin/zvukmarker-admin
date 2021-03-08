import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private m_serverService: ServerService) { }


  ngOnInit(): void {
  }

  updateUsername(){
    return this.m_serverService.getUsername()
  }

  logout(){
    this.m_serverService.logout()
  }
}
