// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * 64-bit IEEE 754 floating-point number (standard JavaScript `number`).
 * @public
 */
export type Float64 = Tagged<number, 'Float64'>;

export namespace Float64 {
  /** @public */
  export const Schema: z.ZodMiniType<Float64, number> = z.pipe(
    z.number(),
    z.custom<Float64>()
  );

  /** @public */
  export function isValid(input: number): input is Float64 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): Float64 {
    return Schema.parse(input);
  }
}
