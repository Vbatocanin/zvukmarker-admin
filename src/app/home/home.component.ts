import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';
import { ServerService } from '../server.service';
import { BookMetadata } from '../models/book.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileName = 'Choose File';

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  m_selectedFile: File = null;
  m_currentBookId: string = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  m_tags = [];
  m_bookForm: FormGroup;

  ngOnInit(): void { }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && this.m_tags.indexOf(value) < 0) {
      this.m_tags.push({ tag: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.m_tags.indexOf(tag);

    if (index >= 0) {
      this.m_tags.splice(index, 1);
    }
  }

  selectFile(event) {
    this.m_selectedFile = <File>event.target.files[0];
  }

  constructor(
    private m_serverService: ServerService,
    private formBuilder: FormBuilder,
    private m_snackBar: MatSnackBar
  ) {
    this.m_bookForm = formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      tags: ['', Validators.required],
    });
  }

  async uploadFile(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileName = imgFile.target.files[0].name;

      // Read the contents of the file specifies in
      // the dialog and converts it to an AudioHTML element.
      let reader = new FileReader();
      reader.onload = async (e: any) => {
        let audio = new Audio();
        audio.src = e.target.result;
        console.log(imgFile.target.files[0]);
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Upload the file
      let wasBookGenerated = await this.m_serverService.uploadBinary(imgFile.target.files[0], this.m_currentBookId);
      console.log(wasBookGenerated);


    } else {
      this.fileName = 'Choose File';
    }

  }

  async submitMetadata() {
    this.m_currentBookId = ''
    let submission = this.m_bookForm.value;
    submission.tags = this.m_tags;

    let metadata: BookMetadata = {
      title: submission.title,
      author: {
        fullName: submission.author,
      },
      tags: submission.tags,
    };

    // console.log(JSON.stringify(metadata));
    this.m_serverService.createBookResourse(metadata)
      .subscribe(res => {
        this.m_currentBookId = res.id;
        console.log(res);
      });
  }


  openSnackBar(message: string, action: string) {
    this.m_snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


