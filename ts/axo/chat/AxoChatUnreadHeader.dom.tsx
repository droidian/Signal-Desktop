// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { memo, useId, type FC, type ReactNode } from 'react';
import { tw } from '../tw.dom.tsx';

export namespace AxoChatUnreadHeader {
  /**
   * <AxoChatUnreadHeader.Root>
   * --------------------------------------------------------------------------
   */

  export type RootProps = Readonly<{
    children: ReactNode;
  }>;

  export const Root: FC<RootProps> = memo(props => {
    const id = useId();
    return (
      <div
        className={tw('flex items-center gap-3 px-4 py-2.5')}
        role="separator"
        aria-labelledby={id}
      >
        <div className={tw('flex-1 border-t border-secondary')} />
        <div
          id={id}
          className={tw(
            'px-3 py-1',
            'type-body-small font-medium text-primary',
            'rounded-full bg-surface-card',
            'shadow-elevation-0 shadow-no-outline',
            'truncate'
          )}
        >
          {props.children}
        </div>
        <div className={tw('flex-1 border-t border-secondary')} />
      </div>
    );
  });

  Root.displayName = 'AxoChatUnreadHeader.Root';
}
