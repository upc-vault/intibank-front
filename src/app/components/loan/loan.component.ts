import { Component, OnInit } from '@angular/core';
import { LoanResponseModel } from 'src/app/models/loan/loan.model';
import { ResponseModel } from 'src/app/models/response.model';
import { LoanService } from 'src/app/services/loan/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loansAll: LoanResponseModel[] = [];

  loanSimulation = {
    amount_loan: 0,
    months: 0
  };

  simulationResult: LoanResponseModel | null = null;

  dni: string = '';

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans(): void {
    this.loanService.getLoansRequest().subscribe({
      next: (response) => {
        this.loansAll = response.data;
      },
      error: (error) => console.log(error)
    });
  }

  simulateLoan(): void {
    this.loanService.createLoanSimulation(this.loanSimulation).subscribe({
      next: (response) => {
        this.simulationResult = response.data;
        console.log(this.simulationResult)
      },
      error: (error) => console.log(error)
    });
  }

  confirmLoan(): void {
    if (!this.simulationResult || !this.dni) return;

    const loanRequestData = {
      dni: this.dni,
      amount_loan: this.simulationResult.amount_loan,
      months: this.simulationResult.months,
      interest_rate: this.simulationResult.interest_rate,
      date_loan_start: this.simulationResult.date_loan_start
    };

    this.loanService.requestLoan(loanRequestData).subscribe({
      next: (response: ResponseModel<LoanResponseModel>) => {
        console.log("Loan requested successfully:", response);
        this.loansAll.push(response.data);
  
        alert("✅ ¡Su solicitud de préstamo fue registrada exitosamente!");
  
        this.simulationResult = null;
        this.loanSimulation = { amount_loan: 0, months: 0 };
        this.dni = '';
      },
      error: (error: any) => {
        console.log("Loan request Error:", error);
        alert("❌ Ocurrió un error al registrar el préstamo. Inténtelo nuevamente.");
      }
    });
  }
}