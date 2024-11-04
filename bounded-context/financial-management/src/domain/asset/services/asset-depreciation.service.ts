import { Asset } from '../asset';

export class AssetDepreciationService {
  calculateDepreciation(asset: Asset): number {
    return (asset.acquisitionValue - asset.residualValue) / asset.usefulLife;
  }

  registerDepreciation(asset: Asset): void {
    asset.registerDepreciation();
  }
}
