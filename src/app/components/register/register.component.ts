import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private userService: UserService, public route: Router) {}

  ngAfterViewInit() {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.route.navigate(['home']);
    }
  }

  user = {
    name: '',
    email: '',
    pass: '',
  };

  registerUser() {
    this.userService.registerUser(this.user).subscribe((res: any) => {
      if (res.isSuces == true) {
        localStorage.setItem('token', res.token);
        this.route.navigate(['/login']);
      }
    });
  }
}
