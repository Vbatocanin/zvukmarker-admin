import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Book, BookMetadata } from "../app/models/book.model";
import { Observable, Subscription } from 'rxjs';
import { SearchResource } from './models/search-resource.model';
import { map, tap } from 'rxjs/operators';
import { Config } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  SERVER_URL: string = "http://localhost:8001/";
  authenticated = false;
  m_creds = {}
  m_credsBasic = new HttpHeaders();


  constructor(private http: HttpClient) {

  }

  logout() {
    this.m_credsBasic = new HttpHeaders();
    this.m_creds = {}
  }

  async authenticate(credentials) {
    console.log(credentials)
    let username = credentials['username']
    let password = credentials['password']

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
      observe: 'response'
    });
    try {
      let res = await this.http.get(this.SERVER_URL + "library/get/current", { headers }).toPromise();
      this.m_credsBasic = new HttpHeaders({
        authorization: 'Basic ' + btoa(username + ':' + password)
      });
      return true;
    } catch {
      return false;
    }

  }

  uploadBook(_meta: BookMetadata, _file: any, _creds: any) {
    this.createBookResourse(_meta);
    // uploadBinary();
  }

  createBookResourse(_meta: BookMetadata): Observable<Book> {
    _meta['Authorization'] = this.m_credsBasic;
    let request = this.http.post<Book>(this.SERVER_URL + "admin/books/create",
      _meta,
      { headers: this.m_credsBasic });
    return request
  }

  async uploadBinary(_file: any, _id: string) {
    let body = new FormData();

    body.append("file", _file);
    body.append("bookId", _id)

    console.log(body.get('file'));

    try {
      let book = await this.http.post<Book>(this.SERVER_URL + "admin/books/upload",
        body,
        { headers: this.m_credsBasic }).toPromise();
      return book;
    }
    catch {
      // This true should be a false, however the Spring Boot server
      // is beeing a smartass and keeps firing an HttpErrorResponse
      // even though the upload finishes succesfully.
      return null;
    }

  }

  getBook(_id: string): Promise<any> {
    let resultingBook = this.http.get(this.SERVER_URL + "books/" + _id)
      .toPromise();

    return resultingBook;
  }

  searchByKeyword(searchMeta: any): Promise<any> {
    let results = this.http.get<SearchResource>(this.SERVER_URL + "books/search", searchMeta)
      .toPromise();

    return results;
  }

  updateBook(_id: string): Promise<any> {
    let resultingBook = this.http.get(this.SERVER_URL + "books/" + _id)
      .toPromise();
    return resultingBook;
  }

  updateBookResource(_meta: Book) {
    let request = this.http.post<Book>(this.SERVER_URL + "admin/books/create", _meta);
    return request;
  }


  /*TODO:

    BOOKS:
    updateBookResource()
      - nonBinary edit
      - isti endpoint kao create book resource, samo sa konkretnim id-em u json body-u, npr:
        {
          "id": "4",
          "title": "Педерски испрдак Тони Блер",
          "author": {
              "fullName": "Војислав Шешељ"
          },
          "tags": [
              { "tag": "србски"},
              { "tag": "епик"}
          ]
        }

    getAuthor()
    searchAuthor()

    USER:
    submitUser()
      - nou
    authenticate() - application.properties
    authenticateAdmin()
      - mora se rucno u bazi u tabeli authorities da se setuje role ADMIN
    addBookToUserLib()
    getLibraryOfUser()
    getDiscoveryQueueForUser()

  */



}

