// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uint32 } from '../numbers/Uint32.std.ts';
import type { DurationMs } from './DurationMs.std.ts';
import type { DurationSecs } from './DurationSecs.std.ts';
import { msToDaysInt, secsToDays } from '../_utils/datetime.std.ts';

/**
 * Duration in days (bounded to `Uint32` range).
 * @public
 */
export type DurationDays = Tagged<Uint32, 'DurationDays'>;

export namespace DurationDays {
  /** @public */
  export const DAY = 1 as DurationDays;
  /** @public */
  export const SEVEN_DAYS = (DAY * 7) as DurationDays; // "1 week"
  /** @public */
  export const TWENTY_EIGHT_DAYS = (DAY * 28) as DurationDays; // "4 weeks"
  /** @public */
  export const THIRTY_DAYS = (DAY * 30) as DurationDays; // "1 month"

  /** @public */
  export const Schema: z.ZodMiniType<DurationDays, number> = z.pipe(
    Uint32.Schema,
    z.custom<DurationDays>()
  );

  /** @public */
  export function isValid(input: number): input is DurationDays {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUint32(input: Uint32): DurationDays {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): DurationDays {
    return fromUint32(Uint32.fromNumber(input));
  }

  /** @public */
  export function fromDurationMs(input: DurationMs): DurationDays {
    return fromNumber(msToDaysInt(input));
  }

  /** @public */
  export function fromDurationSecs(input: DurationSecs): DurationDays {
    return fromNumber(secsToDays(input));
  }
}
