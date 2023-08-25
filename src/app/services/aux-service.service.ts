import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuxServiceService {
  textoEncriptado = '';
  textoDesencriptado = '';
  enctexto = '1';
  encPass = 'DANONEaleatorio';

  constructor() {}

 
  ventanaCargando() {
    Swal.fire({
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      // imageUrl: "../../../assets/imagenes/loading.gif",
      imageUrl: '../../../assets/imagenes/loading2.svg',
      customClass: {
        popup: 'bg-light bg-transparent spinner',
      },
    });
  }
}
