// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uuid } from '../formats/Uuid.std.ts';
import type { Pni } from './Pni.std.ts';
import { stripPniPrefix } from '../_utils/pni.std.ts';
import { Utf8 } from '../encodings/Utf8.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';

/**
 * PNI UUID without the `PNI:` prefix. Use {@link Pni} when the prefix is required.
 * @public
 */
export type UntaggedPni = UntaggedPni.Decoded;

export namespace UntaggedPni {
  type Opaque = Tagged<Uuid, 'UntaggedPni'>;

  /** @public */
  export type Decoded = Utf8.Of<Opaque>;
  /** @public */
  export type Encoded = Bytes.Of<Opaque>;

  /** @public */
  export const Schema: z.ZodMiniType<UntaggedPni, string> = z.pipe(
    Uuid.Schema,
    z.custom<UntaggedPni>()
  );

  /** @public */
  export function isValid(input: string): input is UntaggedPni {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUuid(input: Uuid): UntaggedPni {
    return Schema.parse(input);
  }

  /** @public */
  export function fromString(input: string): UntaggedPni {
    return fromUuid(Uuid.fromString(input));
  }

  /** @public */
  export function fromPni(input: Pni): UntaggedPni {
    return fromString(stripPniPrefix(input));
  }

  /** @public */
  export function decode(input: Encoded): UntaggedPni {
    return Utf8.fromBytes(input);
  }

  /** @public */
  export function encode(input: UntaggedPni): Encoded {
    return Utf8.toBytes(input);
  }
}
