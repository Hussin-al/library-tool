import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Lender} from '../interfaces/Lender';
import {Book} from '../interfaces/Book';
import {Members} from '../interfaces/Members';
import {LibraryService} from '../services/library-service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-create-lender-component',
  imports: [FormsModule, DatePipe],
  templateUrl: './create-lender-component.html',
})
export class CreateLenderComponent implements OnInit {


  lende: Lender = new Lender();
  lenders: Lender [] = [];
  books: Book  [] = [];
  members: Members [] = [];
  bookMap: Record<number, string> = {};
  memberMap: Record<number, string> = {};
  isEdit = false;
  bookFilter: string = '';

  constructor(
    private httpService: LibraryService,
    private toastr: ToastrService,
    private route: Router,) {
  }


  ngOnInit(): void {
    this.httpService.getAllLenders().subscribe(data => this.lenders = data);
    this.httpService.getAllBooks().subscribe(data => {
      this.books = data;
      this.bookMap = Object.fromEntries(
        data.map(a => [a.id, `${a.title}`])
      );
    });

    this.httpService.getAllMembers().subscribe(data => {
      this.members = data;
      this.memberMap = Object.fromEntries(
        data.map(a => [a.id, `${a.firstName} ${a.surName}`])
      );
    });
  }

  loanDateChange(): void {
    if (!this.lende.loanDate) {
      this.lende.returnDate = '';
      return;
    }
    const start = new Date(this.lende.loanDate);
    start.setDate(start.getDate() + 30);
    this.lende.returnDate = start.toISOString().substring(0, 10);
  }

  get filteredBooks(): any[] {
    const q = this.bookFilter?.trim().toLowerCase();
    if (!q) return this.books;
    return this.books.filter(b => (b.title || '').toLowerCase().includes(q));
  }

  showEditModal(id: number | undefined): void {
    if (id) {
      this.isEdit = true;
      this.findLenderById(id);
    }
  }

  createLender(): void {
    if (this.lende.id != null) {
      this.updateLender(this.lende);
    } else {
      console.log(this.lende);
      this.httpService.createLender(this.lende).subscribe({
        next: () => {
          this.httpService.getAllLenders().subscribe(data => this.lenders = data);
          this.toastr.success('Der Verleihvorgang wurde erfolgreich angelegt.');
          this.lende = new Lender();
        },
        error: () => this.toastr.error('Fehler beim Anlegen des Verleihvorgangs'),
      });
    }
  }

  updateLender(lender: Lender): void {
    if (lender.id != null) {
      this.findLenderById(lender.id);
      this.httpService.updateLender(this.lende).subscribe({
        next: () => {
          this.toastr.success('Der Verleihvorgang wurde erfolgreich aktualisiert.');
          this.httpService.getAllLenders().subscribe(data => this.lenders = data);
          this.route.navigate(['/Lender']);
        },
        error: err => {
          this.toastr.error('Fehler beim Aktualisieren des Verleihvorgangs');
        }
      });
    }
  }

  findLenderById(id: number): void {
    this.httpService.findLenderById(id).subscribe({
      next: (lender) => {
        this.lende = lender;
      },
      error: (err) => {
        this.toastr.error('Fehler beim Laden des Verleihvorgangs:', err);
      }
    });
  }

  deleteLender(id: number | undefined): void {
    if (id) {
      this.httpService.deleteLender(id).subscribe({
        next: () => {
          this.toastr.success('Das Ausleiher wurde erfolgreich gelöscht.')
          this.lenders = this.lenders.filter(b => b.id !== id)
        },
        error: err => {
          this.toastr.error('Fehler beim Löschen des Ausleihers');
        }
      });
    }
  }


  getBookName(id: number | undefined): string {
    return id ? (this.bookMap[id] ?? '—') : '—';
  }

  getMember(id: number | undefined): string {
    return id ? (this.memberMap[id] ?? '_') : '_';
  }
}
