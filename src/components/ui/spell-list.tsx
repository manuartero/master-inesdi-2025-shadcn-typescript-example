import type { Spell } from "@/data/models";
import { SpellItem } from "./spell";

interface SpellListProps {
  spells: Spell[];
}

export function SpellList({ spells }: SpellListProps) {
  if (!spells.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <p>No spells found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center">
      {spells.map((spell) => (
        <SpellItem key={spell.id} spell={spell} />
      ))}
    </div>
  );
}
