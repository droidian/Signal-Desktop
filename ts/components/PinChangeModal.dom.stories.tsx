// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { JSX } from 'react';

import { action } from '@storybook/addon-actions';
import { type Meta } from '@storybook/react';
import { PinChangeModal } from './PinChangeModal.dom.tsx';

const { i18n } = window.SignalContext;

export default {
  title: 'Components/PinChangeModal',
} satisfies Meta;

export function Default(): JSX.Element {
  return (
    <PinChangeModal
      onCancel={action('onCancel')}
      onSubmit={action('onSubmit')}
      i18n={i18n}
    />
  );
}
