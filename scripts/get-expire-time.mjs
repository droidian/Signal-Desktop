// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
// @ts-check
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { DAY } from './utils/durations.mjs';
import { parseVersion } from './utils/parseVersion.mjs';
import { getBuildCreationTimestamp } from './utils/getBuildCreationTimestamp.mjs';
import packageJson from '../package.json' with { type: 'json' };

const buildCreation = getBuildCreationTimestamp();

const isNotUpdatable = !parseVersion(packageJson.version).isUpdatable;

// NB: Build expirations are also determined via users' auto-update settings; see
// getExpirationTimestamp
const validDuration = isNotUpdatable ? DAY * 30 : DAY * 90;
const buildExpiration = buildCreation + validDuration;

const localProductionPath = join(
  import.meta.dirname,
  '../config/local-production.json'
);

const localProductionConfig = {
  buildCreation,
  buildExpiration,
  ...(isNotUpdatable ? { updatesEnabled: false } : {}),
};

writeFileSync(
  localProductionPath,
  `${JSON.stringify(localProductionConfig)}\n`
);
