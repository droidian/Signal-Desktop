// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { TimestampMs } from '../datetime/TimestampMs.std.ts';

/**
 * When a message was sent by the sender.
 * @public
 */
export type SentTimestampMs = Tagged<TimestampMs, 'SentTimestampMs'>;

export namespace SentTimestampMs {
  /** @public */
  export const Schema: z.ZodMiniType<SentTimestampMs, number> = z.pipe(
    TimestampMs.Schema,
    z.custom<SentTimestampMs>()
  );

  /** @public */
  export function isValid(input: number): input is SentTimestampMs {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromTimestampMs(input: TimestampMs): SentTimestampMs {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): SentTimestampMs {
    return fromTimestampMs(TimestampMs.fromNumber(input));
  }

  /** @public */
  export function fromBigInt(input: bigint): SentTimestampMs {
    return fromTimestampMs(TimestampMs.fromBigInt(input));
  }

  /** @public */
  export function now(): SentTimestampMs {
    return fromTimestampMs(TimestampMs.now());
  }
}
