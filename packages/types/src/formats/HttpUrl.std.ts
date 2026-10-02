// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * HTTP or HTTPS URL.
 * @public
 */
export type HttpUrl = Tagged<string, 'HttpUrl'>;

export namespace HttpUrl {
  /** @public */
  export const Schema: z.ZodMiniType<HttpUrl, string> = z.pipe(
    z.string().check(z.httpUrl()),
    z.custom<HttpUrl>()
  );

  /** @public */
  export function isValid(input: string): input is HttpUrl {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): HttpUrl {
    return Schema.parse(input);
  }
}
