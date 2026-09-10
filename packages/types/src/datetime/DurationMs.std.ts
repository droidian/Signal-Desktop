// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uint32 } from '../numbers/Uint32.std.ts';
import type { DurationSecs } from './DurationSecs.std.ts';
import type { DurationDays } from './DurationDays.std.ts';
import {
  daysToMs,
  hoursToMs,
  minsToMs,
  secsToMs,
} from '../_utils/datetime.std.ts';

/**
 * Duration in milliseconds (bounded to `Uint32` range).
 * @public
 */
export type DurationMs = Tagged<Uint32, 'DurationMs'>;

export namespace DurationMs {
  /** @public */
  export const SECOND = 1000 as DurationMs;
  /** @public */
  export const MINUTE = (1000 * 60) as DurationMs;
  /** @public */
  export const HOUR = (MINUTE * 60) as DurationMs;
  /** @public */
  export const DAY = (HOUR * 24) as DurationMs;

  /** @public */
  export const Schema: z.ZodMiniType<DurationMs, number> = z.pipe(
    Uint32.Schema,
    z.custom<DurationMs, Uint32>()
  );

  /** @public */
  export function isValid(input: number): input is DurationMs {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUint32(input: Uint32): DurationMs {
    return Schema.parse(input);
  }

  /** @public */
  export function fromMilliseconds(input: number): DurationMs {
    return fromUint32(Uint32.fromNumber(input));
  }

  /** @public */
  export function fromSeconds(input: number): DurationMs {
    return fromMilliseconds(secsToMs(input));
  }

  /** @public */
  export function fromMinutes(input: number): DurationMs {
    return fromMilliseconds(minsToMs(input));
  }

  /** @public */
  export function fromHours(input: number): DurationMs {
    return fromMilliseconds(hoursToMs(input));
  }

  /** @public */
  export function fromDays(input: number): DurationMs {
    return fromMilliseconds(daysToMs(input));
  }

  /** @public */
  export function fromDurationSecs(input: DurationSecs): DurationMs {
    return fromMilliseconds(secsToMs(input));
  }

  /** @public */
  export function fromDurationDays(input: DurationDays): DurationMs {
    return fromMilliseconds(daysToMs(input));
  }
}
