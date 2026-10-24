// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import type { Bytes } from './Bytes.std.ts';
import {
  Uint8ArrayFromBase64,
  Uint8ArrayToBase64,
} from '../_utils/bytes.std.ts';

/**
 * Base64-encoded string.
 * @public
 */
export type Base64 = Tagged<string, 'Base64'>;

export namespace Base64 {
  /** @public */
  export type Of<T> = Tagged<Base64, 'Base64.Of', T>;

  /** @public */
  export const Schema: z.ZodMiniType<Base64, string> = z.pipe(
    z.string().check(z.base64()),
    z.custom<Base64>()
  );

  /** @public */
  export function isValid(input: string): input is Base64 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): Base64 {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBytes<T>(input: Bytes.Of<T>): Of<T>;
  export function fromBytes(input: Bytes): Base64;
  export function fromBytes(input: Bytes): Base64 {
    return Uint8ArrayToBase64(input) as Base64;
  }

  /** @public */
  export function toBytes<T>(input: Of<T>): Bytes.Of<T>;
  export function toBytes(input: Base64): Bytes;
  export function toBytes(input: Base64): Bytes {
    return Uint8ArrayFromBase64(input);
  }
}
