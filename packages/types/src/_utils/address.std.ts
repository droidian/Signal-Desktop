// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import { Result } from '../Result.std.ts';
import { ServiceId } from '../service/ServiceId.std.ts';
import { safeParseNumber } from './numbers.std.ts';
import { Uint32 } from '../numbers/Uint32.std.ts';
import { DeviceId } from '../service/DeviceId.std.ts';
import type { AddressInfo } from '../service/AddressInfo.std.ts';

export function parseAddress(input: string): Result<AddressInfo.Params> {
  const parts = input.split('.');
  if (parts.length !== 2) {
    return Result.err('must have format "<ServiceId>.<DeviceId>"');
  }

  const [serviceId, deviceIdStr] = parts;
  if (serviceId == null || serviceId.length === 0) {
    return Result.err('missing service id');
  }

  if (!ServiceId.isValid(serviceId)) {
    return Result.err('invalid service id');
  }

  if (deviceIdStr == null || deviceIdStr.length === 0) {
    return Result.err('missing device id');
  }

  const deviceId = safeParseNumber(deviceIdStr);
  if (deviceId == null) {
    return Result.err('device id is not a number');
  }

  if (!Uint32.isValid(deviceId)) {
    return Result.err('device id is not a valid uint32');
  }

  if (!DeviceId.isValid(deviceId)) {
    return Result.err('invalid device id');
  }

  return Result.ok({ serviceId, deviceId });
}
