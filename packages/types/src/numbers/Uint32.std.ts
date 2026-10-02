// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { bigIntToNumber } from '../_utils/numbers.std.ts';

/**
 * Unsigned 32-bit integer
 * @public
 */
export type Uint32 = Tagged<number, 'Uint32'>;

export namespace Uint32 {
  /** @public */
  export const MIN = 0 as Uint32;
  /** @public */
  export const MAX = (2 ** 32 - 1) as Uint32;

  /** @public */
  export const Schema: z.ZodMiniType<Uint32, number> = z.pipe(
    z.number().check(z.int(), z.minimum(MIN), z.maximum(MAX)),
    z.custom<Uint32>()
  );

  /** @public */
  export function isValid(input: number): input is Uint32 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Uint32 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBigInt(input: bigint): Uint32 {
    return fromNumber(bigIntToNumber(input));
  }
}
