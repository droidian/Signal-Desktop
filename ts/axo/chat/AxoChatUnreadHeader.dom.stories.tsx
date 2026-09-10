// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { ReactNode } from 'react';
import type { Meta } from '@storybook/react';
import { AxoChatUnreadHeader } from './AxoChatUnreadHeader.dom.tsx';

export default {
  title: 'Axo/Chat/AxoChatUnreadHeader',
} satisfies Meta;

export function Basic(): ReactNode {
  return <AxoChatUnreadHeader.Root>2 Unread Messages</AxoChatUnreadHeader.Root>;
}
