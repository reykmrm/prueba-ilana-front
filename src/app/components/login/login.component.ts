import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, public route: Router) {}
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.route.navigate(['home']);
    }
  }

  userLogin = {
    email: '',
    pass: '',
  };

  login() {
    this.userService.login(this.userLogin).subscribe((res: any) => {
      if (res.isSuces == true) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.data);
        this.route.navigate(['/home']);
      } else {
        Swal.fire('Datos incorrectos');
      }
    });
  }
}
