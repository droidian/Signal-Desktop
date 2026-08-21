// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

export const MIN_SAFE_DATE = -8_640_000_000_000_000;
export const MAX_SAFE_DATE = 8_640_000_000_000_000;

const MS_PER_SEC = 1000;
const MS_PER_MIN: number = 60 * MS_PER_SEC;
const MS_PER_HOUR: number = 60 * MS_PER_MIN;
const MS_PER_DAY: number = 24 * MS_PER_HOUR;

const SECS_PER_MIN = 60;
const SECS_PER_HOUR: number = 60 * SECS_PER_MIN;
const SECS_PER_DAY: number = 24 * SECS_PER_HOUR;

export const msToSecsInt = (ms: number): number => Math.trunc(ms / MS_PER_SEC);
export const msToDaysInt = (ms: number): number => Math.trunc(ms / MS_PER_DAY);

export const secsToMs = (seconds: number): number => seconds * MS_PER_SEC;
export const secsToDays = (secs: number): number =>
  Math.trunc(secs / SECS_PER_DAY);

export const minsToMs = (minutes: number): number => minutes * MS_PER_MIN;
export const minsToSecs = (mins: number): number => mins * SECS_PER_MIN;

export const hoursToMs = (hours: number): number => hours * MS_PER_HOUR;
export const hoursToSecs = (hours: number): number => hours * SECS_PER_HOUR;

export const daysToMs = (days: number): number => days * MS_PER_DAY;
export const daysToSecs = (days: number): number => days * SECS_PER_DAY;
