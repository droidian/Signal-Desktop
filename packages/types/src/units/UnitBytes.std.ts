// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Float64 } from '../numbers/Float64.std.ts';
import type { UnitKibibytes } from './UnitKibibytes.std.ts';
import type { UnitKilobytes } from './UnitKilobytes.std.ts';

/**
 * File or data size measured in bytes.
 * @public
 */
export type UnitBytes = Tagged<Float64, 'UnitBytes'>;

export namespace UnitBytes {
  /** @public */
  export const KILOBYTE = 1000 as UnitBytes; // 10^3
  /** @public */
  export const KIBIBYTE = 1024 as UnitBytes; // 2^10

  /** @public */
  export const Schema: z.ZodMiniType<UnitBytes, number> = z.pipe(
    Float64.Schema,
    z.custom<UnitBytes>()
  );

  /** @public */
  export function isValid(input: number): input is UnitBytes {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromFloat64(input: Float64): UnitBytes {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): UnitBytes {
    return fromFloat64(Float64.fromNumber(input));
  }

  /** @public */
  export function fromUnitKibibytes(input: UnitKibibytes): UnitBytes {
    return fromNumber(input * KIBIBYTE);
  }

  /** @public */
  export function fromUnitKilobytes(input: UnitKilobytes): UnitBytes {
    return fromNumber(input * KILOBYTE);
  }
}
