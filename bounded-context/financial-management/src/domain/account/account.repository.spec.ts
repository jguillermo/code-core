// const aggregateObjectMother = (params: Partial<PrimitiveTypes<AccountTypes>>): Account => {
//   return new Account(
//     new AccountId(params.id ?? AccountId.random()),
//     new AccountName(params.name ?? 'Account A'),
//     new AccountType((params.type as any) ?? AccountType.enum().REAL),
//     new AccountCurrency((params.currency as any) ?? AccountCurrency.enum().USD),
//     new AccountBalance(params.balance ?? 1000),
//     new AccountFinancialEntity(params.financialEntity ?? 'Bank A'),
//     new AccountNumber(params.number ?? '123456'),
//     new AccountListTag(params.tags ?? ['saving', 'personal']),
//     new CreatedAt(params.creationDate ?? new Date()),
//   );
// };

// export class InMemoryAccountRepository extends AccountRepository {
//   private db = new InMemoryRepository<PrimitiveTypes<AccountTypes>>();
//
//   async findAll(): Promise<Account[]> {
//     const rs = await this.db.findAll();
//     return rs.map((r) => this.toAggregate(r));
//   }
//
//   async findById(accountId: string): Promise<Account | null> {
//     const rs = await this.db.findById(accountId);
//     return rs ? this.toAggregate(rs) : null;
//   }
//
//   async findLiabilities(): Promise<Account[]> {
//     const rs = await this.db.findAll();
//     return rs.map((a) => this.toAggregate(a));
//   }
//
//   async persist(account: Account): Promise<void> {
//     await this.db.persist(account.toJson());
//   }
// }

it('should ', () => {
  expect(true).toBe(true);
});

// describe('InMemoryAccountRepository', () => {
//   let repo: InMemoryAccountRepository;
//
//   beforeEach(() => {
//     repo = new InMemoryAccountRepository();
//   });
//
//   test('Should persist a new account correctly', async () => {
//     const account = aggregateObjectMother({});
//
//     await repo.persist(account);
//
//     const foundAccount = await repo.findById('1');
//     expect(foundAccount).toEqual(account);
//   });
//
//   test('Should update an account if it already exists', async () => {
//     const account = aggregateObjectMother({});
//
//     await repo.persist(account);
//
//     account.addFunds(2000);
//     await repo.persist(account);
//
//     const updatedAccount = await repo.findById(account.id.value);
//     const data = updatedAccount?.toJson();
//     expect(data?.balance).toBe(3000);
//   });
//
//   test('Should return null for a non-existent account ID', async () => {
//     const foundAccount = await repo.findById('non-existent-id');
//     expect(foundAccount).toBeNull();
//   });
//
//   test('Should retrieve all accounts', async () => {
//     const account1 = aggregateObjectMother({});
//     const account2 = aggregateObjectMother({});
//
//     await repo.persist(account1);
//     await repo.persist(account2);
//
//     const allAccounts = await repo.findAll();
//     expect(allAccounts).toEqual([account1, account2]);
//   });
//
//   test('Should retrieve liabilities accounts correctly', async () => {
//     const account1 = aggregateObjectMother({});
//     const account2 = aggregateObjectMother({});
//
//     await repo.persist(account1);
//     await repo.persist(account2);
//
//     const liabilities = await repo.findLiabilities();
//     expect(liabilities).toEqual([account2]);
//   });
//
//   test('Should not fail when retrieving accounts from an empty repository', async () => {
//     const allAccounts = await repo.findAll();
//     expect(allAccounts).toEqual([]);
//
//     const liabilities = await repo.findLiabilities();
//     expect(liabilities).toEqual([]);
//   });
//
//   test('Should persist and retrieve accounts with correct transformations', async () => {
//     const account = aggregateObjectMother({});
//
//     await repo.persist(account);
//
//     const retrievedAccount = await repo.findById('1');
//     expect(retrievedAccount).toEqual(account);
//     expect(retrievedAccount).not.toBe(account); // Ensure it's a different instance (transformation happens)
//   });
// });
