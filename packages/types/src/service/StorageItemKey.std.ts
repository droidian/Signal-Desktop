// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Base64 } from '../encodings/Base64.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';

/**
 * Key identifying an item in Signal's encrypted storage service.
 * @public
 */
export type StorageItemKey = StorageItemKey.Decoded;

export namespace StorageItemKey {
  type Opaque = Tagged<unknown, 'StorageItemKey'>;

  /** @public */
  export type Decoded = Base64.Of<Opaque>;
  /** @public */
  export type Encoded = Bytes.Of<Opaque>;

  /** @public */
  export const Schema: z.ZodMiniType<StorageItemKey, string> = z.pipe(
    Base64.Schema,
    z.custom<StorageItemKey>()
  );

  /** @public */
  export function isValid(input: string): input is StorageItemKey {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromBase64(input: Base64): StorageItemKey {
    return Schema.parse(input);
  }

  /** @public */
  export function decode(input: Encoded): StorageItemKey {
    return Base64.fromBytes(input);
  }

  /** @public */
  export function encode(input: StorageItemKey): Encoded {
    return Base64.toBytes(input);
  }
}
