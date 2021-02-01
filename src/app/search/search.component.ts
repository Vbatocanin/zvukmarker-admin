import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '../models/book.model';
import { ServerService } from '../server.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  m_searchFormID: FormGroup;
  m_searchFormKeyword: FormGroup;
  m_searchResult: Book = null;
  m_searchType: string = "Big Brain Search"

  constructor(
    private m_serverService: ServerService,
    private m_formBuilder: FormBuilder,
    private m_snackBar: MatSnackBar
  ) {
    this.m_searchFormID = m_formBuilder.group({
      id: ['', Validators.required],
      keyword: ['', Validators.required],
    });
    this.m_searchFormKeyword = m_formBuilder.group({
      id: ['', Validators.required],
      searchParameter: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  async searchBookByID() {
    let searchInfo = this.m_searchFormID.value;
    this.m_searchResult = await this.m_serverService.getBook(searchInfo['id']);

    console.log(this.m_searchResult);
    this.openSnackBar("Book found", "Close");
  }

  async searchByKeyword() {
    let searchKeyword = this.m_searchFormKeyword.value;
    this.m_searchResult = await this.m_serverService.searchByKeyword(searchKeyword);

    console.log(this.m_searchResult);
    this.openSnackBar("Book found", "Close");
  }

  openSnackBar(message: string, action: string) {
    this.m_snackBar.open(message, action, {
      duration: 2000,
    });
  }

  switchSearchMethod(type: string) {
    this.m_searchType = type;

    console.log(this.m_searchType);

  }

}
