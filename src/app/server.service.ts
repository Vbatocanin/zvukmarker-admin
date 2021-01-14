import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Book, BookMetadata } from "../app/models/book.model";
import { Observable, Subscription } from 'rxjs';
import { SearchResource } from './models/search-resource.model';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  SERVER_URL: string = "http://localhost:8001/";
  authenticated = false;

  constructor(private http: HttpClient) {

  }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', { headers: headers }).subscribe(response => {
      if (response['name']) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

  uploadBook(_meta: BookMetadata, _file: any) {

    this.createBookResourse(_meta);
    // uploadBinary();
  }

  createBookResourse(_meta: BookMetadata): Observable<Book> {
    let request = this.http.post<Book>(this.SERVER_URL + "admin/books/create",
      _meta);
    return request
  }

  async uploadBinary(_file: any, _id: string) {
    let body = new FormData();

    body.append("file", _file);
    body.append("bookId", _id)

    console.log(body.get('file'));

    try {
      let book = await this.http.post<Book>(this.SERVER_URL + "admin/books/upload", body).toPromise();
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

