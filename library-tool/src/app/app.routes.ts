import {Routes} from '@angular/router';
import {CreateBookComponent} from './create-book-component/create-book-component';
import {CreateMembersComponent} from './create-members-component/create-members-component';
import {CreateLenderComponent} from './create-lender-component/create-lender-component';
import {Ablage} from './ablage/ablage';
import {Dashbord} from './dashbord/dashbord';

export const routes: Routes = [
  {
    path: '',
    component: Dashbord
  },
  {
    path: 'Book',
    component: CreateBookComponent
  },
  {
    path: 'Members',
    component: CreateMembersComponent
  },

  {
    path: 'Lender',
    component: CreateLenderComponent
  },

  {
    path:'Ablage',
    component: Ablage
  }


];
