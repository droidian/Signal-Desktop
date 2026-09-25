// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
// @ts-check
import { execSync } from 'node:child_process';
import { SECOND } from './durations.mjs';

/**
 * @returns {number}
 */
export function getBuildCreationTimestamp() {
  const unixTimestamp = parseInt(
    process.env.SOURCE_DATE_EPOCH ||
      execSync('git show -s --format=%ct').toString('utf8'),
    10
  );
  return unixTimestamp * SECOND;
}
