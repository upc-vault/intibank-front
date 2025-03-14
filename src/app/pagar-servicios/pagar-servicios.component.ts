import { Component, OnInit } from '@angular/core';
import { AccountResponseModel } from 'src/app/models/account/account.model';
import { ResponseModel } from 'src/app/models/response.model';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-pagar-servicios',
  templateUrl: './pagar-servicios.component.html',
  styleUrls: ['./pagar-servicios.component.css']
})
export class PagarServiciosComponent implements OnInit {
  numeroSuministro: string = '';
  userAccounts: AccountResponseModel[] = [];
  cuentaSeleccionada: AccountResponseModel | null = null;

  constructor(
    private accountService: AccountService,
    private http: HttpClient,
   
  ) { }

  ngOnInit(): void {
    this.fetchUserAccounts();
  }

  fetchUserAccounts(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (response: ResponseModel<AccountResponseModel[]>) => {
        this.userAccounts = response.data;
      },
      error: (error: any) => {
        console.error('Error al obtener las cuentas:', error);
      }
    });
  }

  pagar(): void {
    /*if (this.cuentaSeleccionada) {
      const idCuenta = this.cuentaSeleccionada.id;
      const idRecibo = 123; // Reemplaza con la lógica para obtener el idRecibo

      // Obtener el token del servicio AuthenticationService
      const token = this.authService.getBankAccessToken();

      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        this.http.post('/api/pagar', null, {
          params: {
            idRecibo: idRecibo.toString(),
            idCuenta: idCuenta.toString()
          },
          headers: headers
        }).subscribe({
          next: () => {
            alert('Pago realizado con éxito');
          },
          error: (error) => {
            console.error('Error al realizar el pago:', error);
            alert('Error al realizar el pago.');
          }
        });
      } else {
        alert('Token de autenticación no disponible.');
      }
    } else {
      alert('Por favor, selecciona una cuenta.');
    }*/
  }
}