import * as React from 'react';

import { BlueFolderIcon, SearchIcon, RoundedXIcon } from './icon';

interface ISearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = '게시물 URL 또는 키워드를 검색해보세요.',
}: ISearchBarProps): React.ReactElement => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex w-full items-center gap-4 rounded-full bg-white px-5 h-13.5"
    >
      <BlueFolderIcon className="h-7.5 w-7.5" />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none body-14-semibold"
        enterKeyHint="search"
      />

      {value ? (
        <RoundedXIcon type="button" onClick={() => onChange('')} className="h-6.5 w-6.5" />
      ) : (
        <SearchIcon className="h-6.5 w-6.5 text-gray-400" />
      )}
    </form>
  );
};
