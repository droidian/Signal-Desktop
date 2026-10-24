// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

function isLanguageTag(input: string): input is LanguageTag {
  try {
    new Intl.Locale(input);
    return true;
  } catch {
    return false;
  }
}

/**
 * BCP 47 language tag (Ex: `"en-US"`).
 * @public
 */
export type LanguageTag = Tagged<string, 'LanguageTag'>;

export namespace LanguageTag {
  /** @public */
  export const Schema: z.ZodMiniType<LanguageTag, string> = z.pipe(
    z.string(),
    z.custom<LanguageTag>(isLanguageTag, 'must be valid language tag')
  );

  /** @public */
  export function isValid(input: string): input is LanguageTag {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): LanguageTag {
    return Schema.parse(input);
  }
}
