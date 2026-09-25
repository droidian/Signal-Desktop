// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import type { Bytes } from './Bytes.std.ts';
import {
  Uint8ArrayFromBase64Url,
  Uint8ArrayToBase64Url,
} from '../_utils/bytes.std.ts';

/**
 * Base64URL-encoded string (URL-safe variant using `-` and `_` instead of `+` and `/`).
 * @public
 */
export type Base64Url = Tagged<string, 'Base64Url'>;

export namespace Base64Url {
  /** @public */
  export type Of<T> = Tagged<Base64Url, 'Base64Url.Of', T>;

  /** @public */
  export const Schema: z.ZodMiniType<Base64Url, string> = z.pipe(
    z.string().check(z.base64url()),
    z.custom<Base64Url>()
  );

  /** @public */
  export function isValid(input: string): input is Base64Url {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): Base64Url {
    return Schema.parse(input);
  }

  /** @public */
  export function fromBytes<T>(input: Bytes.Of<T>): Of<T>;
  export function fromBytes(input: Bytes): Base64Url;
  export function fromBytes(input: Bytes): Base64Url {
    return Uint8ArrayToBase64Url(input) as Base64Url;
  }

  /** @public */
  export function toBytes<T>(input: Of<T>): Bytes.Of<T>;
  export function toBytes(input: Base64Url): Bytes;
  export function toBytes(input: Base64Url): Bytes {
    return Uint8ArrayFromBase64Url(input);
  }
}
