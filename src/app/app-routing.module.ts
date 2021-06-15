import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: HomeComponent,
    path: 'home',
  },
  {
    component: HomeComponent,
    path: 'noticias',
  },
  {
    component: RegistroComponent,
    path: 'registro',
  },
  {
    component: NewsDetailsComponent,
    path: 'noticias/:id',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
