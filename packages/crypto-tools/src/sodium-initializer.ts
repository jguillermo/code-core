import * as sodium from 'libsodium-wrappers-sumo';

export class SodiumInitializer {
  private static initializedPromise: Promise<void> | null = null;

  public static async ensureInitialized(): Promise<void> {
    if (!this.initializedPromise) {
      this.initializedPromise = sodium.ready
        .then(() => {
          console.debug('Sodium successfully initialized.');
        })
        .catch((error) => {
          console.error('Failed to initialize Sodium:', error);
          throw error;
        });
    }
    await this.initializedPromise;
  }

  public static async getSodium(): Promise<typeof sodium> {
    await this.ensureInitialized();
    return sodium;
  }
}
