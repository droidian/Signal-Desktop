// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { assert } from 'chai';

import { computeBlurHashUrl } from '../../util/computeBlurHashUrl.std.ts';
import { defaultBlurHash } from '../../util/Attachment.std.ts';

describe('computeBlurHashUrl', () => {
  const BLUR_HASH = defaultBlurHash();

  async function loadImage(
    desiredWidth?: number,
    desiredHeight?: number
  ): Promise<HTMLImageElement> {
    const image = document.createElement('img');
    image.src = computeBlurHashUrl(BLUR_HASH, desiredWidth, desiredHeight);
    await image.decode();
    return image;
  }

  it('produces a square image by default', async () => {
    const image = await loadImage();
    assert.strictEqual(image.naturalWidth, 32);
    assert.strictEqual(image.naturalHeight, 32);
  });

  it('respects the requested aspect ratio', async () => {
    const image = await loadImage(1600, 400);
    assert.strictEqual(image.naturalWidth / image.naturalHeight, 4);
  });

  describe('bounds sender-provided dimensions', () => {
    const DEGENERATE: ReadonlyArray<[number, number]> = [
      [1, 25_000_000],
      [25_000_000, 1],
      [1, 0xffffffff],
      [0xffffffff, 1],
      [0, 0xffffffff],
      [0xffffffff, 0xffffffff],
      [-1, -25_000_000],
      [Number.MAX_SAFE_INTEGER, 1],
      [1, Number.MAX_SAFE_INTEGER],
    ];

    for (const [desiredWidth, desiredHeight] of DEGENERATE) {
      it(`stays small for ${desiredWidth}x${desiredHeight}`, async () => {
        const image = await loadImage(desiredWidth, desiredHeight);

        assert.isAtLeast(image.naturalWidth, 4);
        assert.isAtLeast(image.naturalHeight, 4);
        assert.isAtMost(image.naturalWidth, 256);
        assert.isAtMost(image.naturalHeight, 256);
      });
    }
  });
});
