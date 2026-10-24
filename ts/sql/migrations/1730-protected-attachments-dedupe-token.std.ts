// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { WritableDB } from '../Interface.std.ts';

export default function updateToSchemaVersion1730(db: WritableDB): void {
  // Each row is an outstanding reuse claim on a path, keyed by an ephemeral token
  // returned to the caller. saveMessageAttachments releases the claim in the same
  // transaction that writes the message_attachments row referencing the path.
  db.exec(`
    DROP TABLE attachments_protected_from_deletion;

    CREATE TABLE attachments_protected_from_deletion (
      path TEXT NOT NULL,
      reuseToken TEXT NOT NULL,
      PRIMARY KEY (path, reuseToken)
    ) STRICT;

    CREATE INDEX attachments_protected_from_deletion_reuseToken
      ON attachments_protected_from_deletion (reuseToken);

    DROP TRIGGER stop_protecting_attachments_after_update;
    DROP TRIGGER stop_protecting_attachments_after_insert;
  `);
}
