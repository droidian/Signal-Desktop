// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * Signed 128-bit integer
 * @public
 */
export type BigInt128 = Tagged<bigint, 'BigInt128'>;

export namespace BigInt128 {
  /** @public */
  export const MIN = -(2n ** 127n) as BigInt128;
  /** @public */
  export const MAX = (2n ** 127n - 1n) as BigInt128;

  /** @public */
  export const Schema: z.ZodMiniType<BigInt128, bigint> = z.pipe(
    z.bigint().check(z.minimum(MIN), z.maximum(MAX)),
    z.custom<BigInt128>()
  );

  /** @public */
  export function isValid(input: bigint): input is BigInt128 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromBigInt(input: bigint): BigInt128 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): BigInt128 {
    return fromBigInt(BigInt(input));
  }
}
