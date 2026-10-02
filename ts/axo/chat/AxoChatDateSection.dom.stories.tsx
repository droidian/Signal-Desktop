// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { ReactNode } from 'react';
import type { Meta } from '@storybook/react';
import { AxoChatDateSection } from './AxoChatDateSection.dom.tsx';
import { AxoScrollArea } from '../AxoScrollArea.dom.tsx';
import { tw } from '../tw.dom.tsx';

export default {
  title: 'Axo/Chat/AxoChatDateSection',
} satisfies Meta;

function Message(props: { direction: 'incoming' | 'outgoing' }) {
  return (
    <p
      className={tw(
        'curved-2xl',
        'my-1 px-3 py-2 type-body-medium',
        'max-w-4/5',
        props.direction === 'outgoing' &&
          tw('ms-auto', 'bg-surface-message-outgoing text-primary-oncolor'),
        props.direction === 'incoming' &&
          tw('me-auto', 'bg-surface-message-incoming text-primary')
      )}
    >
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, cumque.
      Pariatur rem enim unde nulla animi voluptatibus veniam quia repellendus.
      Quisquam consequuntur quos perferendis saepe animi aliquam ullam rerum
      nihil!
    </p>
  );
}

export function Basic(): ReactNode {
  return (
    <div className={tw('size-100 border')}>
      <AxoScrollArea.Root scrollbarWidth="wide">
        <AxoScrollArea.Viewport>
          <AxoScrollArea.Content>
            <div className={tw('px-4')}>
              <AxoChatDateSection.Root>
                <AxoChatDateSection.Header>
                  Mon, July 6
                </AxoChatDateSection.Header>
                <Message direction="incoming" />
                <Message direction="outgoing" />
                <Message direction="incoming" />
                <Message direction="outgoing" />
              </AxoChatDateSection.Root>

              <AxoChatDateSection.Root>
                <AxoChatDateSection.Header>
                  Tues, July 7
                </AxoChatDateSection.Header>
                <Message direction="incoming" />
                <Message direction="outgoing" />
                <Message direction="incoming" />
                <Message direction="outgoing" />
              </AxoChatDateSection.Root>

              <AxoChatDateSection.Root>
                <AxoChatDateSection.Header>
                  Wed, July 8
                </AxoChatDateSection.Header>
                <Message direction="incoming" />
                <Message direction="outgoing" />
                <Message direction="incoming" />
                <Message direction="outgoing" />
              </AxoChatDateSection.Root>

              <AxoChatDateSection.Root>
                <AxoChatDateSection.Header>Yesterday</AxoChatDateSection.Header>
                <Message direction="incoming" />
                <Message direction="outgoing" />
                <Message direction="incoming" />
                <Message direction="outgoing" />
              </AxoChatDateSection.Root>

              <AxoChatDateSection.Root>
                <AxoChatDateSection.Header>Today</AxoChatDateSection.Header>
                <Message direction="incoming" />
                <Message direction="outgoing" />
                <Message direction="incoming" />
                <Message direction="outgoing" />
              </AxoChatDateSection.Root>
            </div>
          </AxoScrollArea.Content>
        </AxoScrollArea.Viewport>
      </AxoScrollArea.Root>
    </div>
  );
}
