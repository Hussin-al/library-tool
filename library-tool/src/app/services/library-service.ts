import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../interfaces/Book';
import {Members} from '../interfaces/Members';
import {Autor} from '../interfaces/Autor';
import {Lender} from '../interfaces/Lender';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'http://localhost:8080/v1';

  constructor(
    private http: HttpClient
  ) {
  }

  //Autor
  createAutor(autor: Autor): Observable<Autor> {
    const url = `${this.apiUrl}/createAutor`;
    return this.http.post<Autor>(url, autor);
  }

  getAllAutors(): Observable<Autor[]> {
    const url = `${this.apiUrl}/Autors`;
    return this.http.get<Autor[]>(url);
  }


  updateAutor(autor: Autor): Observable<any> {
    const url = `${this.apiUrl}/updateAutor`;
    return this.http.put<any>(url, autor);
  }

  findAutorById(id: number): Observable<Autor> {
    const url = `${this.apiUrl}/AutorDetails/${id}`;
    return this.http.get<Autor>(url);
  }


  deleteAutor(id: number): Observable<any> {
    const url = `${this.apiUrl}/deleteAutor/${id}`;
    return this.http.delete(url);
  }


  //---------------------------------------------------------- Book--------------------------------------------------------------------------------------------------------1
  createBook(book: Book): Observable<Book> {
    const url = `${this.apiUrl}/createbook`;
    return this.http.post<Book>(url, book);
  }


  updateBook(book: Book): Observable<any> {
    const url = `${this.apiUrl}/updateBook`;
    return this.http.put<any>(url, book);
  }


  getAllBooks(): Observable<Book[]> {
    const url = `${this.apiUrl}/books`;
    return this.http.get<Book[]>(url);
  }

  findBookById(id: number): Observable<Book> {
    const url = `${this.apiUrl}/bookDetails/${id}`;
    return this.http.get<Book>(url);
  }

  deleteBook(id: number): Observable<any> {
    const url = `${this.apiUrl}/deletBook/${id}`;
    return this.http.delete(url);
  }

//---------------------------------------------------------- Member--------------------------------------------------------------------------------------------------------
  createMembers(member: Members): Observable<any> {
    const url = `${this.apiUrl}/createMember`;
    return this.http.post(url, member);
  }

  getAllMembers(): Observable<Members[]> {
    const url = `${this.apiUrl}/members`;
    return this.http.get<Members[]>(url);
  }

  updateMembers(member: Members): Observable<any> {
    const url = `${this.apiUrl}/updateMember`;
    return this.http.put<any>(url, member);
  }

  findMembersById(id: number): Observable<Members> {
    const url = `${this.apiUrl}/membersDetail/${id}`;
    return this.http.get<Members>(url);
  }

  deleteMember(id: number): Observable<any> {
    const url = `${this.apiUrl}/deleteMember/${id}`;
    return this.http.delete(url);
  }

//---------------------------------------------------------- Lender--------------------------------------------------------------------------------------------------------1
  createLender(lender: Lender): Observable<any> {
    const url = `${this.apiUrl}/createLender`;
    return this.http.post<Lender>(url, lender);
  }

  getAllLenders(): Observable<Lender[]> {
    const url = `${this.apiUrl}/Lenders`
    return this.http.get<Lender[]>(url);
  }

  updateLender(lender: Lender): Observable<any> {
    const url = `${this.apiUrl}/updateLender`;
    return this.http.put<any>(url, lender);
  }
  findLenderById(id: number): Observable<Lender> {
    const url = `${this.apiUrl}/lenderDetails/${id}`;
    return this.http.get<Lender>(url);
  }

  deleteLender(id: number): Observable<any> {
    const url = `${this.apiUrl}/deletLender/${id}`;
    return this.http.delete(url);
  }

}
