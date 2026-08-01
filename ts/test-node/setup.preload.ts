// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { use as chaiUse } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import type { SignalContextType } from '../windows/context.preload.ts';
import { Crypto } from '../context/Crypto.node.ts';
import { setEnvironment, Environment } from '../environment.std.ts';
import { HourCyclePreference } from '../types/I18N.std.ts';
import packageJson from '../../package.json' with { type: 'json' };

chaiUse(chaiAsPromised);

setEnvironment(Environment.Test, true);

// To replicate logic we have on the client side
global.window = {
  Date,
  performance,
  SignalContext: {
    i18n: (key: string) => `i18n(${key})`,
    getPath: () => '/tmp',
    getVersion: () => packageJson.version,
    config: {
      serverUrl: 'https://127.0.0.1:9',
      storageUrl: 'https://127.0.0.1:9',
      updatesUrl: 'https://127.0.0.1:9',
      resourcesUrl: 'https://127.0.0.1:9',
      version: packageJson.version,
      svr2Config: {
        svr2Url: 'https://127.0.0.1:9',
        svr2MRENCLAVE: [
          {
            createdAt: Date.now(),
            id: 'a75542d82da9f6914a1e31f8a7407053b99cc99a0e7291d8fbd394253e19b036',
          },
        ],
      },
    },
    crypto: new Crypto(),
    getResolvedMessagesLocale: () => 'en',
    getResolvedMessagesLocaleDirection: () => 'ltr',
    getHourCyclePreference: () => HourCyclePreference.UnknownPreference,
    getPreferredSystemLocales: () => ['en'],
    getLocaleOverride: () => null,
  } as unknown as SignalContextType,
} as unknown as typeof window;
