// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * Unsigned 64-bit integer
 * @public
 */
export type BigUint64 = Tagged<bigint, 'BigUint64'>;

export namespace BigUint64 {
  /** @public */
  export const MIN = 0n as BigUint64;
  /** @public */
  export const MAX = (2n ** 64n - 1n) as BigUint64;

  /** @public */
  export const Schema: z.ZodMiniType<BigUint64, bigint> = z.pipe(
    z.bigint().check(z.minimum(MIN), z.maximum(MAX)),
    z.custom<BigUint64>()
  );

  /** @public */
  export function isValid(input: bigint): input is BigUint64 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromBigInt(input: bigint): BigUint64 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): BigUint64 {
    return fromBigInt(BigInt(input));
  }
}
