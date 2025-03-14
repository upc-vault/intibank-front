import { Component, OnInit } from '@angular/core';
import { AccountResponseModel } from 'src/app/models/account/account.model';
import { ResponseModel } from 'src/app/models/response.model';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.fetchUserAccounts();
  }

  userAccounts: AccountResponseModel[] = [];

  fetchUserAccounts(): void {
    this.accountService.getUserAccounts().subscribe({
      next: (response: ResponseModel<AccountResponseModel[]>) => {
        console.log("success", response);

        this.userAccounts = response.data;
      },
      error: (error: any) => {
        console.log("fail", error);
      }
    });
  }

  createNewAccountOnClick(): void {
    this.accountService.createNewAccount().subscribe({
      next: (response: ResponseModel<AccountResponseModel>) => {
        console.log("created!!", response);

        this.userAccounts.push(response.data);
      },
      error: (error: any) => {
        console.log("fail", error);
      }
    });
  }
}
