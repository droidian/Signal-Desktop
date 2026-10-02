// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

/**
 * This ensures that you're only forwarding extra props.
 */
export function forwardExtraPropsForRadix(
  rest: Record<string, never>
): Record<string, never> {
  return rest;
}
