// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { bigIntToNumber } from '../_utils/numbers.std.ts';

/**
 * Signed 8-bit integer
 * @public
 */
export type Int8 = Tagged<number, 'Int8'>;

export namespace Int8 {
  /** @public */
  export const MIN = -(2 ** 7) as Int8;
  /** @public */
  export const MAX = (2 ** 7 - 1) as Int8;

  /** @public */
  export const Schema: z.ZodMiniType<Int8, number> = z.pipe(
    z.number().check(z.int(), z.minimum(MIN), z.maximum(MAX)),
    z.custom<Int8>()
  );

  /** @public */
  export function isValid(input: number): input is Int8 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Int8 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBigInt(input: bigint): Int8 {
    return fromNumber(bigIntToNumber(input));
  }
}
