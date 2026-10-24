// Copyright 2025 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { DurationMs, type DurationSecs, TimestampMs } from '@signalapp/types';

export function getPinnedMessageExpiresAt(
  pinnedAt: TimestampMs,
  pinDuration: DurationSecs | null
): TimestampMs | null {
  if (pinDuration == null) {
    return null;
  }

  const pinDurationMs = DurationMs.fromDurationSecs(pinDuration);

  return TimestampMs.fromNumber(pinnedAt + pinDurationMs);
}
