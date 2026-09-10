// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { JSX, ReactNode } from 'react';

export const CONTACT_SUPPORT_URL =
  'https://support.signal.org/hc/requests/new?desktop';

export function ContactSupportLink(parts: ReactNode): JSX.Element {
  return (
    <a
      key="signal-support"
      href={CONTACT_SUPPORT_URL}
      rel="noreferrer"
      target="_blank"
    >
      {parts}
    </a>
  );
}
