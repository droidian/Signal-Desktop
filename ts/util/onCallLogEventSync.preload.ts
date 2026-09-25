// Copyright 2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { CallLogEventSyncEvent } from '../textsecure/messageReceiverEvents.std.ts';
import { createLogger } from '../logging/log.std.ts';
import { DataReader, DataWriter } from '../sql/Client.preload.ts';
import type { CallLogEventTarget } from '../types/CallDisposition.std.ts';
import { CallLogEvent } from '../types/CallDisposition.std.ts';
import { missingCaseError } from './missingCaseError.std.ts';
import {
  markCallHistoryReadWithoutSync,
  updateDeletedMessages,
} from './callDisposition.preload.ts';

const log = createLogger('onCallLogEventSync');

export async function onCallLogEventSync(
  syncEvent: CallLogEventSyncEvent
): Promise<void> {
  const { data, confirm } = syncEvent;
  const {
    type,
    peerIdAsConversationId,
    peerIdAsRoomId,
    callId,
    targetTimestamp,
    eventTimestamp,
  } = data.callLogEventDetails;

  const target: CallLogEventTarget = {
    peerIdAsConversationId,
    peerIdAsRoomId,
    callId,
    timestamp: targetTimestamp,
  };

  log.info(
    `Processing event (Event: ${type}, CallId: ${callId}, Timestamp: ${targetTimestamp})`
  );

  if (type === CallLogEvent.Clear) {
    log.info('Clearing call history');
    let unreadConversationIds: ReadonlyArray<string> = [];
    try {
      unreadConversationIds =
        await DataReader.getCallHistoryUnreadCallConversationIds();
      const messageIds = await DataWriter.clearCallHistory(target);
      updateDeletedMessages(messageIds);
    } finally {
      // We want to reset the call history even if the clear fails.
      window.reduxActions.callHistory.resetCallHistory();
      window.reduxActions.callHistory.updateCallHistoryUnreadCount(
        unreadConversationIds
      );
    }
    confirm();
  } else if (type === CallLogEvent.MarkedAsRead) {
    log.info('Marking call history read');
    await markCallHistoryReadWithoutSync({
      mode: 'all-calls',
      target,
      readAt: Math.min(Date.now(), eventTimestamp),
    });
    confirm();
  } else if (type === CallLogEvent.MarkedAsReadInConversation) {
    log.info('Marking call history read in conversation');
    await markCallHistoryReadWithoutSync({
      mode: 'all-calls-in-conversation',
      target,
      readAt: Math.min(Date.now(), eventTimestamp),
    });
    confirm();
  } else if (type === CallLogEvent.UNIMPLEMENTED_ClearInConversation) {
    log.warn('CallLogEvent.CLEAR_IN_CONVERSATION not supported');
    confirm();
  } else {
    throw missingCaseError(type);
  }
}
