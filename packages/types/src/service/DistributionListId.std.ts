// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uuid } from '../formats/Uuid.std.ts';
import { Utf8 } from '../encodings/Utf8.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';

/**
 * Story distribution list identifier.
 * @public
 */
export type DistributionListId = DistributionListId.Decoded;

export namespace DistributionListId {
  type Opaque = Tagged<Uuid, 'DistributionListId'>;

  /** @public */
  export type Decoded = Utf8.Of<Opaque>;
  /** @public */
  export type Encoded = Bytes.Of<Opaque>;

  /** @public */
  export const Schema: z.ZodMiniType<DistributionListId, string> = z.pipe(
    Uuid.Schema,
    z.custom<DistributionListId>()
  );

  /** @public */
  export function isValid(input: string): input is DistributionListId {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUuid(input: Uuid): DistributionListId {
    return Schema.parse(input);
  }

  /** @public */
  export function fromString(input: string): DistributionListId {
    return fromUuid(Uuid.fromString(input));
  }

  /** @public */
  export function decode(input: Encoded): DistributionListId {
    return Utf8.fromBytes(input);
  }

  /** @public */
  export function encode(input: DistributionListId): Encoded {
    return Utf8.toBytes(input);
  }
}
