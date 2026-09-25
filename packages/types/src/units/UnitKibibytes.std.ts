// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Float64 } from '../numbers/Float64.std.ts';
import { UnitBytes } from './UnitBytes.std.ts';
import type { UnitKilobytes } from './UnitKilobytes.std.ts';

/**
 * File or data size measured in kibibytes (1 KiB = 1,024 bytes).
 * @public
 */
export type UnitKibibytes = Tagged<Float64, 'UnitKibibytes'>;

export namespace UnitKibibytes {
  /** @public */
  export const Schema: z.ZodMiniType<UnitKibibytes, number> = z.pipe(
    Float64.Schema,
    z.custom<UnitKibibytes>()
  );

  /** @public */
  export function isValid(input: number): input is UnitKibibytes {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromFloat64(input: Float64): UnitKibibytes {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): UnitKibibytes {
    return fromFloat64(Float64.fromNumber(input));
  }

  /** @public */
  export function fromUnitBytes(input: UnitBytes): UnitKibibytes {
    return fromNumber(input / UnitBytes.KIBIBYTE);
  }

  /** @public */
  export function fromUnitKilobytes(input: UnitKilobytes): UnitKibibytes {
    return fromUnitBytes(UnitBytes.fromUnitKilobytes(input));
  }
}
