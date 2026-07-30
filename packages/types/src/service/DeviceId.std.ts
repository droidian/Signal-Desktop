// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uint32 } from '../numbers/Uint32.std.ts';

/**
 * Identifies a specific registered device within an account.
 * @public
 */
export type DeviceId = Tagged<Uint32, 'DeviceId'>;

export namespace DeviceId {
  /** @public */
  export const Schema: z.ZodMiniType<DeviceId, number> = z.pipe(
    Uint32.Schema,
    z.custom<DeviceId>()
  );

  /** @public */
  export function isValid(input: number): input is DeviceId {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUint32(input: Uint32): DeviceId {
    return Schema.parse(input);
  }

  /** @public */
  export function fromNumber(input: number): DeviceId {
    return fromUint32(Uint32.fromNumber(input));
  }
}
