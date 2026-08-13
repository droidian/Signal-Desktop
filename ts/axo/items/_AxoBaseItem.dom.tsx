// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import type { FC, MouseEvent, ReactNode, Ref } from 'react';
import { memo, useId } from 'react';
import {
  createStrictContext,
  useStrictContext,
} from '../_internal/StrictContext.dom.tsx';
import { tw } from '../tw.dom.tsx';
import {
  AriaLabellingProvider,
  useAriaLabellingContext,
  useCreateAriaLabellingContext,
} from '../_internal/AriaLabellingContext.dom.tsx';
import { AriaClickable } from '../AriaClickable.dom.tsx';
import { forwardExtraPropsForRadix } from '../_internal/props.dom.tsx';
import { AxoIconButton } from '../AxoIconButton.dom.tsx';
import { AxoSymbol } from '../AxoSymbol.dom.tsx';
import { AxoButton } from '../AxoButton.dom.tsx';
import { AxoCheckbox } from '../AxoCheckbox.dom.tsx';
import { AxoRadioGroup } from '../AxoRadioGroup.dom.tsx';
import { AxoAvatar } from '../AxoAvatar.dom.tsx';

const LEADING_SLOT = 'axo-item-leading-slot';
const CONTENT_SLOT = 'axo-item-content-slot';
const TRAILING_SLOT = 'axo-item-trailing-slot';

const GRID_TEMPLATE_COLUMNS =
  `[${LEADING_SLOT}] min-content ` +
  `[${CONTENT_SLOT}] auto ` +
  `[${TRAILING_SLOT}] min-content`;

/**
 * @example Anatomy
 * ```tsx
 * <AxoBaseItem.Group>
 *   <AxoBaseItem.Root>
 *     <AxoBaseItem.Icon />
 *     <AxoBaseItem.Content>
 *       <AxoBaseItem.Body>
 *         <AxoBaseItem.Title />
 *         <AxoBaseItem.Value />
 *         <AxoBaseItem.Description />
 *         <AxoBaseItem.HiddenTrigger />
 *       </AxoBaseItem.Body>
 *       <AxoBaseItem.Accessory>
 *         <AxoBaseItem.Action />
 *         <AxoBaseItem.IconAction />
 *         <AxoSelect.Root />
 *         <AxoSwitch.Root />
 *       </AxoBaseItem.Accessory>
 *     </AxoBaseItem.Content>
 *     <AxoBaseItem.Arrow />
 *   </AxoBaseItem.Root>
 * </AxoBaseItem.Layout>
 * ```
 */
export namespace AxoBaseItem {
  /**
   * <AxoBaseItem.Group>
   * --------------------------------------------------------------------------
   */

  const GroupContext = createStrictContext<true>('AxoBaseItem.Group');

  export type GroupProps = Readonly<{
    children: ReactNode;
  }>;

  export const Group: FC<GroupProps> = memo(props => {
    return (
      <GroupContext value>
        <div
          role="list"
          className={tw('grid')}
          style={{
            gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
          }}
        >
          {props.children}
        </div>
      </GroupContext>
    );
  });

  Group.displayName = 'AxoBaseItem.Group';

  /**
   * <AxoBaseItem.Root>
   * --------------------------------------------------------------------------
   */

  export type RootProps = Readonly<{
    children: ReactNode;
  }>;

  export const Root: FC<RootProps> = memo(props => {
    useStrictContext(GroupContext); // ensure we're the group grid
    const { context, labelId, descriptionId } = useCreateAriaLabellingContext();

    return (
      <AriaLabellingProvider value={context}>
        <AriaClickable.Root asChild>
          <div
            role="listitem"
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            className={tw(
              'group',
              // forward grid
              'col-span-full grid grid-cols-subgrid',
              'px-2 py-0.5'
            )}
          >
            <div
              className={tw(
                // forward grid
                'col-span-full grid grid-cols-subgrid',
                'gap-x-3',
                'px-3 py-2',
                'items-baseline',
                'text-primary',
                'curved-14',
                'group-data-hovered:bg-secondary',
                'group-data-pressed:bg-secondary-pressed',
                'outline-none keyboard-mode:group-data-focused:axo-focus-ring'
              )}
            >
              {props.children}
            </div>
          </div>
        </AriaClickable.Root>
      </AriaLabellingProvider>
    );
  });

