/* Angular */
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes')
      .then((home) => home.routes)
  },
  {
    path: 'ticket-uploader',
    loadChildren: () => import('./pages/ticket-uploader/ticket-uploader.routes')
      .then((ticket) => ticket.routes)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ticket-uploader'
  }
];
