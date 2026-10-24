// Copyright 2025 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { useEffect } from 'react';

import { formatDurationInMs } from '../../../util/formatDuration.std.ts';
import { timeIsPast } from './timeIsPast.std.ts';
import { SECOND } from '../../../util/durations/constants.std.ts';

export function useCountdownDuration({
  timestamp,
  setDuration,
}: {
  timestamp: number | undefined;
  setDuration: (duration: string | undefined) => unknown;
}): void {
  useEffect(() => {
    const startingNow = Date.now();
    if (!timestamp || timeIsPast(startingNow, timestamp)) {
      return;
    }

    const startingMsUntil = timestamp - startingNow;
    const startingDuration = formatDurationInMs(startingMsUntil);
    setDuration(startingDuration);

    let interval: NodeJS.Timeout | undefined = setInterval(() => {
      const now = Date.now();
      if (timeIsPast(now, timestamp)) {
        setDuration(undefined);
        clearInterval(interval);
        interval = undefined;
        return;
      }

      const msUntil = timestamp - now;
      const newDuration = formatDurationInMs(msUntil);
      setDuration(newDuration);
    }, SECOND);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timestamp, setDuration]);
}
