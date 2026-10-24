// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import * as z from 'zod/mini';
import { parseAddress } from '../_utils/address.std.ts';
import { ServiceId } from './ServiceId.std.ts';
import { DeviceId } from './DeviceId.std.ts';
import type { Address } from './Address.std.ts';

/**
 * A service address identifying a specific device by service ID and device ID.
 * @public
 */
export type AddressInfo = Tagged<AddressInfo.Params, 'AddressInfo'>;

export namespace AddressInfo {
  /** @public */
  export type Params = Readonly<{
    serviceId: ServiceId;
    deviceId: DeviceId;
  }>;

  const Schema: z.ZodMiniType<AddressInfo, Params> = z.pipe(
    z.strictObject({
      serviceId: ServiceId.Schema as z.ZodMiniType<ServiceId, ServiceId>,
      deviceId: DeviceId.Schema as z.ZodMiniType<DeviceId, DeviceId>,
    }),
    z.custom<AddressInfo>()
  );

  /** @public */
  export function isValid(input: Params): input is AddressInfo {
    return Schema.safeParse(input).success;
  }

  /** @public */
  export function fromParams(input: Params): AddressInfo {
    return Schema.parse(input);
  }

  /** @public */
  export function fromAddress(input: Address): AddressInfo {
    const result = parseAddress(input);
    if (!result.ok) {
      throw new TypeError(result.error);
    }
    return fromParams(result.value);
  }
}
