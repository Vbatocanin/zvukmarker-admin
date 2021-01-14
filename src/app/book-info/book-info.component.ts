import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '../models/book.model';
import { ServerService } from '../server.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
  @Input() m_book: Book;

  m_searchForm: FormGroup;

  constructor(
    private m_serverService: ServerService,
    private m_formBuilder: FormBuilder,
    private m_snackBar: MatSnackBar
    ) {
    this.m_searchForm = m_formBuilder.group({
      id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.m_snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
