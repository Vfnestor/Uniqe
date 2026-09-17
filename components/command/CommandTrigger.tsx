"use client";

type CommandTriggerProps = {
  onClick: () => void;
};

export default function CommandTrigger({
  onClick,
}: CommandTriggerProps) {
  return (
    <button
      type="button"
      className="command-trigger"
      onClick={onClick}
      aria-label="Open command palette"
    >
      <span className="command-trigger-icon">
        /
      </span>

      <span className="command-trigger-label">
        Search
      </span>

      <kbd>⌘ K</kbd>
    </button>
  );
}