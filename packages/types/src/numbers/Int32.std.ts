// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { bigIntToNumber } from '../_utils/numbers.std.ts';

/**
 * Signed 32-bit integer
 * @public
 */
export type Int32 = Tagged<number, 'Int32'>;

export namespace Int32 {
  /** @public */
  export const MIN = -(2 ** 31) as Int32;
  /** @public */
  export const MAX = (2 ** 31 - 1) as Int32;

  /** @public */
  export const Schema: z.ZodMiniType<Int32, number> = z.pipe(
    z.number().check(z.int(), z.minimum(MIN), z.maximum(MAX)),
    z.custom<Int32>()
  );

  /** @public */
  export function isValid(input: number): input is Int32 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Int32 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBigInt(input: bigint): Int32 {
    return fromNumber(bigIntToNumber(input));
  }
}
