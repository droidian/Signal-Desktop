// Copyright 2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { AciString, ServiceIdString } from './ServiceId.std.ts';

export const SIGNAL_ACI = '11111111-1111-4111-8111-111111111111' as AciString;
export const SIGNAL_AVATAR_PATH = 'images/profile-avatar.svg';

export function isSignalServiceId(serviceId: ServiceIdString): boolean {
  return serviceId === SIGNAL_ACI;
}
