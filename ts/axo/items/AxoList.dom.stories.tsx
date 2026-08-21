// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { Meta } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { AxoItem } from './AxoItem.dom.tsx';
import { AxoList } from './AxoList.dom.tsx';
import { tw } from '../tw.dom.tsx';

export default {
  title: 'Axo/Items/AxoList',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

function ExampleItems() {
  return (
    <AxoItem.Group>
      <AxoItem.Root>
        <AxoItem.Icon symbol="info" />
        <AxoItem.Content>
          <AxoItem.Body>
            <AxoItem.Title>First Item</AxoItem.Title>
            <AxoItem.Description>
              Description of the first item
            </AxoItem.Description>
            <AxoItem.HiddenTrigger label="Test" onClick={action('onClick')} />
          </AxoItem.Body>
        </AxoItem.Content>
      </AxoItem.Root>
      <AxoItem.Root>
        <AxoItem.Icon symbol="info" />
        <AxoItem.Content>
          <AxoItem.Body>
            <AxoItem.Title>Second Item</AxoItem.Title>
            <AxoItem.Description>
              Description of the second item
            </AxoItem.Description>
            <AxoItem.HiddenTrigger label="Test" onClick={action('onClick')} />
          </AxoItem.Body>
        </AxoItem.Content>
      </AxoItem.Root>
      <AxoItem.Root>
        <AxoItem.Icon symbol="info" />
        <AxoItem.Content>
          <AxoItem.Body>
            <AxoItem.Title>Third Item</AxoItem.Title>
            <AxoItem.Description>
              Description of the third item
            </AxoItem.Description>
            <AxoItem.HiddenTrigger label="Test" onClick={action('onClick')} />
          </AxoItem.Body>
        </AxoItem.Content>
      </AxoItem.Root>
    </AxoItem.Group>
  );
}

export function Basic(): React.JSX.Element {
  return (
    <div className={tw('bg-surface-secondary p-8')}>
      <AxoList.Root>
        <AxoList.Body>
          <ExampleItems />
        </AxoList.Body>
      </AxoList.Root>
    </div>
  );
}

export function WithTitle(): React.JSX.Element {
  return (
    <div className={tw('bg-surface-secondary p-8')}>
      <AxoList.Root>
        <AxoList.Header>
          <AxoList.Title>List Title</AxoList.Title>
        </AxoList.Header>
        <AxoList.Body>
          <ExampleItems />
        </AxoList.Body>
      </AxoList.Root>
    </div>
  );
}

export function WithDescription(): React.JSX.Element {
  return (
    <div className={tw('bg-surface-secondary p-8')}>
      <AxoList.Root>
        <AxoList.Header>
          <AxoList.Title>List Title</AxoList.Title>
          <AxoList.Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AxoList.Description>
        </AxoList.Header>
        <AxoList.Body>
          <ExampleItems />
        </AxoList.Body>
      </AxoList.Root>
    </div>
  );
}

export function WithHelp(): React.JSX.Element {
  return (
    <div className={tw('bg-surface-secondary p-8')}>
      <AxoList.Root>
        <AxoList.Header>
          <AxoList.Title>List Title</AxoList.Title>
        </AxoList.Header>
        <AxoList.Body>
          <ExampleItems />
        </AxoList.Body>
        <AxoList.Footer>
          <AxoList.Help>
            This is some helpful text that describes the section above.
          </AxoList.Help>
        </AxoList.Footer>
      </AxoList.Root>
    </div>
  );
}

export function MultipleLists(): React.JSX.Element {
  return (
    <div className={tw('bg-surface-secondary p-8')}>
      <AxoList.Root>
        <AxoList.Body>
          <ExampleItems />
        </AxoList.Body>
      </AxoList.Root>

      <AxoList.Root>
        <AxoList.Header>
          <AxoList.Title>Second Section</AxoList.Title>
        </AxoList.Header>
        <AxoList.Body>
          <ExampleItems />
        </AxoList.Body>
        <AxoList.Footer>
          <AxoList.Help>Help text for the second section.</AxoList.Help>
        </AxoList.Footer>
      </AxoList.Root>

      <AxoList.Root>
        <AxoList.Header>
          <AxoList.Title>Third Section</AxoList.Title>
        </AxoList.Header>
        <AxoList.Body>
          <ExampleItems />
        </AxoList.Body>
      </AxoList.Root>
    </div>
  );
}
