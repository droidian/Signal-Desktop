// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * 32-bit IEEE 754 floating-point number.
 * @public
 */
export type Float32 = Tagged<number, 'Float32'>;

export namespace Float32 {
  function isFloat32(input: number): boolean {
    return Math.fround(input) === input;
  }

  /** @public */
  export const Schema: z.ZodMiniType<Float32, number> = z.pipe(
    z.number(),
    z.custom<Float32>(input => isFloat32(input), 'must be valid float32')
  );

  /** @public */
  export function isValid(input: number): input is Float32 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Float32 {
    return Schema.parse(input);
  }
}
