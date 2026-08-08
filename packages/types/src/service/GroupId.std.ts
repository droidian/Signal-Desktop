// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Base64 } from '../encodings/Base64.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';

/**
 * Group identifier (Base64-encoded).
 * @public
 */
export type GroupId = GroupId.Decoded;

export namespace GroupId {
  type Opaque = Tagged<unknown, 'GroupId'>;

  /** @public */
  export type Decoded = Base64.Of<Opaque>;
  /** @public */
  export type Encoded = Bytes.Of<Opaque>;

  /** @public */
  export const Schema: z.ZodMiniType<GroupId, string> = z.pipe(
    Base64.Schema,
    z.custom<GroupId>()
  );

  /** @public */
  export function isValid(input: string): input is GroupId {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromBase64(input: Base64): GroupId {
    return Schema.parse(input);
  }

  /** @public */
  export function fromString(input: string): GroupId {
    return fromBase64(Base64.fromString(input));
  }

  /** @public */
  export function decode(input: Encoded): GroupId {
    return Base64.fromBytes(input);
  }

  /** @public */
  export function encode(input: GroupId): Encoded {
    return Base64.toBytes(input);
  }
}
