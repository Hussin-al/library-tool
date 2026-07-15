import {Book} from './Book';
import {Members} from './Members';

export class Lender {
  id: number | undefined;
  book: Book | undefined;
  memberID: Members | undefined;
  loanDate: string | undefined;
  returnDate: string | undefined;

}
