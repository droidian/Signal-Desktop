// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';

/**
 * CSS hex color string starting with `#` (e.g., `"#FFFFFF"`).
 * @public
 */
export type HexColor = Tagged<`#${string}`, 'HexColor'>;

export namespace HexColor {
  /** @public */
  export const Schema: z.ZodMiniType<HexColor, string> = z.pipe(
    z.string().check(z.startsWith('#')),
    z.custom<HexColor>()
  );

  /** @public */
  export function isValid(input: string): input is HexColor {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): HexColor {
    return Schema.parse(input);
  }
}
