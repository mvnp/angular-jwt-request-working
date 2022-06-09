import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_helpers/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ){
        // Redirect to logged if already logged in
        if (this.authService.userValue) {
            this.router.navigate(['/logged']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['mvnpereira@gmail.com', Validators.required],
            password: ['1234567890', Validators.required],
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // Convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit()
    {
        this.submitted = true;

        // Stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe({
            next: () => {
                this.router.navigate([this.returnUrl]);
            },
            error: error => {
                this.error = error;
                this.loading = false;
            }
        });

        // console.log(this.f.valid);
        // console.log(this.f.value);
        // this.router.navigateByUrl('logged');
    }
}
