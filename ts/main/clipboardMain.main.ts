// Copyright 2025 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { clipboard, ipcMain } from 'electron';
import { drop } from '../util/drop.std.ts';
import OS from '../util/os/osMain.node.ts';

let doesClipboardNeedClearing = false;

function writeText(text: string) {
  drop(clipboard.writeText(text));
}

function clear(): void {
  clipboard.clear();

  // clipboard.clear is not reliable on Linux, so we actually have to overwrite it
  if (OS.isLinux()) {
    writeText(' ');
  }

  doesClipboardNeedClearing = false;
}

ipcMain.on('SignalClipboard.clear', () => {
  clear();
});

ipcMain.on('SignalClipboard.clearIfNeeded', () => {
  if (doesClipboardNeedClearing) {
    clear();
  }
});

ipcMain.on(
  'SignalClipboard.copyTextTemporarily',
  (_event, text: string, clearAfterMs: number) => {
    writeText(text);
    doesClipboardNeedClearing = true;
    setTimeout(() => clear(), clearAfterMs);
  }
);
