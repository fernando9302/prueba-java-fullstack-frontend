import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
  form: FormGroup;
  token: string;
  message: string;
  error: string;
  rpta: number;
  validToken: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.form = this._formBuilder.group(
      {
        password: [
          '',
          { validators: [Validators.required, Validators.minLength(3)] },
        ],
        confirmPassword: [
          '',
          { validators: [Validators.required, Validators.minLength(3)] },
        ],
      },
      { validators: this.matchingPasswords() }
    );

    this.route.params.subscribe((params: Params) => {
      this.token = params['token'];
      this.loginService.checkTokenReset(this.token).subscribe((data) => {
        if (data === 1) {
          this.validToken = true;
        } else {
          this.validToken = false;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }
      });
    });
  }

  matchingPasswords() {
    return (controls: AbstractControl) => {
      if (controls) {
        const password = controls.get('password')!.value;
        const confirmPassword = controls.get('confirmPassword')!.value;        
        if (password !== confirmPassword) {          
          controls.get('confirmPassword')?.setErrors({ not_the_same: true });          
          return { mismatchedPassword: true };
        }
      }
      return null;
    };
  }

  onSubmit() {
    let clave: string = this.form.value.confirmPassword;
    this.loginService.reset(this.token, clave).subscribe((data) => {
      this.message = 'Password has been change';

      setTimeout(() => {
        this.router.navigate(['login']);
      }, 2000);
    });
  }
}
