// Copyright 2023 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useMove } from 'react-aria';
import { NavTabsToggle } from './NavTabs';
import type { LocalizerType } from '../types/I18N';
import {
  MAX_WIDTH,
  MIN_FULL_WIDTH,
  MIN_WIDTH,
  getWidthFromPreferredWidth,
} from '../util/leftPaneWidth';
import { WidthBreakpoint, getNavSidebarWidthBreakpoint } from './_util';
import type { UnreadStats } from '../util/countUnreadStats';

type NavSidebarActionButtonProps = {
  icon: ReactNode;
  label: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
};

export const NavSidebarActionButton = React.forwardRef<
  HTMLButtonElement,
  NavSidebarActionButtonProps
>(function NavSidebarActionButtonInner(
  { icon, label, onClick, onKeyDown },
  ref
): JSX.Element {
  return (
    <button
      ref={ref}
      type="button"
      className="NavSidebar__ActionButton"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {icon}
      <span className="NavSidebar__ActionButtonLabel">{label}</span>
    </button>
  );
});

export type NavSidebarProps = Readonly<{
  actions?: ReactNode;
  children: ReactNode;
  i18n: LocalizerType;
  hasFailedStorySends: boolean;
  hasPendingUpdate: boolean;
  hideHeader?: boolean;
  navTabsCollapsed: boolean;
  onBack?: (() => void) | null;
  onToggleNavTabsCollapse(navTabsCollapsed: boolean): void;
  preferredLeftPaneWidth: number;
  requiresFullWidth: boolean;
  savePreferredLeftPaneWidth: (width: number) => void;
  title: string;
  otherTabsUnreadStats: UnreadStats;
  renderToastManager: (_: {
    containerWidthBreakpoint: WidthBreakpoint;
  }) => JSX.Element;
}>;

enum DragState {
  INITIAL,
  DRAGGING,
  DRAGEND,
}

export function NavSidebar({
  actions,
  children,
  hideHeader,
  i18n,
  hasFailedStorySends,
  hasPendingUpdate,
  navTabsCollapsed,
  onBack,
  onToggleNavTabsCollapse,
  preferredLeftPaneWidth,
  requiresFullWidth,
  savePreferredLeftPaneWidth,
  title,
  otherTabsUnreadStats,
  renderToastManager,
}: NavSidebarProps): JSX.Element {
  const isRTL = i18n.getLocaleDirection() === 'rtl';

  return (
    <div
      role="navigation"
      className={classNames('NavSidebar')}
    >
      {!hideHeader && (
        <div className="NavSidebar__Header">
          {onBack == null && navTabsCollapsed && (
            <NavTabsToggle
              i18n={i18n}
              navTabsCollapsed={navTabsCollapsed}
              onToggleNavTabsCollapse={onToggleNavTabsCollapse}
              hasFailedStorySends={hasFailedStorySends}
              hasPendingUpdate={hasPendingUpdate}
              otherTabsUnreadStats={otherTabsUnreadStats}
            />
          )}
          <div
            className={classNames('NavSidebar__HeaderContent', {
              'NavSidebar__HeaderContent--navTabsCollapsed': navTabsCollapsed,
              'NavSidebar__HeaderContent--withBackButton': onBack != null,
            })}
          >
            {onBack != null && (
              <button
                type="button"
                role="link"
                onClick={onBack}
                className="NavSidebar__BackButton"
              >
                <span className="NavSidebar__BackButtonLabel">
                  {i18n('icu:NavSidebar__BackButtonLabel')}
                </span>
              </button>
            )}
            <h1
              className={classNames('NavSidebar__HeaderTitle', {
                'NavSidebar__HeaderTitle--withBackButton': onBack != null,
              })}
              aria-live="assertive"
            >
              {title}
            </h1>
            {actions && (
              <div className="NavSidebar__HeaderActions">{actions}</div>
            )}
          </div>
        </div>
      )}

      <div className="NavSidebar__Content">{children}</div>

      {renderToastManager({ containerWidthBreakpoint: 400 })}
    </div>
  );
}

export function NavSidebarSearchHeader({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <div className="NavSidebarSearchHeader">{children}</div>;
}

export function NavSidebarEmpty({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}): JSX.Element {
  return (
    <div className="NavSidebarEmpty">
      <div className="NavSidebarEmpty__inner">
        <h3 className="NavSidebarEmpty__title">{title}</h3>
        <p className="NavSidebarEmpty__subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
