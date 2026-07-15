import {Autor} from './Autor';

export class Book {
  id: number | undefined;
  title: string | undefined;
  isbn: string | undefined;
  //catwegory: string;
  publicationDate: string | undefined;
  publisher: string | undefined;
  autor: Autor | undefined;
}

