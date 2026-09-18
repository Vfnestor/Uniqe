"use client";

type AdminSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function AdminSearch({
  value,
  onChange,
  placeholder = "Search...",
}: AdminSearchProps) {
  return (
    <div className="admin-search">
      <span
        className="admin-search-icon"
        aria-hidden="true"
      >
        ⌕
      </span>

      <input
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        aria-label={placeholder}
      />

      {value && (
        <button
          type="button"
          className="admin-search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}