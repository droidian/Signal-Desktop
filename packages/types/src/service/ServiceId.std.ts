// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import * as z from 'zod/mini';
import { Aci } from './Aci.std.ts';
import { Pni } from './Pni.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';
import { Utf8 } from '../encodings/Utf8.std.ts';

/**
 * A service identifier — either an {@link Aci} or {@link Pni}.
 * @public
 */
export type ServiceId = ServiceId.Decoded;

export namespace ServiceId {
  /** @public */
  export type Decoded = Aci | Pni;
  /** @public */
  export type Encoded = Bytes.Of<Decoded>;

  /** @public */
  export const Schema: z.ZodMiniType<ServiceId, string> = z.pipe(
    z.union([Aci.Schema, Pni.Schema]),
    z.custom<ServiceId>()
  );

  /** @public */
  export function isValid(input: string): input is ServiceId {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): ServiceId {
    return Schema.parse(input);
  }

  /** @public */
  export function decode(input: Encoded): ServiceId {
    return Utf8.fromBytes(input);
  }

  /** @public */
  export function encode(input: ServiceId): Encoded {
    return Utf8.toBytes(input);
  }
}
