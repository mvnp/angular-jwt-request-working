import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      email: ['mvnpereira@gmail.com', Validators.required],
      password: ['1234567890', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.valid);
    console.log(this.form.value);
    this.router.navigateByUrl('logged');
  }
}
