// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { bigIntToNumber } from '../_utils/numbers.std.ts';

/**
 * Signed 16-bit integer
 * @public
 */
export type Int16 = Tagged<number, 'Int16'>;

export namespace Int16 {
  /** @public */
  export const MIN = -(2 ** 15) as Int16;
  /** @public */
  export const MAX = (2 ** 15 - 1) as Int16;

  /** @public */
  export const Schema: z.ZodMiniType<Int16, number> = z.pipe(
    z.number().check(z.int(), z.minimum(MIN), z.maximum(MAX)),
    z.custom<Int16>()
  );

  /** @public */
  export function isValid(input: number): input is Int16 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Int16 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBigInt(input: bigint): Int16 {
    return fromNumber(bigIntToNumber(input));
  }
}
