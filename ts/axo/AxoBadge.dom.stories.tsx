// Copyright 2025 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { JSX } from 'react';

import type { Meta } from '@storybook/react';
import { AxoBadge } from './AxoBadge.dom.tsx';
import { tw } from './tw.dom.tsx';

export default {
  title: 'Axo/AxoBadge',
} satisfies Meta;

function Template(props: Partial<AxoBadge.RootProps>) {
  return (
    <AxoBadge.Root
      variant="primary"
      size="lg"
      value={1}
      max={99}
      label={null}
      {...props}
    />
  );
}

export function Basic(): JSX.Element {
  return <Template />;
}

export function Digits(): JSX.Element {
  return (
    <div className={tw('flex gap-4')}>
      <Template value={10} max={Infinity} />
      <Template value={99} max={Infinity} />
      <Template value={999} max={Infinity} />
      <Template value={9999} max={Infinity} />
      <Template value={999999999} max={Infinity} />
    </div>
  );
}

export function Max(): JSX.Element {
  return (
    <div className={tw('flex gap-4')}>
      <Template value={9} max={9} />
      <Template value={10} max={9} />
      <Template value={99} max={99} />
      <Template value={100} max={99} />
      <Template value={999} max={999} />
      <Template value={1000} max={999} />
      <Template value={9999} max={9999} />
      <Template value={10000} max={9999} />
    </div>
  );
}

export function Mention(): JSX.Element {
  return <Template value="mention" />;
}

export function Unread(): JSX.Element {
  return <Template value="unread" />;
}

export function Error(): JSX.Element {
  return <Template variant="destructive" value="error" />;
}

export function Variants(): JSX.Element {
  return (
    <div className={tw('flex gap-4')}>
      <Template variant="primary" />
      <Template variant="destructive" />
      <Template variant="secondary" />
    </div>
  );
}

export function Sizes(): JSX.Element {
  return (
    <div className={tw('flex gap-4')}>
      <Template size="dot" />
      <Template size="sm" />
      <Template size="md" />
      <Template size="lg" />
    </div>
  );
}

export function Dot(): JSX.Element {
  return (
    <div className={tw('flex gap-4')}>
      <Template size="dot" variant="primary" value="unread" />
      <Template size="dot" variant="destructive" value="unread" />
    </div>
  );
}
