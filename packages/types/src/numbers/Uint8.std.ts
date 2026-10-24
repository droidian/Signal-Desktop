// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { bigIntToNumber } from '../_utils/numbers.std.ts';

/**
 * Unsigned 8-bit integer
 * @public
 */
export type Uint8 = Tagged<number, 'Uint8'>;

export namespace Uint8 {
  /** @public */
  export const MIN = 0 as Uint8;
  /** @public */
  export const MAX = (2 ** 8 - 1) as Uint8;

  /** @public */
  export const Schema: z.ZodMiniType<Uint8, number> = z.pipe(
    z.number().check(z.int(), z.minimum(MIN), z.maximum(MAX)),
    z.custom<Uint8>()
  );

  /** @public */
  export function isValid(input: number): input is Uint8 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Uint8 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBigInt(input: bigint): Uint8 {
    return fromNumber(bigIntToNumber(input));
  }
}
