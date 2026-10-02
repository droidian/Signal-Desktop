// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { type JSX } from 'react';
import { AxoAlertDialog } from '../axo/AxoAlertDialog.dom.tsx';
import { tw } from '../axo/tw.dom.tsx';
import type { LocalizerType } from '../types/I18N.std.ts';
import { I18n } from './I18n.dom.tsx';

const SIGNAL_USER_SAFETY_LINK =
  'https://support.signal.org/hc/articles/9932566320410-Staying-Safe-from-Phishing-Scams-and-Impersonation';

function Strong(parts: Array<string | JSX.Element>): JSX.Element {
  return <strong>{parts}</strong>;
}

export const RecoveryKeyPasteWarning = ({
  onConfirm,
  onCancel,
  i18n,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  i18n: LocalizerType;
}): JSX.Element => {
  return (
    <AxoAlertDialog.Root
      open
      onOpenChange={open => {
        if (!open) {
          onCancel();
        }
      }}
    >
      <AxoAlertDialog.Content escape="cancel-is-noop">
        <AxoAlertDialog.Body>
          <div className={tw('mt-3 mb-2 flex flex-col items-center')}>
            <img
              role="presentation"
              alt=""
              className={tw('mt-1 mb-3 size-16 shrink-0')}
              src="images/warning-circle.svg"
            />
            <AxoAlertDialog.Title>
              {i18n('icu:Preferences__recovery-key__do-not-share-title')}
            </AxoAlertDialog.Title>
          </div>
          <AxoAlertDialog.Description>
            <div className={tw('mb-3 text-center type-body-medium')}>
              <I18n
                id="icu:CompositionInput__recovery-key-warning--description"
                i18n={i18n}
                components={{
                  strong: Strong,
                  learnMoreLink: parts => (
                    <a
                      className={tw('whitespace-nowrap text-accent')}
                      href={SIGNAL_USER_SAFETY_LINK}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {parts}
                    </a>
                  ),
                }}
              />
            </div>
          </AxoAlertDialog.Description>
        </AxoAlertDialog.Body>
        <AxoAlertDialog.Footer>
          <AxoAlertDialog.Action
            variant="subtle-destructive"
            onClick={onConfirm}
          >
            {i18n('icu:CompositionInput__recovery-key-paste__share-key')}
          </AxoAlertDialog.Action>
          <AxoAlertDialog.Action
            variant="strong-primary"
            autoFocus
            onClick={onCancel}
          >
            {i18n('icu:CompositionInput__recovery-key-paste__do-not-share-key')}
          </AxoAlertDialog.Action>
        </AxoAlertDialog.Footer>
      </AxoAlertDialog.Content>
    </AxoAlertDialog.Root>
  );
};
