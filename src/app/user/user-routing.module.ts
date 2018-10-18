import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPageComponent } from './components/user-page/user-page.component';
import { UserSearchPageComponent } from './components/user-search-page/user-search-page.component';

const routes: Routes = [
  {
    children: [
      {
        path: '',
        redirectTo: 'search',
      },
      {
        component: UserSearchPageComponent,
        path: 'search',
      },
    ],
    component: UserPageComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule {}
