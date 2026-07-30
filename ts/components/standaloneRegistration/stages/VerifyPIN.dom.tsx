// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { useState, useCallback } from 'react';

import type { ChangeEvent, JSX } from 'react';

import { I18n } from '../../I18n.dom.tsx';
import { AxoButton } from '../../../axo/AxoButton.dom.tsx';

import type { LocalizerType } from '../../../types/I18N.std.ts';
import type { ActionCreator } from '../../../state/types.std.ts';
import type { VerifyPINStage } from '../../../types/StandaloneRegistration.std.ts';
import type {
  goToAccountLockedStage as doGoToAccountLockedStage,
  goToCreatePINStage as doGoToCreatePINStage,
  verifyPIN as doVerifyPIN,
} from '../../../state/ducks/standaloneInstaller.preload.ts';

export function VerifyPINScreen({
  verifyPIN,
  goToCreatePINStage,
  goToAccountLockedStage,
  i18n,
  workflow,
}: {
  verifyPIN: ActionCreator<typeof doVerifyPIN>;
  goToCreatePINStage: ActionCreator<typeof doGoToCreatePINStage>;
  goToAccountLockedStage: ActionCreator<typeof doGoToAccountLockedStage>;
  i18n: LocalizerType;
  workflow: VerifyPINStage;
}): JSX.Element {
  const [pin, setPIN] = useState('');
  const [isValidPIN, setIsValidPIN] = useState(false);

  const onChangePIN = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setIsValidPIN(value.length === 6);
      setPIN(value);
    },
    [setIsValidPIN, setPIN]
  );

  // TODO: show below input box if entered PIN is incorrect
  // icu:StandaloneRegistration--VerifyPIN--incorrect-pin
  // icu:StandaloneRegistration--VerifyPIN--incorrect-pin--with-count

  // TODO: Need Help dialog
  // icu:StandaloneRegistration--VerifyPIN--NeedHelp--header
  // icu:StandaloneRegistration--VerifyPIN--NeedHelp--description--no-reglock
  // icu:StandaloneRegistration--VerifyPIN--NeedHelp--description--reglock
  // icu:StandaloneRegistration--VerifyPIN--NeedHelp--skip-button--no-reglock
  // icu:StandaloneRegistration--VerifyPIN--NeedHelp--contact-support-button
  // icu:StandaloneRegistration--VerifyPIN--NeedHelp--cancel

  // TODO: Incorrect pin, N attempts remaining dialog
  // icu:StandaloneRegistration--VerifyPIN--FewRemainingTries--header
  // icu:StandaloneRegistration--VerifyPIN--FewRemainingTries--description--no-reglock
  // icu:StandaloneRegistration--VerifyPIN--FewRemainingTries--description--reglock
  // icu:StandaloneRegistration--VerifyPIN--FewRemainingTries--button

  // TODO: Incorrect PIN, no attempts remaining dialog
  // icu:StandaloneRegistration--VerifyPIN--NoRemainingTries--header
  // icu:StandaloneRegistration--VerifyPIN--NoRemainingTries--description
  // icu:StandaloneRegistration--VerifyPIN--NoRemainingTries--create-new-pin
  // icu:StandaloneRegistration--VerifyPIN--NoRemainingTries--learn-more

  // TODO: menu with one item:
  // icu:StandaloneRegistration--VerifyPIN--menu--skip-pin

  // TODO: icu:StandaloneRegistration--VerifyPIN--SkipPIN--header
  // icu:StandaloneRegistration--VerifyPIN--SkipPIN--description
  // icu:StandaloneRegistration--VerifyPIN--SkipPIN--skip-button
  // icu:StandaloneRegistration--VerifyPIN--SkipPIN--cancel-button

  return (
    <>
      <div className="step-body">
        <div className="header">
          {i18n('icu:StandaloneRegistration--VerifyPIN--header')}
        </div>

        <div>
          <I18n
            i18n={i18n}
            id="icu:StandaloneRegistration--VerifyPIN--description"
            components={{
              needHelp: parts => {
                return (
                  <a href="https://support.signal.org/hc/articles/360007059792-Signal-PIN">
                    {parts}
                  </a>
                );
              },
            }}
          />
        </div>
        {/* FIXME */}
        {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label */}
        <input
          className={`form-control ${isValidPIN ? 'valid' : 'invalid'}`}
          type="text"
          dir="auto"
          pattern="\s*[0-9]{3}-?[0-9]{3}\s*"
          title="Enter your 6-digit verification code. If you did not receive a code, click Call or Send SMS to request a new one"
          placeholder={i18n(
            'icu:StandaloneRegistration--VerifyPIN--placeholder'
          )}
          autoComplete="off"
          value={pin}
          onChange={onChangePIN}
        />
      </div>
      <div className="nav">
        <AxoButton.Root
          variant="implied-primary"
          size="md"
          onClick={() => goToCreatePINStage()}
        >
          TODO: Create new PIN
        </AxoButton.Root>
        <AxoButton.Root
          variant="implied-primary"
          size="md"
          onClick={() => goToAccountLockedStage()}
        >
          TODO: Account is locked!
        </AxoButton.Root>

        <AxoButton.Root
          variant="strong-primary"
          size="md"
          disabled={!isValidPIN}
          onClick={() => verifyPIN({ pin, workflow })}
        >
          TODO: Finish
        </AxoButton.Root>
      </div>
    </>
  );
}
