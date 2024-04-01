import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {

  constructor() { }

  showSuccessMessage(message: string): void {
    Swal.fire({
      title: message,
      timer: 1500,
      timerProgressBar: true,
      icon: 'success',
      showConfirmButton: false,
    });
  }

  showErrorMessage(message: string): void {
    Swal.fire({
      title: message,
      timer: 1500,
      timerProgressBar: true,
      icon: 'error',
      showConfirmButton: false,
    });
  }
}