  Root.displayName = 'AxoBaseItem.Root';

  /**
   * <AxoBaseItem.Icon>
   * --------------------------------------------------------------------------
   */

  export type IconProps = Readonly<{
    symbol: AxoSymbol.IconName;
  }>;

  export const Icon: FC<IconProps> = memo(props => {
    return (
      <div style={{ gridColumn: LEADING_SLOT }}>
        <AxoSymbol.Icon size={18} symbol={props.symbol} label={null} />
      </div>
    );
  });

  Icon.displayName = 'AxoBaseItem.Icon';

  /**
   * <AxoBaseItem.Checkbox>
   * --------------------------------------------------------------------------
   */

  export type CheckboxProps = Readonly<{
    id?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
  }>;

  export const Checkbox: FC<CheckboxProps> = memo(props => {
    return (
      <div style={{ gridColumn: LEADING_SLOT }}>
        <AxoCheckbox.Root
          id={props.id}
          variant="square"
          checked={props.checked}
          onCheckedChange={props.onCheckedChange}
        />
      </div>
    );
  });

  Checkbox.displayName = 'AxoBaseItem.Checkbox';

  /**
   * <AxoBaseItem.RadioGroupIndicator>
   * --------------------------------------------------------------------------
   */

  export const RadioGroupIndicator: FC = memo(() => {
    return (
      <div style={{ gridColumn: LEADING_SLOT }}>
        <AxoRadioGroup.Indicator />
      </div>
    );
  });

  RadioGroupIndicator.displayName = 'AxoBaseItem.RadioGroupIndicator';

  /**
   * <AxoBaseItem.IconAvatar>
   * --------------------------------------------------------------------------
   */

  export type IconAvatarSize = 32 | 36 | 38 | 48;

  export type IconAvatarProps = Readonly<{
    size: IconAvatarSize;
    symbol: AxoSymbol.IconName;
  }>;

  export const IconAvatar: FC<IconAvatarProps> = memo(props => {
    return (
      <div style={{ gridColumn: LEADING_SLOT }}>
        <AxoAvatar.Root size={props.size}>
          <AxoAvatar.Content label={null}>
            <AxoAvatar.Icon symbol={props.symbol} />
          </AxoAvatar.Content>
        </AxoAvatar.Root>
      </div>
    );
  });

  IconAvatar.displayName = 'AxoBaseItem.IconAvatar';

  /**
   * <AxoBaseItem.Content>
   * --------------------------------------------------------------------------
   */

  export type ContentProps = Readonly<{
    children: ReactNode;
  }>;

  export const Content: FC<ContentProps> = memo(props => {
    return (
      <div
        style={{ gridColumn: CONTENT_SLOT }}
        className={tw(
          'flex shrink grow basis-0 flex-wrap',
          'self-stretch',
          'items-baseline',
          'gap-x-3 gap-y-2'
        )}
      >
        {props.children}
      </div>
    );
  });

  Content.displayName = 'AxoBaseItem.Content';

  /**
   * <AxoBaseItem.Body>
   * --------------------------------------------------------------------------
   */

  export type BodyProps = Readonly<{
    children: ReactNode;
  }>;

  export const Body: FC<BodyProps> = memo(props => {
    return (
      <div
        className={tw(
          'flex shrink grow basis-0 flex-wrap',
          'self-center-safe',
          'gap-x-3 gap-y-0.5'
        )}
      >
        {props.children}
      </div>
    );
  });

  Body.displayName = 'AxoBaseItem.Body';

  /**
   * <AxoBaseItem.Title>
   * --------------------------------------------------------------------------
   */

  export type TitleProps = Readonly<{
    id?: string;
    children: ReactNode;
  }>;

  export const Title: FC<TitleProps> = memo(props => {
    const fallbackId = useId();
    const { labelRef } = useAriaLabellingContext('AxoBaseItem.Root');
    return (
      <div
        ref={labelRef}
        id={props.id ?? fallbackId}
        className={tw(
          'min-w-50',
          'grow-[calc(infinity)]',
          'type-body-medium text-primary',
          'line-clamp-2'
        )}
      >
        {props.children}
      </div>
    );
  });

