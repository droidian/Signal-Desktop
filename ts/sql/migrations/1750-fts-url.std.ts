// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { WritableDB } from '../Interface.std.ts';

export default function updateToSchemaVersion1750(db: WritableDB): void {
  // @signalapp/sqlcipher@4.0.2 added support for tokenizing urls so we have
  // to reindex.
  db.exec(`
    INSERT INTO messages_fts(messages_fts) VALUES('rebuild');
  `);
}
