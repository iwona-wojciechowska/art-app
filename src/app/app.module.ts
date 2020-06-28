import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CrudService } from './shared/crud.service';
import { environment } from '../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserPageComponent } from './user-page/user-page.component';
import { CollectionComponent } from './collection/collection.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ArtworkEditComponent } from './collection/artwork-edit/artwork-edit.component';
import { ArtworkItemComponent } from './collection/artwork-list/artwork-item/artwork-item.component';
import { ArtworkListComponent } from './collection/artwork-list/artwork-list.component';
import { ArtworkDetailComponent } from './collection/artwork-detail/artwork-detail.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    HomeComponent,
    FooterComponent,
    AuthComponent,
    SearchBoxComponent,
    UserPageComponent,
    CollectionComponent,
    FavouriteComponent,
    ArtworkEditComponent,
    ArtworkItemComponent,
    ArtworkListComponent,
    ArtworkDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase), // Main
    AngularFireDatabaseModule, // Firebase database module
    NgxPaginationModule,
  ],
  providers: [
    AuthService,
    CrudService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
