// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import {
  MAX_SAFE_DATE,
  MIN_SAFE_DATE,
  secsToMs,
} from '../_utils/datetime.std.ts';
import type { TimestampSecs } from './TimestampSecs.std.ts';
import { bigIntToNumber } from '../_utils/numbers.std.ts';

/**
 * Unix timestamp in milliseconds.
 * @public
 */
export type TimestampMs = Tagged<number, 'TimestampMs'>;

export namespace TimestampMs {
  /** @public */
  export const MIN = MIN_SAFE_DATE as TimestampMs;
  /** @public */
  export const MAX = MAX_SAFE_DATE as TimestampMs;

  /** @public */
  export const Schema: z.ZodMiniType<TimestampMs, number> = z.pipe(
    z.number().check(z.int(), z.minimum(MIN), z.maximum(MAX)),
    z.custom<TimestampMs>()
  );

  /** @public */
  export function isValid(input: number): input is TimestampMs {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): TimestampMs {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBigInt(input: bigint): TimestampMs {
    return fromNumber(bigIntToNumber(input));
  }

  /** @public */
  export function fromTimestampSecs(input: TimestampSecs): TimestampMs {
    return fromNumber(secsToMs(input));
  }

  /** @public */
  export function now(): TimestampMs {
    return fromNumber(Date.now());
  }
}
