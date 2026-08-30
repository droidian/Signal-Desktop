// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Float64 } from '../numbers/Float64.std.ts';
import { UnitBytes } from './UnitBytes.std.ts';
import type { UnitKibibytes } from './UnitKibibytes.std.ts';

/**
 * File or data size measured in kilobytes (1 KB = 1,000 bytes).
 * @public
 */
export type UnitKilobytes = Tagged<Float64, 'UnitKilobytes'>;

export namespace UnitKilobytes {
  /** @public */
  export const Schema: z.ZodMiniType<UnitKilobytes, number> = z.pipe(
    Float64.Schema,
    z.custom<UnitKilobytes>()
  );

  /** @public */
  export function isValid(input: number): input is UnitKilobytes {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromFloat64(input: Float64): UnitKilobytes {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): UnitKilobytes {
    return fromFloat64(Float64.fromNumber(input));
  }

  /** @public */
  export function fromUnitBytes(input: UnitBytes): UnitKilobytes {
    return fromNumber(input / UnitBytes.KILOBYTE);
  }

  /** @public */
  export function fromUnitKibibytes(input: UnitKibibytes): UnitKilobytes {
    return fromUnitBytes(UnitBytes.fromUnitKibibytes(input));
  }
}
