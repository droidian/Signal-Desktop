// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

export function setDocumentLocale(document: Document): void {
  document.documentElement.setAttribute(
    'lang',
    window.SignalContext.getResolvedMessagesLocale().split(/[-_]/)[0]
  );

  document.documentElement.setAttribute(
    'dir',
    window.SignalContext.getResolvedMessagesLocaleDirection()
  );
}
