// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import {
  MAX_SAFE_DATE,
  MIN_SAFE_DATE,
  msToSecsInt,
} from '../_utils/datetime.std.ts';
import type { TimestampMs } from './TimestampMs.std.ts';

/**
 * Unix timestamp in seconds.
 * @public
 */
export type TimestampSecs = Tagged<number, 'TimestampSecs'>;

export namespace TimestampSecs {
  /** @public */
  export const MIN = msToSecsInt(MIN_SAFE_DATE) as TimestampSecs;
  /** @public */
  export const MAX = msToSecsInt(MAX_SAFE_DATE) as TimestampSecs;

  /** @public */
  export const Schema: z.ZodMiniType<TimestampSecs, number> = z.pipe(
    z.number().check(z.int(), z.minimum(MIN), z.maximum(MAX)),
    z.custom<TimestampSecs>()
  );

  /** @public */
  export function isValid(input: number): input is TimestampSecs {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromNumber(input: number): TimestampSecs {
    return Schema.parse(input);
  }

  /** @public */
  export function fromTimestampMs(input: TimestampMs): TimestampSecs {
    return fromNumber(msToSecsInt(input));
  }

  /** @public */
  export function now(): TimestampSecs {
    return fromNumber(msToSecsInt(Date.now()));
  }
}
