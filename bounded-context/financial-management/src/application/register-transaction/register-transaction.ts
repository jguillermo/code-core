// import { Transaction } from '../../domain/aggregates/transaction/transaction';
// import { AccountRepository } from '../../domain/aggregates/account/account.repository';

export class RegisterTransaction {
  // constructor(private accountRepository: AccountRepository) {}
  //
  // execute(command: RegisterTransactionCommand): void {
  //   const { fromAccountId, toAccountId, amount, description, category } = command;
  //   const fromAccount = this.accountRepository.findById(fromAccountId);
  //   const toAccount = this.accountRepository.findById(toAccountId);
  //
  //   if (!fromAccount || !toAccount) {
  //     throw new Error('One or both accounts not found');
  //   }
  //
  //   fromAccount.withdrawFunds(amount);
  //   toAccount.addFunds(amount);
  //
  //   // Persist the changes to both accounts
  //   this.accountRepository.persist(fromAccount);
  //   this.accountRepository.persist(toAccount);
  //
  //   // Register the transaction
  //   const transaction = new Transaction(generateTransactionId(), new Date(), fromAccountId, toAccountId, amount, description, category);
  //   // Here you would save the transaction using a transaction repository (not implemented)
  //   console.log('Transaction registered:', transaction);
  // }
}
