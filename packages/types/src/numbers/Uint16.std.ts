// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { bigIntToNumber } from '../_utils/numbers.std.ts';

/**
 * Unsigned 16-bit integer
 * @public
 */
export type Uint16 = Tagged<number, 'Uint16'>;

export namespace Uint16 {
  /** @public */
  export const MIN = 0 as Uint16;
  /** @public */
  export const MAX = (2 ** 16 - 1) as Uint16;

  /** @public */
  export const Schema: z.ZodMiniType<Uint16, number> = z.pipe(
    z.number().check(z.int(), z.minimum(MIN), z.maximum(MAX)),
    z.custom<Uint16>()
  );

  /** @public */
  export function isValid(input: number): input is Uint16 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Uint16 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBigInt(input: bigint): Uint16 {
    return fromNumber(bigIntToNumber(input));
  }
}
