// Copyright 2026 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { StickerManagerHeader } from '../../components/stickers/StickerManagerHeader.dom.tsx';
import { getIntl } from '../selectors/user.std.ts';
import { getStickerManagerTab } from '../selectors/stickers.std.ts';
import { useStickersActions } from '../ducks/stickers.preload.ts';

export const SmartStickerManagerHeader = memo(
  function SmartStickerManagerHeader() {
    const i18n = useSelector(getIntl);
    const tab = useSelector(getStickerManagerTab);
    const { setStickerManagerTab } = useStickersActions();

    return (
      <StickerManagerHeader
        i18n={i18n}
        tab={tab}
        setTab={setStickerManagerTab}
      />
    );
  }
);
