// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import * as uuid from 'uuid';

function isUuid(input: string): input is Uuid {
  return uuid.validate(input);
}

/**
 * UUID string (Ex: `"00000000-0000-4000-0000-000000000000"`)
 * @public
 */
export type Uuid = Tagged<string, 'Uuid'>;

export namespace Uuid {
  /** @public */
  export const Schema: z.ZodMiniType<Uuid, string> = z.pipe(
    z.string(),
    z.custom<Uuid>(isUuid)
  );

  /** @public */
  export function isValid(input: string): input is Uuid {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): Uuid {
    return Schema.parse(input);
  }

  /** @public */
  export function createV4(): Uuid {
    return uuid.v4() as Uuid;
  }

  /** @public */
  export function createV7(): Uuid {
    return uuid.v7() as Uuid;
  }
}
