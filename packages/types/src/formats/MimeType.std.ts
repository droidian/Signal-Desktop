// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * MIME type string (Ex: `"application/json"`).
 * @public
 */
export type MimeType = Tagged<`${string}/${string}`, 'MimeType'>;

export namespace MimeType {
  /** @public */
  export const Schema: z.ZodMiniType<MimeType, string> = z.pipe(
    z.string().check(z.includes('/')),
    z.custom<MimeType>()
  );

  /** @public */
  export function isValid(input: string): input is MimeType {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): MimeType {
    return Schema.parse(input);
  }
}
