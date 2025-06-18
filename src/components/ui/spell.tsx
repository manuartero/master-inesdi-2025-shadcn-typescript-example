import type { Spell } from "@/data/models";

interface SpellItemProps {
  spell: Spell;
}

export function SpellItem({ spell }: SpellItemProps) {  // Import the spell icon dynamically
  const iconPath = new URL(`/src/assets/spells/${spell.id}.png`, import.meta.url).href;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 w-[180px] hover:scale-105 hover:border-purple-300">
      <div className="w-16 h-16 mb-3 bg-purple-50 rounded-full p-2 flex items-center justify-center">
        <img
          src={iconPath}
          alt={`${spell.name} icon`}
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback if image doesn't load
            e.currentTarget.src = new URL('/src/assets/spells/acid-splash.png', import.meta.url).href;
          }}
        />
      </div>

      <h3 className="font-bold text-sm text-center">{spell.name}</h3>

      <div className="flex items-center gap-1 mt-2">
        <span className={`text-xs px-2 py-1 rounded-full ${
          spell.level === 0
            ? "bg-blue-100 text-blue-800"
            : spell.level >= 5
              ? "bg-purple-100 text-purple-800"
              : "bg-green-100 text-green-800"
        }`}>
          {spell.level === 0 ? "Cantrip" : `Level ${spell.level}`}
        </span>

        {spell.upcast && (
          <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
            Upcast
          </span>
        )}
      </div>

      <div className="w-full mt-3 text-xs text-gray-600 border-t pt-2 space-y-1">
        <div className="flex justify-between">
          <span className="font-medium">Action:</span>
          <span>{spell.action}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Duration:</span>
          <span>{spell.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Type:</span>
          <span>{spell.type || "-"}</span>
        </div>
      </div>
    </div>
  );
}
