// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
// oxlint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer';
import type { Bytes } from '../encodings/Bytes.std.ts';

/**
 * TODO: Once upgrading to Node 25+ we can replace Buffer with Uint8Array methods.
 */

/** Future: `new TextDecoder().decode(input)` */
export function TextDecoderDecode(input: Bytes): string {
  return Buffer.from(input).toString('utf8');
}

/** Future: `new TextEncoder().encode(input)` */
export function TextEncoderEncode(input: string): Bytes {
  return Buffer.from(input, 'utf8');
}

/** Future: `input.toBase64()` */
export function Uint8ArrayToBase64(input: Bytes): string {
  return Buffer.from(input).toString('base64');
}

/** Future: `Uint8Array.fromBase64(input)` */
export function Uint8ArrayFromBase64(input: string): Bytes {
  return Buffer.from(input, 'base64');
}

/** Future: `input.toBase64({ alphabet: 'base64url', omitPadding: true })` */
export function Uint8ArrayToBase64Url(input: Bytes): string {
  return Buffer.from(input).toString('base64url');
}

/** Future: `Uint8Array.fromBase64(input, { alphabet: 'base64url' })` */
export function Uint8ArrayFromBase64Url(input: string): Bytes {
  return Buffer.from(input, 'base64url');
}

/** Future: `input.toHex()` */
export function Uint8ArrayToHex(input: Bytes): string {
  return Buffer.from(input).toString('hex');
}

/** Future: `Uint8Array.fromHex(input)` */
export function Uint8ArrayFromHex(input: string): Bytes {
  return Buffer.from(input, 'hex');
}
