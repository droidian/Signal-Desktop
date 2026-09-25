// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uint32 } from '../numbers/Uint32.std.ts';
import type { DurationMs } from './DurationMs.std.ts';
import type { DurationDays } from './DurationDays.std.ts';
import {
  daysToSecs,
  hoursToSecs,
  minsToSecs,
  msToSecsInt,
} from '../_utils/datetime.std.ts';

/**
 * Duration in seconds (bounded to `Uint32` range).
 * @public
 */
export type DurationSecs = Tagged<Uint32, 'DurationSecs'>;

export namespace DurationSecs {
  /** @public */
  export const SECOND = 1 as DurationSecs;
  /** @public */
  export const MINUTE = (SECOND * 60) as DurationSecs;
  /** @public */
  export const HOUR = (MINUTE * 60) as DurationSecs;
  /** @public */
  export const DAY = (HOUR * 24) as DurationSecs;

  /** @public */
  export const Schema: z.ZodMiniType<DurationSecs, number> = z.pipe(
    Uint32.Schema,
    z.custom<DurationSecs>()
  );

  /** @public */
  export function isValid(input: number): input is DurationSecs {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUint32(input: Uint32): DurationSecs {
    return Schema.parse(input);
  }

  /** @public */
  export function fromSeconds(input: number): DurationSecs {
    return fromUint32(Uint32.fromNumber(input));
  }

  /** @public */
  export function fromMinutes(input: number): DurationSecs {
    return fromSeconds(minsToSecs(input));
  }

  /** @public */
  export function fromHours(input: number): DurationSecs {
    return fromSeconds(hoursToSecs(input));
  }

  /** @public */
  export function fromDays(input: number): DurationSecs {
    return fromSeconds(daysToSecs(input));
  }

  /** @public */
  export function fromDurationMs(input: DurationMs): DurationSecs {
    return fromSeconds(msToSecsInt(input));
  }

  /** @public */
  export function fromDurationDays(input: DurationDays): DurationSecs {
    return fromSeconds(daysToSecs(input));
  }
}
