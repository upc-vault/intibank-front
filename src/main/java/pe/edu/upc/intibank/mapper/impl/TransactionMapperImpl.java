package pe.edu.upc.intibank.mapper.impl;

import org.springframework.stereotype.Component;
import pe.edu.upc.intibank.entity.Account;
import pe.edu.upc.intibank.entity.Transaction;
import pe.edu.upc.intibank.entity.TransactionType;
import pe.edu.upc.intibank.mapper.TransactionMapper;
import pe.edu.upc.intibank.model.transaction.TransactionResponseModel;

import java.time.LocalDate;
import java.util.Date;

@Component
public class TransactionMapperImpl implements TransactionMapper {

    @Override
    public Transaction toEntity(double amount, Account account, TransactionType type) {
        return Transaction
                .builder()
                .amount(amount)
                .account(account)
                .type(type)
                .timestamp(LocalDate.now())
                .notes("Account Balance" + account.getBalance())
                .build();
    }

    @Override
    public TransactionResponseModel toResponseModel(Long id, double amount, double balance) {
        return TransactionResponseModel
                .builder()
                .id(id)
                .amount(amount)
                .balance(balance)
                .build();
    }


}
