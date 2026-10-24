// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * 16-bit IEEE 754 floating-point number.
 * @public
 */
export type Float16 = Tagged<number, 'Float16'>;

export namespace Float16 {
  function isFloat16(input: number): boolean {
    return Math.f16round(input) === input;
  }

  /** @public */
  export const Schema: z.ZodMiniType<Float16, number> = z.pipe(
    z.number(),
    z.custom<Float16>(input => isFloat16(input), 'must be valid float16')
  );

  /** @public */
  export function isValid(input: number): input is Float16 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Float16 {
    return Schema.parse(input);
  }
}
