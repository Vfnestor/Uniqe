"use client";

import { ChangeEvent } from "react";

type SearchInputProps = {
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function SearchInput({
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="search-input-wrapper">
      <span className="search-input-icon">
        /
      </span>

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search Uniqe..."
        aria-label="Search Uniqe"
        autoComplete="off"
      />

      {value && (
        <button
          type="button"
          className="search-input-clear"
          onClick={() =>
            onChange({
              target: {
                value: "",
              },
            } as ChangeEvent<HTMLInputElement>)
          }
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}