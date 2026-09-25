// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Tagged } from 'type-fest';
import type { Bytes } from './Bytes.std.ts';
import { TextDecoderDecode, TextEncoderEncode } from '../_utils/bytes.std.ts';

export namespace Utf8 {
  /** @public */
  export type Of<T extends string> = Tagged<T, 'Utf8.Of'>;

  /** @public */
  export function fromBytes<T extends string>(input: Bytes.Of<T>): Of<T> {
    return TextDecoderDecode(input) as Of<T>;
  }

  /** @public */
  export function toBytes<T extends string>(input: Of<T>): Bytes.Of<T> {
    return TextEncoderEncode(input) as Bytes.Of<T>;
  }
}
