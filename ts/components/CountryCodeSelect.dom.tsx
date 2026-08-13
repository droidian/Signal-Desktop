// Copyright 2024 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import {
  useState,
  useCallback,
  useMemo,
  type JSX,
  type MouseEvent,
  type ChangeEvent,
} from 'react';
import Fuse from 'fuse.js';

import type { LocalizerType } from '../types/Util.std.ts';
import type { CountryDataType } from '../util/getCountryData.dom.ts';
import { SearchInput } from './SearchInput.dom.tsx';
import { AxoDialog } from '../axo/AxoDialog.dom.tsx';

export type PropsType = Readonly<{
  i18n: LocalizerType;
  onChange: (region: string) => void;
  value: string;
  defaultRegion: string;
  countries: ReadonlyArray<CountryDataType>;
}>;

export function CountryCodeSelect({
  i18n,
  onChange,
  value,
  defaultRegion,
  countries,
}: PropsType): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedCountry = useMemo(() => {
    return countries.find(({ region }) => region === value);
  }, [countries, value]);

  const defaultCode = useMemo(() => {
    return countries.find(({ region }) => region === defaultRegion)?.code ?? '';
  }, [countries, defaultRegion]);

  const onShowModal = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    setIsModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button type="button" className="CountryCodeSelect" onClick={onShowModal}>
        <div className="CountryCodeSelect__text">
          {selectedCountry?.displayName ??
            i18n('icu:CountryCodeSelect__placeholder')}
        </div>
        <div className="CountryCodeSelect__value">
          {selectedCountry?.code ?? defaultCode}
        </div>
        <div className="CountryCodeSelect__arrow" />
      </button>
      {isModalOpen ? (
        <ChooseCountryCodeModal
          countries={countries}
          i18n={i18n}
          onChange={onChange}
          onClose={onCloseModal}
        />
      ) : null}
    </>
  );
}

export function ChooseCountryCodeModal({
  countries,
  i18n,
  onChange,
  onClose,
}: {
  countries: ReadonlyArray<CountryDataType>;
  i18n: LocalizerType;
  onChange: (region: string) => void;
  onClose: () => unknown;
}): JSX.Element {
  const index = useMemo(() => {
    return new Fuse<CountryDataType>(countries, {
      keys: [
        {
          name: 'displayName',
          weight: 1,
        },
        {
          name: 'code',
          weight: 0.5,
        },
      ],
      threshold: 0.1,
    });
  }, [countries]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return countries;
    }
    return index.search(searchTerm).map(({ item }) => item);
  }, [countries, index, searchTerm]);

  const onSearchTermChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(ev.target.value);
    },
    []
  );
  const onCountryClick = useCallback(
    (region: string) => {
      onClose();
      onChange(region);
    },
    [onChange, onClose]
  );

  return (
    <AxoDialog.Root
      open
      onOpenChange={value => {
        if (!value) {
          onClose();
        }
      }}
    >
      <AxoDialog.Content
        size="sm"
        escape="cancel-is-noop"
        disableMissingAriaDescriptionWarning
      >
        <AxoDialog.Header>
          <AxoDialog.Title>
            {i18n('icu:CountryCodeSelect__Modal__title')}
          </AxoDialog.Title>
          <AxoDialog.Close />
        </AxoDialog.Header>
        <AxoDialog.Body>
          <SearchInput
            i18n={i18n}
            moduleClassName="CountryCodeSelect__Modal__Search"
            onChange={onSearchTermChange}
            placeholder={i18n('icu:search')}
            value={searchTerm}
          />
          <div className="CountryCodeSelect__table">
            {filteredCountries.map(({ displayName, region, code }) => {
              return (
                <CountryButton
                  key={region}
                  region={region}
                  displayName={displayName}
                  code={code}
                  onClick={onCountryClick}
                />
              );
            })}
          </div>
          <div className="CountryCodeSelect__grow" />
        </AxoDialog.Body>
      </AxoDialog.Content>
    </AxoDialog.Root>
  );
}

type CountryButtonPropsType = Readonly<{
  region: string;
  displayName: string;
  code: string;
  onClick: (region: string) => void;
}>;

function CountryButton({
  region,
  displayName,
  code,
  onClick,
}: CountryButtonPropsType): JSX.Element {
  const onButtonClick = useCallback(
    (ev: MouseEvent) => {
      ev.preventDefault();
      onClick(region);
    },
    [region, onClick]
  );

  return (
    <button
      type="button"
      className="CountryCodeSelect__CountryButton"
      onClick={onButtonClick}
    >
      <div className="CountryCodeSelect__CountryButton__name">
        {displayName}
      </div>
      <div className="CountryCodeSelect__CountryButton__code">{code}</div>
    </button>
  );
}
