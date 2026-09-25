// Copyright 2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { JSX } from 'react';

import type { LocalizerType } from '../types/Util.std.ts';
import type { WidthBreakpoint } from './_util.std.ts';

import { LeftPaneDialog } from './LeftPaneDialog.dom.tsx';
import { openLinkInWebBrowser } from '../util/openLinkInWebBrowser.dom.ts';

export type PropsType = {
  containerWidthBreakpoint: WidthBreakpoint;
  i18n: LocalizerType;
  isMAS: boolean;
};

const WEBSITE_URL = 'https://signal.org/download/';
const APP_STORE_URL =
  'https://apps.apple.com/app/signal-private-messenger/id1230208093';

export function DialogExpiredBuild({
  containerWidthBreakpoint,
  i18n,
  isMAS,
}: PropsType): JSX.Element | null {
  return (
    <LeftPaneDialog
      containerWidthBreakpoint={containerWidthBreakpoint}
      type="error"
      onClick={() => {
        openLinkInWebBrowser(isMAS ? APP_STORE_URL : WEBSITE_URL);
      }}
      clickLabel={
        isMAS
          ? i18n('icu:DialogExpiredBuild__upgrade-mas')
          : i18n('icu:upgrade')
      }
      hasAction
    >
      {i18n('icu:expiredWarning')}{' '}
    </LeftPaneDialog>
  );
}
