import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { User } from 'src/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('300ms ease-out', style({ height: 100, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 100, opacity: 1 }),
            animate('200ms ease-in', style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class NavComponent {
  user!: User;
  showLoginPopup: Boolean = false;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.user = this.authenticationService.getUser();
  }

  toggleLogin() {
    this.showLoginPopup = !this.showLoginPopup;
  }

  logout() {
    this.authenticationService.logout().subscribe(
      () => {
        this.authenticationService.setUser('');
        localStorage.removeItem('user');
        location.reload();
      }
    )
  }
}
