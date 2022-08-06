import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() closeLoginEvent = new EventEmitter<boolean>();
  currentUser!: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUser();
  }

  onSubmit(): void {
    this.authenticationService.login(
      this.currentUser.email,
      this.currentUser.password
    ).subscribe(
      user => {
        this.authenticationService.setUser(user.token);
        this.closeLoginEvent.emit(true);
      }
    );
  }
}
