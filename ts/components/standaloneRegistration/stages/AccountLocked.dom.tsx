// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { JSX } from 'react';

import { MINUTE } from '../../../util/durations/constants.std.ts';
import { AxoButton } from '../../../axo/AxoButton.dom.tsx';
import { CONTACT_SUPPORT_URL } from '../../../util/contactSupport.dom.tsx';
import { openLinkInWebBrowser } from '../../../util/openLinkInWebBrowser.dom.ts';

import type { LocalizerType } from '../../../types/I18N.std.ts';
import type { ActionCreator } from '../../../state/types.std.ts';
import type { startRegistration as doStartRegistration } from '../../../state/ducks/standaloneInstaller.preload.ts';

export function AccountLockedScreen({
  i18n,
  startRegistration,
}: {
  startRegistration: ActionCreator<typeof doStartRegistration>;
  i18n: LocalizerType;
}): JSX.Element {
  return (
    <>
      <div className="step-body">
        <div className="header">
          {i18n('icu:StandaloneRegistration--AccountLocked--header')}
        </div>
        <div>
          {i18n('icu:StandaloneRegistration--AccountLocked--description')}
        </div>
      </div>
      <div className="nav">
        <AxoButton.Root
          variant="strong-secondary"
          size="md"
          onClick={() => {
            openLinkInWebBrowser(CONTACT_SUPPORT_URL);
          }}
        >
          {i18n('icu:StandaloneRegistration--AccountLocked--help-button')}
        </AxoButton.Root>
        <AxoButton.Root
          variant="strong-primary"
          size="md"
          onClick={() =>
            startRegistration({
              waitUntil: Date.now() + MINUTE * 5,
              blankPhoneNumber: true,
            })
          }
        >
          {i18n('icu:StandaloneRegistration--AccountLocked--start-over-button')}
        </AxoButton.Root>
      </div>
    </>
  );
}
