// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

export const PNI_PREFIX = 'PNI:';

const PNI_PREFIX_REGEX = /^PNI:/;

export function stripPniPrefix(input: string): string {
  if (!input.startsWith(PNI_PREFIX)) {
    throw new TypeError('missing pni prefix');
  }
  return input.replace(PNI_PREFIX_REGEX, '');
}
