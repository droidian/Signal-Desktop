// Copyright 2019 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import {
  memo,
  createRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type JSX,
} from 'react';
import { StickerManagerPackRow } from './StickerManagerPackRow.dom.tsx';
import { StickerPreviewModal } from './StickerPreviewModal.dom.tsx';
import type { LocalizerType } from '../../types/Util.std.ts';
import type { StickerPackType } from '../../state/ducks/stickers.preload.ts';
import type { ShowToastAction } from '../../state/ducks/toast.preload.ts';
import type { StickerManagerTabType } from '../../types/Stickers.preload.ts';
import { tw } from '../../axo/tw.dom.tsx';
import { AxoButton } from '../../axo/AxoButton.dom.tsx';

export type OwnProps = {
  readonly blessedPacks: ReadonlyArray<StickerPackType>;
  readonly closeStickerPackPreview: () => unknown;
  readonly downloadStickerPack: (
    packId: string,
    packKey: string,
    options: { actionSource: 'ui' }
  ) => unknown;
  readonly i18n: LocalizerType;
  readonly installStickerPack: (
    packId: string,
    packKey: string,
    options: { actionSource: 'ui' }
  ) => unknown;
  readonly installedPacks: ReadonlyArray<StickerPackType>;
  readonly knownPacks?: ReadonlyArray<StickerPackType>;
  readonly receivedPacks: ReadonlyArray<StickerPackType>;
  readonly tab: StickerManagerTabType;
  readonly setTab: (value: StickerManagerTabType) => void;
  readonly showToast: ShowToastAction;
  readonly uninstallStickerPack: (
    packId: string,
    packKey: string,
    options: { actionSource: 'ui' }
  ) => unknown;
};

export type Props = OwnProps;

export const StickerManager = memo(function StickerManagerInner({
  blessedPacks,
  closeStickerPackPreview,
  downloadStickerPack,
  i18n,
  installStickerPack,
  installedPacks,
  knownPacks,
  receivedPacks,
  tab,
  setTab,
  showToast,
  uninstallStickerPack,
}: Props) {
  const focusRef = createRef<HTMLDivElement>();
  const [packIdToPreview, setPackIdToPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!knownPacks) {
      return;
    }
    knownPacks.forEach(pack => {
      downloadStickerPack(pack.id, pack.key, { actionSource: 'ui' });
    });

    // When this component is created, it's initially not part of the DOM, and then it's
    //   added off-screen and animated in. This ensures that the focus takes.
    setTimeout(() => {
      if (focusRef.current) {
        focusRef.current.focus();
      }
    });
    // We only want to attempt downloads on initial load
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearPackToPreview = useCallback(() => {
    setPackIdToPreview(null);
  }, [setPackIdToPreview]);

  const previewPack = useCallback((packId: string) => {
    setPackIdToPreview(packId);
  }, []);

  const renderStickerPackRow = useCallback(
    (pack: StickerPackType): JSX.Element => (
      <StickerManagerPackRow
        key={pack.id}
        pack={pack}
        i18n={i18n}
        onClickPreview={previewPack}
        installStickerPack={installStickerPack}
        uninstallStickerPack={uninstallStickerPack}
      />
    ),
    [i18n, installStickerPack, previewPack, uninstallStickerPack]
  );

  const setTabAll = useCallback(() => setTab('all'), [setTab]);

  const allPacks = useMemo(() => {
    const packsMap = new Map<string, StickerPackType>();
    const packsList = [
      ...blessedPacks,
      ...installedPacks,
      ...(knownPacks ?? []),
      ...receivedPacks,
    ];
    packsList.forEach(pack => {
      if (packsMap.get(pack.id)) {
        return;
      }

      packsMap.set(pack.id, pack);
    });
    return packsMap;
  }, [blessedPacks, installedPacks, knownPacks, receivedPacks]);

  const packToPreview = useMemo(() => {
    return packIdToPreview ? allPacks.get(packIdToPreview) : undefined;
  }, [allPacks, packIdToPreview]);

  return (
    <>
      {packIdToPreview ? (
        <StickerPreviewModal
          closeStickerPackPreview={closeStickerPackPreview}
          downloadStickerPack={downloadStickerPack}
          i18n={i18n}
          installStickerPack={installStickerPack}
          onClose={clearPackToPreview}
          pack={packToPreview}
          uninstallStickerPack={uninstallStickerPack}
          showToast={showToast}
        />
      ) : null}
      <div
        className={tw('m-auto max-w-152 px-4 py-0 outline-none')}
        data-testid="StickerManager"
        tabIndex={-1}
        ref={focusRef}
      >
        {tab === 'all' && (
          <>
            <h2
              className={tw(
                'mx-2 my-1 type-body-medium font-semibold text-label-primary select-none'
              )}
            >
              {i18n('icu:stickers--StickerManager--BlessedPacks')}
            </h2>
            {blessedPacks.length > 0 ? (
              blessedPacks.map(pack => renderStickerPackRow(pack))
            ) : (
              <p
                className={tw(
                  'mx-2 mb-1 type-body-small text-label-secondary select-none'
                )}
              >
                {i18n('icu:stickers--StickerManager--BlessedPacks--Empty')}
              </p>
            )}
            <div className={tw('mb-4')} />

            {receivedPacks.length > 0 && (
              <>
                <h2
                  className={tw(
                    'mx-2 mt-2 mb-0.5 type-body-medium font-semibold text-label-primary select-none'
                  )}
                >
                  {i18n('icu:stickers--StickerManager--ReceivedPacks2')}
                </h2>
                <p
                  className={tw(
                    'mx-2 mb-1 type-body-small text-label-secondary select-none'
                  )}
                >
                  {i18n(
                    'icu:stickers--StickerManager--ReceivedPacksDescription'
                  )}
                </p>
                {receivedPacks.map(pack => renderStickerPackRow(pack))}
              </>
            )}
          </>
        )}
        {tab === 'my-stickers' &&
          (installedPacks.length > 0 ? (
            installedPacks.map(pack => renderStickerPackRow(pack))
          ) : (
            <div
              className={tw(
                'm-auto grid min-h-screen place-items-center text-center'
              )}
            >
              <div className={tw('max-w-60')}>
                <div
                  className={tw('mb-4 type-body-medium text-label-secondary')}
                >
                  {i18n('icu:stickers--StickerManager--MyStickers--None')}
                </div>
                <div>
                  <AxoButton.Root
                    variant="secondary"
                    size="md"
                    onClick={setTabAll}
                  >
                    {i18n('icu:stickers--StickerManager--AddStickers')}
                  </AxoButton.Root>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
});
