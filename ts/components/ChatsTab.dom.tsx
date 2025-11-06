// Copyright 2023 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import React from 'react';
import type { LocalizerType } from '../types/I18N.std.ts';
import type { NavTabPanelProps } from './NavTabs.dom.tsx';
import { WhatsNewLink } from './WhatsNewLink.dom.tsx';
import type { UnreadStats } from '../util/countUnreadStats.std.ts';
import type { SmartConversationViewProps } from '../state/smart/ConversationView.preload.tsx';
import { tw } from '../axo/tw.dom.tsx';

export type ChatsTabProps = Readonly<{
  otherTabsUnreadStats: UnreadStats;
  i18n: LocalizerType;
  isStaging: boolean;
  hasPendingUpdate: boolean;
  hasFailedStorySends: boolean;
  navTabsCollapsed: boolean;
  onToggleNavTabsCollapse: (navTabsCollapsed: boolean) => void;
  renderConversationView: (
    props: SmartConversationViewProps
  ) => React.JSX.Element;
  renderLeftPane: (props: NavTabPanelProps) => React.JSX.Element;
  renderMiniPlayer: (options: { shouldFlow: boolean }) => React.JSX.Element;
  selectedConversationId: string | undefined;
  showWhatsNewModal: () => unknown;
}>;

export function ChatsTab({
  otherTabsUnreadStats,
  i18n,
  isStaging,
  hasPendingUpdate,
  hasFailedStorySends,
  navTabsCollapsed,
  onToggleNavTabsCollapse,
  renderConversationView,
  renderLeftPane,
  renderMiniPlayer,
  selectedConversationId,
  showWhatsNewModal,
}: ChatsTabProps): React.JSX.Element {
  return (
    <>

    {!selectedConversationId &&
        <div id="LeftPane">
            {renderLeftPane({
              otherTabsUnreadStats,
              hasPendingUpdate,
              hasFailedStorySends,
              onToggleCollapse: onToggleNavTabsCollapse,
            })}
        </div>
    }

    {selectedConversationId &&
      <div className="Inbox__conversation-stack">
        <div id="toast" />
        <div
          // Use `key` to force the tree to fully re-mount
          key={selectedConversationId}
          className="Inbox__conversation"
          id={`conversation-${selectedConversationId}`}
        >
          {renderConversationView({ selectedConversationId })}
        </div>
      </div>
    }
    </>
  );
}
