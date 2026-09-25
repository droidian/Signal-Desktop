// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { Uuid } from '../formats/Uuid.std.ts';
import type { Bytes } from '../encodings/Bytes.std.ts';
import { Utf8 } from '../encodings/Utf8.std.ts';

/**
 * Sender Key Distribution identifier.
 * @public
 */
export type DistributionId = DistributionId.Decoded;

export namespace DistributionId {
  type Opaque = Tagged<Uuid, 'DistributionId'>;

  /** @public */
  export type Decoded = Utf8.Of<Opaque>;
  /** @public */
  export type Encoded = Bytes.Of<Opaque>;

  /** @public */
  export const Schema: z.ZodMiniType<DistributionId, string> = z.pipe(
    Uuid.Schema,
    z.custom<DistributionId>()
  );

  /** @public */
  export function isValid(input: string): input is DistributionId {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromUuid(input: Uuid): DistributionId {
    return Schema.parse(input);
  }

  /** @public */
  export function fromString(input: string): DistributionId {
    return fromUuid(Uuid.fromString(input));
  }

  /** @public */
  export function decode(input: Encoded): DistributionId {
    return Utf8.fromBytes(input);
  }

  /** @public */
  export function encode(input: DistributionId): Encoded {
    return Utf8.toBytes(input);
  }
}
