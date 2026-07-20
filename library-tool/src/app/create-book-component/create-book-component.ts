import {Component, OnInit} from '@angular/core';
import {LibraryService} from '../services/library-service';
import {Book} from '../interfaces/Book';
import {FormsModule} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Autor} from '../interfaces/Autor';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-create-book-component',
  imports: [FormsModule, HttpClientModule, RouterOutlet, DatePipe],
  templateUrl: './create-book-component.html',
  providers: [LibraryService]
})
export class CreateBookComponent implements OnInit {

  books: Book [] = [];
  book: Book = new Book();
  autor: Autor = new Autor();
  autors: Autor[] = [];
  isEdit = false;
  authorMap: Record<number, string> = {};

  constructor(
    private httpService: LibraryService,
    private toastr: ToastrService,
    private route: Router,) {
  }

  ngOnInit(): void {
    this.httpService.getAllAutors().subscribe(data => this.autors = data);
    this.httpService.getAllBooks().subscribe(data => this.books = data);
    this.httpService.getAllAutors().subscribe(data => {
      this.autors = data;
      this.authorMap = Object.fromEntries(
        data.map(a => [a.id, `${a.name} ${a.lastname}`])
      );
    });
  }

  emptyBook(): Book {
    return {
      id: 0,
      title: '',
      isbn: '',
      publicationDate: '',
      publisher: '',
    } as Book;
  }

  openCreateModal(): void {
    this.isEdit = false;
    this.book = this.emptyBook();
  }

  showEditModal(id: number | undefined): void {
    if (id) {
      this.isEdit = true;
      this.findBookById(id);
    }
  }

    createBook() {
    if (this.book.id === 0) {
      this.httpService.createBook(this.book).subscribe({
        next: () => {
          this.httpService.getAllBooks().subscribe(data => this.books = data);
          this.toastr.success('Das Buch wurde erfolgreich angelegt.');
          this.route.navigate(['/Book']);
          console.log(this.book);
        },
        error: err => {
          this.toastr.error('Fehler beim Anlegen des Buches aufgetreten');
        }
      });
    } else {
      this.updateBook(this.book);
    }
  }

  updateBook(book: Book) {
    if (book.id != null) {
      this.findBookById(book.id);
      this.httpService.updateBook(this.book).subscribe({
        next: () => {
          this.toastr.success('Das Buch wurde erfolgreich aktualisiert.');
          this.httpService.getAllBooks().subscribe(data => this.books = data);
        },
        error: err => {
          this.toastr.error('Fehler beim Aktualisieren des Buches');
        }
      });
    }
  }

  deleteBook(id: number | undefined) {
    if (id) {
      this.httpService.deleteBook(id).subscribe({
        next: () => {
          this.toastr.success('Das Buch wurde erfolgreich gelöscht.');
          this.route.navigate(['/Book']);
          this.books = this.books.filter(b => b.id !== id);
        },
        error: err => {
          this.toastr.error('Fehler beim Löschen des Buches');
        }
      });
    }
  }

  findBookById(id: number) {
    this.httpService.findBookById(id).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (err) => {
        this.toastr.error('Fehler beim Laden des Buches:', err);
      }
    })
  }
 
 
  get isFormValid(): boolean {
    return this.book.title !== '' && this.book.isbn !== '' && this.book.publicationDate !== '' && this.book.publisher !== '';
  }
// ----------------------------------------------------------------------Autor-----------------------------------------------------------------------------------------------
  getAuthorName(id: number | undefined): string {
    return id ? (this.authorMap[id] ?? '—') : '—';
  }

  emptyAutor(): Autor {
    return {
      id: 0,
      name: '',
      lastname: '',
    } as Autor;
  }

  showEditAutorModal(id: number | undefined): void {
    if (id != null) {
      this.isEdit = true;
      this.findAutorById(id);
    }
  }

  openCreateAutorModal(): void {
    this.isEdit = false;
    this.autor = this.emptyAutor();
  }

  createAutor() {
    if (this.autor.id === 0) {
      this.httpService.createAutor(this.autor).subscribe({
        next: () => {
          this.httpService.getAllAutors().subscribe(data => this.autors = data);
          this.toastr.success('Das Autor wurde erfolgreich angelegt.');
          this.autor = this.emptyAutor();
        },
        error: err => {
          this.toastr.error('Fehler beim Anlegen des Autor aufgetreten');
        }
      });
    } else {
      this.updateAutor(this.autor);
    }
  }


  updateAutor(autor: Autor) {
    if (autor.id != null) {
      this.findAutorById(autor.id);
      this.httpService.updateAutor(this.autor).subscribe({
        next: () => {
          this.toastr.success('Das Autor wurde erfolgreich aktualisiert.');
          this.httpService.getAllAutors().subscribe(data => this.autors = data);
          this.isEdit = false;
        },
        error: err => {
          this.toastr.error('Fehler beim Aktualisieren des Autor');
        }
      });
    }
  }


  deleteAutor(id: number | undefined) {
    if (id) {
      this.httpService.deleteAutor(id).subscribe({
        next: () => {
          this.toastr.success('Das Autor wurde erfolgreich gelöscht.');
          this.route.navigate(['/Book']);
          this.autors = this.autors.filter(b => b.id !== id);
        },
        error: err => {
          this.toastr.error('Fehler beim Löschen des Autores');
        }
      });
    }
  }

  findAutorById(id: number) {
    this.httpService.findAutorById(id).subscribe({
      next: (autor) => {
        this.autor = autor;
      },
      error: (err) => {
        this.toastr.error('Fehler beim Laden des Autor:' + err.message);
      }
    })
  }
  
  get isAutorFormValid(): boolean {
    return this.autor.name !== '' && this.autor.lastname !== '';
  }
}