  Title.displayName = 'AxoBaseItem.Title';

  /**
   * <AxoBaseItem.Value>
   * --------------------------------------------------------------------------
   */

  export type ValueProps = Readonly<{
    children: ReactNode;
  }>;

  export const Value: FC<ValueProps> = memo(props => {
    return (
      <div className={tw('w-fit grow type-body-medium text-secondary')}>
        {props.children}
      </div>
    );
  });

  Value.displayName = 'AxoBaseItem.Value';

  /**
   * <AxoBaseItem.Description>
   * --------------------------------------------------------------------------
   */

  export type DescriptionProps = Readonly<{
    children: ReactNode;
  }>;

  export const Description: FC<DescriptionProps> = memo(props => {
    return (
      <div
        className={tw(
          'basis-full type-body-small text-secondary',
          'forced-colors:text-[GrayText]'
        )}
      >
        {props.children}
      </div>
    );
  });

  Description.displayName = 'AxoBaseItem.Description';

  /**
   * <AxoBaseItem.Trigger>
   * --------------------------------------------------------------------------
   */

  export type HiddenTriggerProps = Readonly<{
    label?: string;
    labelledby?: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  }>;

  export const HiddenTrigger: FC<HiddenTriggerProps> = memo(props => {
    return (
      <AriaClickable.HiddenTrigger
        label={props.label}
        labelledby={props.labelledby}
        onClick={props.onClick}
      />
    );
  });

  HiddenTrigger.displayName = 'AxoBaseItem.HiddenTrigger';

  /**
   * <AxoBaseItem.Accessory>
   * --------------------------------------------------------------------------
   */

  export type AccessoryProps = Readonly<{
    children: ReactNode;
  }>;

  export const Accessory: FC<AccessoryProps> = memo(props => {
    return (
      <AriaClickable.DeadArea
        data-axo-item-accessory
        style={{ gridColumn: TRAILING_SLOT }}
        className={tw('flex gap-1.5')}
      >
        {props.children}
      </AriaClickable.DeadArea>
    );
  });

  Accessory.displayName = 'AxoBaseItem.Accessory';

  /**
   * <AxoBaseItem.Action>
   * --------------------------------------------------------------------------
   */

  export type ActionVariant = 'subtle-secondary' | 'strong-affirmative';

  export type ActionProps = Readonly<{
    ref?: Ref<HTMLButtonElement | null>;
    variant: ActionVariant;
    symbol?: AxoSymbol.IconName;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
  }>;

  export const Action: FC<ActionProps> = memo(props => {
    const { ref, variant, symbol, onClick, children, ...rest } = props;
    return (
      <AxoButton.Root
        ref={ref}
        variant={variant}
        size="md"
        symbol={symbol}
        onClick={onClick}
        {...forwardExtraPropsForRadix(rest)}
      >
        {children}
      </AxoButton.Root>
    );
  });

  Action.displayName = 'AxoBaseItem.Action';

  /**
   * <AxoBaseItem.IconAction>
   * --------------------------------------------------------------------------
   */

  export type IconActionProps = Readonly<{
    ref?: Ref<HTMLButtonElement | null>;
    label: string;
    symbol: AxoSymbol.IconName;
    tooltip?: AxoIconButton.RootProps['tooltip'];
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  }>;

  export const IconAction: FC<IconActionProps> = memo(props => {
    const { ref, label, symbol, onClick, tooltip, ...rest } = props;
    return (
      <AxoIconButton.Root
        ref={ref}
        variant="implied-secondary"
        size="md"
        label={label}
        symbol={symbol}
        onClick={onClick}
        tooltip={tooltip}
        {...forwardExtraPropsForRadix(rest)}
      />
    );
  });

  IconAction.displayName = 'AxoBaseItem.IconAction';

  /**
   * <AxoBaseItem.Arrow>
   * --------------------------------------------------------------------------
   */

  export const Arrow: FC = memo(() => {
    return (
      <div
        style={{ gridColumn: TRAILING_SLOT }}
        className={tw('shrink-0 type-body-medium text-placeholder')}
      >
        <AxoSymbol.InlineGlyph label={null} symbol="chevron-[end]" />
      </div>
    );
  });

  Arrow.displayName = 'AxoBaseItem.Arrow';
}
