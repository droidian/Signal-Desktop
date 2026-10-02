// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { SECOND } from '../../../util/durations/constants.std.ts';

export function timeIsPast(now: number, timestamp: number): boolean {
  return now >= timestamp - SECOND;
}
