// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { BigUint64 } from '../numbers/BigUint64.std.ts';

/**
 * Version number of a Signal storage manifest.
 * @public
 */
export type StorageManifestVersion = Tagged<
  BigUint64,
  'StorageManifestVersion'
>;

export namespace StorageManifestVersion {
  /** @public */
  export const Schema: z.ZodMiniType<StorageManifestVersion, bigint> = z.pipe(
    BigUint64.Schema,
    z.custom<StorageManifestVersion>()
  );

  /** @public */
  export function isValid(input: bigint): input is StorageManifestVersion {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromBigUint64(input: BigUint64): StorageManifestVersion {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBigInt(input: bigint): StorageManifestVersion {
    return fromBigUint64(BigUint64.fromBigInt(input));
  }
}
