// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
// @ts-check
import { fail } from '../danger-exports.mjs';
import fastGlob from 'fast-glob';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as z from 'zod/mini';

z.config(z.locales.en());

const ROOT_DIR = resolve(import.meta.dirname, '..', '..');

const PackageSchema = z.discriminatedUnion(
  'private',
  [
    z.object({
      private: z.literal(true),
      publishConfig: z.optional(z.never()),
    }),
    z.object({
      private: z.optional(z.undefined()),
      publishConfig: z.strictObject({
        access: z.literal('public'),
        registry: z.literal('https://registry.npmjs.org/'),
        provenance: z.literal(false),
      }),
    }),
  ]
  // 'Must have either "private" or "publishConfig"'
);

const pkgFiles = await fastGlob('**/package.json', {
  cwd: ROOT_DIR,
  ignore: ['**/node_modules'],
});

await Promise.all(
  pkgFiles.map(async pkgFile => {
    const pkgPath = resolve(ROOT_DIR, pkgFile);
    const pkgContents = await readFile(pkgPath, 'utf8');

    /** @type {unknown} */
    const pkgJson = JSON.parse(pkgContents);
    const result = PackageSchema.safeParse(pkgJson);
    if (result.success) {
      return;
    }

    const message = [
      '**All `package.json` files must have publish config**',
      '',
      '```jsonc',
      '"private": true,',
      '// or',
      '"publishConfig": {',
      '  "access": "public",',
      '  "registry": "https://registry.npmjs.org/",',
      // provenance is not supported in private repos
      // https://docs.npmjs.com/trusted-publishers#automatic-provenance-generation
      '  "provenance": false',
      '}',
      '```',
      '',
      `In "${pkgFile}":`,
      '',
      '```',
      z.prettifyError(result.error).trim(),
      '```',
    ].join('\n');

    fail(message, pkgFile);
  })
);
