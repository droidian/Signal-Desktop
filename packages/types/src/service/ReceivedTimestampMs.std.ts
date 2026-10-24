// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { TimestampMs } from '../datetime/TimestampMs.std.ts';

/**
 * When a message was received on this device.
 * @public
 */
export type ReceivedTimestampMs = Tagged<TimestampMs, 'ReceivedTimestampMs'>;

export namespace ReceivedTimestampMs {
  /** @public */
  export const Schema: z.ZodMiniType<ReceivedTimestampMs, number> = z.pipe(
    TimestampMs.Schema,
    z.custom<ReceivedTimestampMs>()
  );

  /** @public */
  export function isValid(input: number): input is ReceivedTimestampMs {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromTimestampMs(input: TimestampMs): ReceivedTimestampMs {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): ReceivedTimestampMs {
    return fromTimestampMs(TimestampMs.fromNumber(input));
  }

  /** @public */
  export function fromBigInt(input: bigint): ReceivedTimestampMs {
    return fromTimestampMs(TimestampMs.fromBigInt(input));
  }

  /** @public */
  export function now(): ReceivedTimestampMs {
    return fromTimestampMs(TimestampMs.now());
  }
}
