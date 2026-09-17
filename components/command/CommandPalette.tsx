"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  commandItems,
} from "./command-data";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({
  open,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commandItems;
    }

    return commandItems.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        item.category,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedQuery
      );
    });
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
      return;
    }

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  useEffect(() => {
    if (
      selectedIndex >= filteredItems.length
    ) {
      setSelectedIndex(
        Math.max(filteredItems.length - 1, 0)
      );
    }
  }, [
    filteredItems.length,
    selectedIndex,
  ]);

  const navigateToSelected = () => {
    const selected =
      filteredItems[selectedIndex];

    if (!selected) {
      return;
    }

    window.location.href = selected.href;
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex((current) =>
        Math.min(
          current + 1,
          filteredItems.length - 1
        )
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((current) =>
        Math.max(current - 1, 0)
      );

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      navigateToSelected();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="command-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="command-search">
          <span className="command-search-icon">
            /
          </span>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search or jump to..."
            autoComplete="off"
          />

          <kbd>ESC</kbd>
        </div>

        <div className="command-list">
          {filteredItems.length > 0 ? (
            filteredItems.map(
              (item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`command-item ${
                    selectedIndex === index
                      ? "is-selected"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    setSelectedIndex(index)
                  }
                  onClick={() => {
                    window.location.href =
                      item.href;
                  }}
                >
                  <span className="command-item-icon">
                    {item.icon}
                  </span>

                  <span className="command-item-content">
                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      {item.description}
                    </span>
                  </span>

                  <span className="command-item-category">
                    {item.category}
                  </span>

                  <span className="command-item-arrow">
                    ↗
                  </span>
                </button>
              )
            )
          ) : (
            <div className="command-empty">
              <span>?</span>

              <strong>
                No results found
              </strong>

              <p>
                Try another search term.
              </p>
            </div>
          )}
        </div>

        <div className="command-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            Navigate
          </span>

          <span>
            <kbd>↵</kbd>
            Open
          </span>

          <span>
            <kbd>ESC</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}