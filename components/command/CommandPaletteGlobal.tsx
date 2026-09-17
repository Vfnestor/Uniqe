"use client";

import { useEffect, useState } from "react";

import CommandPalette from "./CommandPalette";
import CommandTrigger from "./CommandTrigger";

export default function CommandPaletteGlobal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setOpen((current) => !current);
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
  }, []);

  return (
    <>
      <CommandTrigger
        onClick={() => setOpen(true)}
      />

      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}