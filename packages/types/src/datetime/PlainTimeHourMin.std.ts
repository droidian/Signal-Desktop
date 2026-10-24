// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uint32 } from '../numbers/Uint32.std.ts';

const MIN = 0;
const MAX = 2359;
const MINS_MAX = 59;

function getMins(input: number): number {
  return input % 100;
}

function isPlainTimeHourMin(input: number): input is PlainTimeHourMin {
  return (
    Number.isInteger(input) &&
    input >= MIN &&
    input <= MAX &&
    getMins(input) <= MINS_MAX
  );
}

/**
 * 24-hour clock time as a 4-digit integer (0000–2359).
 * @public
 */
export type PlainTimeHourMin = Tagged<Uint32, 'PlainTimeHourMin'>;

export namespace PlainTimeHourMin {
  /** @public */
  export const Schema: z.ZodMiniType<PlainTimeHourMin, number> = z.pipe(
    Uint32.Schema,
    z.custom<PlainTimeHourMin>(isPlainTimeHourMin)
  );

  /** @public */
  export function isValid(input: number): input is PlainTimeHourMin {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUint32(input: Uint32): PlainTimeHourMin {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): PlainTimeHourMin {
    return fromUint32(Uint32.fromNumber(input));
  }
}
