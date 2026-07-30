// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { memo } from 'react';
import { useSelector } from 'react-redux';

import { getDefaultAvatars } from '../../types/Avatar.std.ts';
import { useConversationsActions } from '../ducks/conversations.preload.ts';
import { useStandaloneInstallerActions } from '../ducks/standaloneInstaller.preload.ts';
import { getIntl, getUserConversationId } from '../selectors/user.std.ts';
import { getMe } from '../selectors/conversations.dom.ts';
import {
  getDirection,
  getFatalError,
  getWorkflow,
} from '../selectors/standaloneInstaller.std.ts';
import { StandaloneRegistration } from '../../components/standaloneRegistration/StandaloneRegistration.dom.tsx';
import { trigger } from '../../shims/events.dom.ts';
import { getCountryDataForLocale } from '../../util/getCountryData.dom.ts';

export const SmartStandaloneRegistration = memo(
  function SmartStandaloneRegistration() {
    const { deleteAvatarFromDisk, replaceAvatar, saveAvatarToDisk } =
      useConversationsActions();
    const {
      completeRegistration,
      createPIN,
      finishProfileEntryStage,
      goToAccountLockedStage,
      goToCreatePINStage,
      moveToCaptchaStage,
      moveToVerificationStage,
      openBrowserForCaptcha,
      requestVerificationCode,
      startConfirmingPIN,
      startRegistration,
      submitVerificationCode,
      verifyPIN,
    } = useStandaloneInstallerActions();

    const i18n = useSelector(getIntl);
    const countries = getCountryDataForLocale(i18n.getLocale());
    const conversationId = useSelector(getUserConversationId);
    const me = useSelector(getMe);
    const userAvatarData = me?.avatars ?? getDefaultAvatars();

    const workflow = useSelector(getWorkflow);
    const fatalError = useSelector(getFatalError);
    const direction = useSelector(getDirection);

    if (!workflow) {
      return undefined;
    }

    return (
      <StandaloneRegistration
        // Housekeeping
        conversationId={conversationId}
        countries={countries}
        i18n={i18n}
        readyForUpdates={readyForUpdates}
        // The workflow
        cancelRegistration={() => trigger('setupAsNewDevice')}
        completeRegistration={completeRegistration}
        createPIN={createPIN}
        direction={direction}
        fatalError={fatalError}
        finishProfileEntryStage={finishProfileEntryStage}
        goToAccountLockedStage={goToAccountLockedStage}
        goToCreatePINStage={goToCreatePINStage}
        moveToCaptchaStage={moveToCaptchaStage}
        moveToVerificationStage={moveToVerificationStage}
        openBrowserForCaptcha={openBrowserForCaptcha}
        requestVerificationCode={requestVerificationCode}
        startConfirmingPIN={startConfirmingPIN}
        startRegistration={startRegistration}
        submitVerificationCode={submitVerificationCode}
        verifyPIN={verifyPIN}
        workflow={workflow}
        // AvatarEditor support
        deleteAvatarFromDisk={deleteAvatarFromDisk}
        replaceAvatar={replaceAvatar}
        saveAvatarToDisk={saveAvatarToDisk}
        userAvatarData={userAvatarData}
      />
    );
  }
);

function readyForUpdates(): void {
  window.IPC.readyForUpdates();
}
