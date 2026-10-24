// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uuid } from '../formats/Uuid.std.ts';
import { Utf8 } from '../encodings/Utf8.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';

/**
 * Account Identifier (ACI) — uniquely identifies a Signal account.
 * @public
 */
export type Aci = Aci.Decoded;

export namespace Aci {
  type Opaque = Tagged<Uuid, 'Aci'>;

  /** @public */
  export type Decoded = Utf8.Of<Opaque>;
  /** @public */
  export type Encoded = Bytes.Of<Opaque>;

  /** @public */
  export const Schema: z.ZodMiniType<Aci, string> = z.pipe(
    Uuid.Schema,
    z.custom<Aci>()
  );

  /** @public */
  export function isValid(input: Uuid): input is Aci {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUuid(input: Uuid): Aci {
    return Schema.parse(input);
  }

  /** @public */
  export function fromString(input: string): Aci {
    return fromUuid(Uuid.fromString(input));
  }

  /** @public */
  export function decode(input: Encoded): Aci {
    return Utf8.fromBytes(input);
  }

  /** @public */
  export function encode(input: Aci): Encoded {
    return Utf8.toBytes(input);
  }
}
