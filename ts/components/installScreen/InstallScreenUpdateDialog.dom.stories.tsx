// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { Meta } from '@storybook/react';

import { InstallScreenUpdateDialog } from './InstallScreenUpdateDialog.dom.tsx';
import { action } from '@storybook/addon-actions';
import { DialogType } from '../../types/Dialogs.std.ts';

import type { PropsType } from './InstallScreenUpdateDialog.dom.tsx';
import { useCallback, useState, type ReactNode } from 'react';
import { sleep } from '../../util/sleep.std.ts';

const { i18n } = window.SignalContext;

export default {
  title: 'Components/InstallScreen/InstallScreenUpdateDialog',
} satisfies Meta;

function getDefaultProps(): PropsType {
  return {
    dialogType: DialogType.None,
    didSnooze: false,
    showEventsCount: 0,
    isCheckingForUpdates: false,
    i18n,
    forceCheck: action('forceCheck'),
    startUpdate: action('startUpdate'),
    currentVersion: 'v1.0.0',
    OS: 'macos',
  };
}

export function _1NoDialogNotCheckingForUpdates(): ReactNode {
  return <InstallScreenUpdateDialog {...getDefaultProps()} />;
}
export function _2IsCheckingForUpdates(): ReactNode {
  return (
    <InstallScreenUpdateDialog {...getDefaultProps()} isCheckingForUpdates />
  );
}

export function _3ErrorUnsupportedOS(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.UnsupportedOS}
    />
  );
}

export function _3ErrorMASUpdate(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.MASUpdate}
    />
  );
}

export function _3DownloadReady(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.DownloadReady}
      downloadSize={100_000}
    />
  );
}

export function _3FullDownloadReady(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.FullDownloadReady}
      downloadSize={100_000_000}
    />
  );
}

export function _3AutoUpdate(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.AutoUpdate}
    />
  );
}

export function _4Downloading(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.Downloading}
      downloadedSize={50_000_000}
      downloadSize={100_000_000}
    />
  );
}

export function _5DownloadedUpdate(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.DownloadedUpdate}
    />
  );
}

export function _6ErrorCannotUpdate(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.Cannot_Update}
    />
  );
}

export function _6ErrorCannot_Update_Require_Manual(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.Cannot_Update_Require_Manual}
    />
  );
}

export function _6ErrorMacosReadOnly(): ReactNode {
  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      dialogType={DialogType.MacOS_Read_Only}
    />
  );
}

export function Flow(): ReactNode {
  const [updates, setUpdates] = useState({
    dialogType: DialogType.None,
    didSnooze: false,
    isCheckingForUpdates: false,
    showEventsCount: 0,
    downloadSize: 42 * 1024 * 1024,
  });
  const forceCheck = useCallback(async () => {
    setUpdates(state => ({
      ...state,
      isCheckingForUpdates: true,
    }));
    await sleep(2000);
    setUpdates(state => ({
      ...state,
      isCheckingForUpdates: false,
      dialogType: DialogType.DownloadReady,
      downloadSize: 30_000_000,
      downloadedSize: 0,
      version: 'v7.7.7',
    }));
  }, [setUpdates]);

  const startUpdate = useCallback(async () => {
    if (updates.dialogType === DialogType.DownloadedUpdate) {
      // oxlint-disable-next-line no-console
      console.log('Restarting!');
      return;
    }

    setUpdates(state => ({
      ...state,
      dialogType: DialogType.Downloading,
      downloadSize: 30_000_000,
      downloadedSize: 0,
      version: 'v7.7.7',
    }));
    await sleep(1000);
    setUpdates(state => ({
      ...state,
      downloadedSize: 15_000_000,
    }));
    await sleep(1000);
    setUpdates(state => ({
      ...state,
      downloadedSize: 30_000_000,
    }));
    await sleep(500);
    setUpdates(state => ({
      ...state,
      dialogType: DialogType.DownloadedUpdate,
    }));
  }, [updates, setUpdates]);

  return (
    <InstallScreenUpdateDialog
      {...getDefaultProps()}
      {...updates}
      forceCheck={forceCheck}
      startUpdate={startUpdate}
    />
  );
}
