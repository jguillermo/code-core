// src/application/generateFinancialReport/generate-report.ts

// import { AccountRepository } from '../../domain/aggregates/account/account.repository';
// import { AssetRepository } from '../../domain/aggregates/asset/asset.repository';

export class GenerateFinancialReport {
  // constructor(
  //   private accountRepository: AccountRepository,
  //   private assetRepository: AssetRepository,
  // ) {}
  //
  // generateBalanceReport(): BalanceReport {
  //   const assets = this.assetRepository.findAll();
  //   const liabilities = this.accountRepository.findLiabilities();
  //
  //   const totalAssets = assets.reduce((acc, asset) => acc + asset.acquisitionValue, 0);
  //   const totalLiabilities = liabilities.reduce((acc, liability) => acc + liability.balance, 0);
  //
  //   const equity = totalAssets - totalLiabilities;
  //
  //   return {
  //     totalAssets,
  //     totalLiabilities,
  //     equity,
  //   };
  // }
}

// Interface for the financial report structure
