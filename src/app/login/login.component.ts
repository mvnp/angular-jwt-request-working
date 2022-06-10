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
    submitted = false;
    returnUrl: string;

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
            email: ['financeiro@axitech.com.br', Validators.required],
            password: ['password', Validators.required],
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // Convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit()
    {
        this.submitted = true;
        console.log("start from login.component.ts ::: 0");

        // Stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe({
            next: () => {
                this.router.navigate([this.returnUrl]);
            },
            error: (error: any) => {
                // console.log("unauthorized from login.component.ts ::: X");
                console.log(error);
            }
        });

        // console.log(this.f.valid);
        // console.log(this.f.value);
        // this.router.navigateByUrl('logged');
    }
}
