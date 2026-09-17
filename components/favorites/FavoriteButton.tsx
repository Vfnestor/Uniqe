"use client";

type FavoriteButtonProps = {
  itemId: string;
  active: boolean;
  onToggle: (itemId: string) => void;
};

export default function FavoriteButton({
  itemId,
  active,
  onToggle,
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className={`favorite-button ${
        active ? "is-active" : ""
      }`}
      onClick={() => onToggle(itemId)}
      aria-label={
        active
          ? "Remove from favorites"
          : "Add to favorites"
      }
      aria-pressed={active}
    >
      <span aria-hidden="true">
        {active ? "★" : "☆"}
      </span>
    </button>
  );
}