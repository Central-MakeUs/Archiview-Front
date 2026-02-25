import * as React from 'react';

import { BlueFolderIcon, SearchIcon, RoundedXIcon } from './icon';
import { cn } from '../lib/cn';

interface ISearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = '게시물 URL 또는 키워드를 검색해보세요.',
  className,
}: ISearchBarProps): React.ReactElement => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={cn('flex w-full items-center gap-2.5 rounded-full bg-white px-5 h-13.5', className)}
    >
      <BlueFolderIcon className="h-7.5 w-7.5 shrink-0" />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent outline-none body-14-semibold placeholder:font-normal placeholder:text-neutral-50"
        enterKeyHint="search"
      />

      {value ? (
        <RoundedXIcon type="button" onClick={() => onChange('')} className="h-6.5 w-6.5 shrink-0" />
      ) : (
        <SearchIcon className="h-4.5 w-4.5 shrink-0 text-neutral-40" />
      )}
    </form>
  );
};
