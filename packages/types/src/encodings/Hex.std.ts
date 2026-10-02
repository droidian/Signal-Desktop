// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import type { Bytes } from './Bytes.std.ts';
import { Uint8ArrayFromHex, Uint8ArrayToHex } from '../_utils/bytes.std.ts';

/**
 * Hexadecimal-encoded string.
 * @public
 */
export type Hex = Tagged<string, 'Hex'>;

export namespace Hex {
  /** @public */
  export type Of<T> = Tagged<Hex, 'Hex.Of', T>;

  /** @public */
  export const Schema: z.ZodMiniType<Hex, string> = z.pipe(
    z.string().check(z.hex()),
    z.custom<Hex>()
  );

  /** @public */
  export function isValid(input: string): input is Hex {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): Hex {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBytes<T>(input: Bytes.Of<T>): Of<T>;
  export function fromBytes(input: Bytes): Hex;
  export function fromBytes(input: Bytes): Hex {
    return Uint8ArrayToHex(input) as Hex;
  }

  /** @public */
  export function toBytes<T>(input: Of<T>): Bytes.Of<T>;
  export function toBytes(input: Hex): Bytes;
  export function toBytes(input: Hex): Bytes {
    return Uint8ArrayFromHex(input);
  }
}
