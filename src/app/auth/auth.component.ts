import { UserPageComponent } from './../user-page/user-page.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @Input() isLoginMode = true;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoginMode = this.router.url === '/login';
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['./../user-page']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    form.reset();
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
