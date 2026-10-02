// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { createSelector } from 'reselect';

import type { StateType } from '../reducer.preload.ts';
import type { StandaloneInstallerStateType } from '../ducks/standaloneInstaller.preload.ts';
import type {
  Direction,
  FatalErrorType,
  RegistrationWorkflow,
} from '../../types/StandaloneRegistration.std.ts';

const getStandaloneInstaller = (
  state: StateType
): StandaloneInstallerStateType => state.standaloneInstaller;

export const getWorkflow = createSelector(
  getStandaloneInstaller,
  (
    standaloneInstaller: StandaloneInstallerStateType
  ): RegistrationWorkflow | undefined => {
    return standaloneInstaller.workflow;
  }
);

export const getFatalError = createSelector(
  getStandaloneInstaller,
  (
    standaloneInstaller: StandaloneInstallerStateType
  ): FatalErrorType | undefined => {
    return standaloneInstaller.fatalError;
  }
);

export const getDirection = createSelector(
  getStandaloneInstaller,
  (standaloneInstaller: StandaloneInstallerStateType): Direction => {
    return standaloneInstaller.direction;
  }
);
