// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import semverValid from 'semver/functions/valid';

function isSemver(input: string): input is Semver {
  return semverValid(input) != null;
}

/**
 * Semantic version string (Ex: `"1.2.3"`).
 * @public
 */
export type Semver = Tagged<string, 'Semver'>;

export namespace Semver {
  /** @public */
  export const Schema: z.ZodMiniType<Semver, string> = z.pipe(
    z.string(),
    z.custom<Semver>(isSemver)
  );

  /** @public */
  export function isValid(input: string): input is Semver {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromString(input: string): Semver {
    return Schema.parse(input);
  }
}
