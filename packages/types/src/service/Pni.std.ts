// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uuid } from '../formats/Uuid.std.ts';
import { PNI_PREFIX, stripPniPrefix } from '../_utils/pni.std.ts';
import type { UntaggedPni } from './UntaggedPni.std.ts';
import { Utf8 } from '../encodings/Utf8.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';

function isPni(input: string): input is Pni {
  return input.startsWith(PNI_PREFIX) && Uuid.isValid(stripPniPrefix(input));
}

/**
 * Phone Number Identity (PNI), formatted as `PNI:${uuid}`.
 * @public
 */
export type Pni = Pni.Decoded;

export namespace Pni {
  type Opaque = Tagged<`PNI:${Uuid}`, 'Pni'>;

  /** @public */
  export type Decoded = Utf8.Of<Opaque>;
  /** @public */
  export type Encoded = Bytes.Of<Opaque>;

  /** @public */
  export const Schema: z.ZodMiniType<Pni, string> = z.pipe(
    z.string(),
    z.custom<Pni>(input => isPni(input))
  );

  /** @public */
  export function isValid(input: string): input is Pni {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): Pni {
    return Schema.parse(input);
  }

  /** @public */
  export function fromUuid(input: Uuid): Pni {
    return fromString(`${PNI_PREFIX}${input}`);
  }

  /** @public */
  export function fromUntaggedPni(input: UntaggedPni): Pni {
    return fromUuid(input);
  }

  /** @public */
  export function decode(input: Encoded): Pni {
    return Utf8.fromBytes(input);
  }

  /** @public */
  export function encode(input: Pni): Encoded {
    return Utf8.toBytes(input);
  }
}
