// Copyright 2025 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { ReactNode, JSX } from 'react';
import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { AxoSelect } from './AxoSelect.dom.tsx';
import { tw } from './tw.dom.tsx';

export default {
  title: 'Axo/AxoSelect',
} satisfies Meta;

function TemplateItem(props: {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}): JSX.Element {
  return (
    <AxoSelect.Item value={props.value} disabled={props.disabled}>
      <AxoSelect.ItemText>{props.children}</AxoSelect.ItemText>
    </AxoSelect.Item>
  );
}

function Template(props: {
  disabled?: boolean;
  triggerWidth?: AxoSelect.TriggerWidth;
  triggerVariant: AxoSelect.TriggerVariant;
  triggerChevron?: AxoSelect.TriggerChevron;
}) {
  const [value, setValue] = useState<string | null>(null);
  return (
    <AxoSelect.Root
      value={value}
      onValueChange={setValue}
      disabled={props.disabled}
    >
      <AxoSelect.Trigger
        variant={props.triggerVariant}
        width={props.triggerWidth}
        chevron={props.triggerChevron}
        placeholder="Select an item..."
      />
      <AxoSelect.Content>
        <AxoSelect.Group>
          <AxoSelect.Label>Fruits</AxoSelect.Label>
          <TemplateItem value="apple">Apple</TemplateItem>
          <TemplateItem value="banana">Banana</TemplateItem>
          <TemplateItem value="blueberry">Blueberry</TemplateItem>
          <TemplateItem value="grapes">Grapes</TemplateItem>
          <TemplateItem value="pineapple">Pineapple</TemplateItem>
        </AxoSelect.Group>
        <AxoSelect.Separator />
        <AxoSelect.Group>
          <AxoSelect.Label>Vegetables</AxoSelect.Label>
          <TemplateItem value="aubergine">Aubergine</TemplateItem>
          <TemplateItem value="broccoli">Broccoli</TemplateItem>
          <TemplateItem value="carrot" disabled>
            Carrot
          </TemplateItem>
          <TemplateItem value="leek">Leek</TemplateItem>
        </AxoSelect.Group>
        <AxoSelect.Separator />
        <AxoSelect.Group>
          <AxoSelect.Label>Meat</AxoSelect.Label>
          <TemplateItem value="beef">Beef</TemplateItem>
          <TemplateItem value="chicken">Chicken</TemplateItem>
          <TemplateItem value="lamb">Lamb</TemplateItem>
          <TemplateItem value="pork">Pork</TemplateItem>
        </AxoSelect.Group>
      </AxoSelect.Content>
    </AxoSelect.Root>
  );
}

export function Basic(): JSX.Element {
  return (
    <div
      className={tw(
        'flex h-96 w-full flex-col items-center justify-center gap-2'
      )}
    >
      <div className={tw('flex w-full gap-2')}>
        <Template triggerVariant="default" />
        <Template triggerVariant="default" disabled />
      </div>
      <div className={tw('flex w-full gap-2')}>
        <Template triggerVariant="elevated" />
        <Template triggerVariant="elevated" disabled />
      </div>
      <div className={tw('flex w-full gap-2')}>
        <Template triggerVariant="implied" />
        <Template triggerVariant="implied" disabled />
      </div>

      <div className={tw('flex w-full gap-2')}>
        <Template triggerWidth="full" triggerVariant="default" />
        <Template triggerWidth="full" triggerVariant="default" disabled />
      </div>
      <div className={tw('flex w-full gap-2')}>
        <Template triggerWidth="full" triggerVariant="elevated" />
        <Template triggerWidth="full" triggerVariant="elevated" disabled />
      </div>
      <div className={tw('flex w-full gap-2')}>
        <Template triggerWidth="full" triggerVariant="implied" />
        <Template triggerWidth="full" triggerVariant="implied" disabled />
      </div>

      <div className={tw('flex w-full gap-2')}>
        <Template triggerChevron="on-hover" triggerVariant="default" />
        <Template triggerChevron="on-hover" triggerVariant="default" disabled />
      </div>
      <div className={tw('flex w-full gap-2')}>
        <Template triggerChevron="on-hover" triggerVariant="elevated" />
        <Template
          triggerChevron="on-hover"
          triggerVariant="elevated"
          disabled
        />
      </div>
      <div className={tw('flex w-full gap-2')}>
        <Template triggerChevron="on-hover" triggerVariant="implied" />
        <Template triggerChevron="on-hover" triggerVariant="implied" disabled />
      </div>

      <div className={tw('flex w-full gap-2')}>
        <Template
          triggerWidth="full"
          triggerChevron="on-hover"
          triggerVariant="default"
        />
        <Template
          triggerWidth="full"
          triggerChevron="on-hover"
          triggerVariant="default"
          disabled
        />
      </div>
      <div className={tw('flex w-full gap-2')}>
        <Template
          triggerWidth="full"
          triggerChevron="on-hover"
          triggerVariant="elevated"
        />
        <Template
          triggerWidth="full"
          triggerChevron="on-hover"
          triggerVariant="elevated"
          disabled
        />
      </div>
      <div className={tw('flex w-full gap-2')}>
        <Template
          triggerWidth="full"
          triggerChevron="on-hover"
          triggerVariant="implied"
        />
        <Template
          triggerWidth="full"
          triggerChevron="on-hover"
          triggerVariant="implied"
          disabled
        />
      </div>
    </div>
  );
}
