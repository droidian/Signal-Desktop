// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * Unsigned 128-bit integer
 * @public
 */
export type BigUint128 = Tagged<bigint, 'BigUint128'>;

export namespace BigUint128 {
  /** @public */
  export const MIN = 0n as BigUint128;
  /** @public */
  export const MAX = (2n ** 128n - 1n) as BigUint128;

  /** @public */
  export const Schema: z.ZodMiniType<BigUint128, bigint> = z.pipe(
    z.bigint().check(z.minimum(MIN), z.maximum(MAX)),
    z.custom<BigUint128>()
  );

  /** @public */
  export function isValid(input: bigint): input is BigUint128 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromBigInt(input: bigint): BigUint128 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): BigUint128 {
    return fromBigInt(BigInt(input));
  }
}
