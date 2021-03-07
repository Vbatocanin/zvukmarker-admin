import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookInfoComponent } from './book-info/book-info.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path : "home",
    component : HomeComponent
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "search",
    component : SearchComponent
  },
  {
    path : "register",
    component : CreateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
