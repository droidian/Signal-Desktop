// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Utf8 } from '../encodings/Utf8.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';

/**
 * International phone number in E.164 format (e.g., `"+12125550123"`).
 * @public
 */
export type E164 = E164.Decoded;

export namespace E164 {
  type Opaque = Tagged<`+${string}`, 'E164'>;

  /** @public */
  export type Decoded = Utf8.Of<Opaque>;
  /** @public */
  export type Encoded = Bytes.Of<Opaque>;

  /** @public */
  export const Schema: z.ZodMiniType<E164, string> = z.pipe(
    z.string().check(z.e164()),
    z.custom<E164>()
  );

  /** @public */
  export function isValid(input: string): input is E164 {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): E164 {
    return Schema.parse(input);
  }

  /** @public */
  export function decode(input: Encoded): E164 {
    return Utf8.fromBytes(input);
  }

  /** @public */
  export function encode(input: E164): Encoded {
    return Utf8.toBytes(input);
  }
}
