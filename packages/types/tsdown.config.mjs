// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.std.ts',
  outDir: 'dist',
  dts: true,
  sourcemap: true,
  format: {
    esm: {},
    cjs: {},
  },
  publint: true,
  attw: true,
});
