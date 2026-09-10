// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { assertDev, strictAssert } from '../util/assert.std.ts';
import { createLogger } from '../logging/log.std.ts';
import { sleep } from '../util/sleep.std.ts';
import { SECOND } from '../util/durations/constants.std.ts';

import type { StorageInterface } from '../types/Storage.d.ts';

const log = createLogger('ourProfileKey');

export class OurProfileKeyService {
  private getPromise: undefined | Promise<undefined | Uint8Array<ArrayBuffer>>;

  #promisesBlockingGet: Array<Promise<unknown>> = [];
  #storage?: StorageInterface;

  initialize(storage: StorageInterface): void {
    log.info('initializing');

    const storageReadyPromise = new Promise<void>(resolve => {
      storage.onready(() => {
        resolve();
      });
    });
    this.#promisesBlockingGet = [storageReadyPromise];

    this.#storage = storage;
  }

  async get(): Promise<undefined | Uint8Array<ArrayBuffer>> {
    if (this.getPromise) {
      log.info('get: was already fetching. Piggybacking off of that');
      return this.getPromise;
    }

    log.info('get: kicking off a new fetch');

    const getPromise = this.#doGet();

    this.getPromise = getPromise;
    let result: undefined | Uint8Array<ArrayBuffer>;

    try {
      result = await getPromise;
    } finally {
      this.getPromise = undefined;
    }

    return result;
  }

  async set(newValue: undefined | Uint8Array<ArrayBuffer>): Promise<void> {
    assertDev(this.#storage, 'OurProfileKeyService was not initialized');
    if (newValue != null) {
      strictAssert(
        newValue.byteLength > 0,
        'ourProfileKey/set: Profile key cannot be empty'
      );
      log.info('set: updating profile key');
      await this.#storage.put('profileKey', newValue);
    } else {
      log.info('set: removing profile key');
      await this.#storage.remove('profileKey');
    }
  }

  blockGetWithPromise(promise: Promise<unknown>): void {
    this.#promisesBlockingGet.push(promise);
  }

  async #doGet(): Promise<undefined | Uint8Array<ArrayBuffer>> {
    if (this.#promisesBlockingGet.length > 0) {
      log.info(
        `doGet: waiting for ${this.#promisesBlockingGet.length} promises before fetching`
      );
      await Promise.race([
        Promise.allSettled(this.#promisesBlockingGet),
        sleep(30 * SECOND),
      ]);
      log.info(
        `doGet: done waiting for ${this.#promisesBlockingGet.length} promises`
      );
    }
    this.#promisesBlockingGet = [];

    assertDev(
      this.#storage,
      'ourProfileKey/doGet: OurProfileKeyService was not initialized'
    );

    log.info('doGet: fetching profile key from storage');
    const result = this.#storage.get('profileKey');
    if (result === undefined || result instanceof Uint8Array) {
      return result;
    }

    assertDev(
      false,
      'ourProfileKey/doGet: Profile key in storage was defined, but not an Uint8Array. Returning undefined'
    );
    return undefined;
  }
}

export const ourProfileKeyService = new OurProfileKeyService();
