import * as sodium from 'libsodium-wrappers-sumo';

export class SodiumInitializer {
  private static initializedPromise: Promise<void> | null = null;
  private static isInitialized: boolean = false;

  public static async ensureInitialized(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    if (!this.initializedPromise) {
      this.initializedPromise = sodium.ready.then(() => {
        this.isInitialized = true;
        this.initializedPromise = null;
      });
    }
    await this.initializedPromise;
  }

  public static async getSodium(): Promise<typeof sodium> {
    await this.ensureInitialized();
    return sodium;
  }
}
