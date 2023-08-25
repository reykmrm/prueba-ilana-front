import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuxServiceService } from 'src/app/services/aux-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administer-users',
  templateUrl: './administer-users.component.html',
  styleUrls: ['./administer-users.component.scss'],
})
export class AdministerUsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'edit', 'delete'];
  dataSource!: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private auxService: AuxServiceService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  user = {
    id: 0,
    name: '',
    email: '',
    pass: '',
  };

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.getAllUser();
  }

  open(content: any, id: any) {
    this.user.id = id;
    this.getByIdUser(content);
  }

  close(content: any) {
    this.limpiarUser();
  }

  getAllUser() {
    this.userService.getAllUser().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      if (res) {
        Swal.close();
      }
    });
  }

  getByIdUser(content: any) {
    this.userService.getById(this.user.id).subscribe((res: any) => {
      if (res.isSuces == true) {
        this.user.id = res.data.id;
        this.user.name = res.data.name;
        this.user.email = res.data.email;
        this.modalService.open(content);
      }
    });
  }

  limpiarUser() {
    this.modalService.dismissAll();
    this.user.id = 0;
    this.user.name = '';
    this.user.email = 'res.data.email';
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe((res: any) => {
      if (res.isSuces == true) {
        this.getAllUser();
        this.limpiarUser();
      }
    });
  }

  deleteUser(id: any) {
    Swal.fire({
      title: '¿Desea eliminar este registro de diagnóstico?.',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.auxService.ventanaCargando();
        this.userService.deleteUser(id).subscribe((res: any) => {
          if (res.isSuces == true) {
            this.getAllUser();
          }
        });
      }
    });
  }
}

export interface UserData {
  id: number;
  nombre: string;
  usuario: string;
}
