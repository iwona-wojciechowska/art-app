import { CrudService } from 'src/app/shared/crud.service';
import { ArtworkEditComponent } from './collection/artwork-edit/artwork-edit.component';
import { CollectionComponent } from './collection/collection.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ArtworkListComponent } from './collection/artwork-list/artwork-list.component';
import { ArtworkDetailComponent } from './collection/artwork-detail/artwork-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'signup',
    component: AuthComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: ':login', component: AuthComponent },
      { path: ':signup', component: AuthComponent },
    ],
  },
  {
    path: 'user-page',
    component: UserPageComponent,
  },
  {
    path: 'new',
    component: ArtworkEditComponent,
  },
  {
    path: 'favourite',
    component: FavouriteComponent,
  },
  {
    path: 'collection',
    component: CollectionComponent,
    children: [
      { path: 'list', component: ArtworkListComponent },
      { path: ':id', component: ArtworkDetailComponent },
      { path: ':id/edit', component: ArtworkEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
