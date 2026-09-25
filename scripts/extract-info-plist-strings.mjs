// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
// @ts-check
import prettier from 'prettier';
import packageJson from '../package.json' with { type: 'json' };
import { writeFile } from 'node:fs/promises';

const { NSCameraUsageDescription, NSMicrophoneUsageDescription } =
  packageJson.build.mas.extendInfo;

const destinationPath = '_locales/en/mas-info-plist.json';
const prettierConfig = await prettier.resolveConfig(destinationPath);

const unformattedJson = JSON.stringify({
  smartling: {
    translate_paths: [
      {
        path: '*/messageformat',
        key: '{*}/messageformat',
        character_limit: '*/limit',
        instruction: '*/description',
      },
    ],
  },
  NSCameraUsageDescription: {
    messageformat: NSCameraUsageDescription,
    description:
      'Presented to user by macOS when requesting camera permissions',
  },
  NSMicrophoneUsageDescription: {
    messageformat: NSMicrophoneUsageDescription,
    description:
      'Presented to user by macOS when requesting microphone permissions',
  },
});

await writeFile(
  destinationPath,
  await prettier.format(unformattedJson, {
    ...prettierConfig,
    filepath: destinationPath,
  })
);
