// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { TimestampMs } from '../datetime/TimestampMs.std.ts';

/**
 * Timestamp assigned by the Signal server when a message is processed.
 * @public
 */
export type ServerTimestampMs = Tagged<TimestampMs, 'ServerTimestampMs'>;

export namespace ServerTimestampMs {
  /** @public */
  export const Schema: z.ZodMiniType<ServerTimestampMs, number> = z.pipe(
    TimestampMs.Schema,
    z.custom<ServerTimestampMs>()
  );

  /** @public */
  export function isValid(input: number): input is ServerTimestampMs {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromTimestampMs(input: TimestampMs): ServerTimestampMs {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): ServerTimestampMs {
    return fromTimestampMs(TimestampMs.fromNumber(input));
  }

  /** @public */
  export function fromBigInt(input: bigint): ServerTimestampMs {
    return fromTimestampMs(TimestampMs.fromBigInt(input));
  }

  /** @public */
  export function now(): ServerTimestampMs {
    return fromTimestampMs(TimestampMs.now());
  }
}
