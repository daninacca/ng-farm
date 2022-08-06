import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/models/user';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private currentUser!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  profileForm = this.formBuilder.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
        Validators.minLength(8)
      ]
    ]
  });

  /**
   * Make sure we get the user,
   * then fill the form (not very clean but couldnt find a better way)
   */
  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUser();
    if (this.currentUser.name) this.profileForm.controls['name'].setValue(this.currentUser.name);
    this.profileForm.controls['email'].setValue(this.currentUser.email);
    this.profileForm.controls['password'].setValue(this.currentUser.password);
  }

  /**
   * Set users email, password and name but not the token
   */
  onSubmit(): void {
    if (this.profileForm.valid) {
      const userObject = this.profileForm.value;

      this.authenticationService.setUser(
        undefined,
        userObject.email ? userObject.email : '',
        userObject.password ? userObject.password : '',
        userObject.name ? userObject.name : ''
      );
    }
  }
}
