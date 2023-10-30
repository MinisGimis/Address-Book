import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', redirectTo: '/book/1', pathMatch: 'full' },
  { path: 'book', redirectTo: '/book/1', pathMatch: 'full' },
  { path: 'book/:page', component: BookComponent },
  { path: 'detail/:id', component: DetailsComponent },
  { path: '**', redirectTo: '/book/1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
