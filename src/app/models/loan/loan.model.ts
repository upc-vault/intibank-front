export interface LoanResponseModel {
    dni: string;
    date_loan_start: Date;
    amount_loan: number;
    interest_rate: number;
    months: number;
    date_loan_end: Date;
    monthly_payment: number;
}