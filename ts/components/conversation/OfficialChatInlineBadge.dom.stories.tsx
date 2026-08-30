// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { JSX } from 'react';
import type { Meta } from '@storybook/react';
import { OfficialChatInlineBadge } from './OfficialChatInlineBadge.dom.tsx';

export default {
  title: 'components/OfficialChatInlineBadge',
} satisfies Meta;

export function Default(): JSX.Element {
  return <OfficialChatInlineBadge />;
}
