// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * Signed 64-bit integer
 * @public
 */
export type BigInt64 = Tagged<bigint, 'BigInt64'>;

export namespace BigInt64 {
  /** @public */
  export const MIN = -(2n ** 63n) as BigInt64;
  /** @public */
  export const MAX = (2n ** 63n - 1n) as BigInt64;

  /** @public */
  export const Schema: z.ZodMiniType<BigInt64, bigint> = z.pipe(
    z.bigint().check(z.minimum(MIN), z.maximum(MAX)),
    z.custom<BigInt64>()
  );

  /** @public */
  export function isValid(input: bigint): input is BigInt64 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromBigInt(input: bigint): BigInt64 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): BigInt64 {
    return fromBigInt(BigInt(input));
  }
}
