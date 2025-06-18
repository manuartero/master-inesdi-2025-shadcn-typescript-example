import { Button } from "@/components/ui/button";
import { SpellList } from "@/components/ui/spell-list";
import type { ClassType, Spell } from "@/data/models";
import spellsByClassData from "@/data/spells-by-class.json";
import spellsData from "@/data/spells.json";
import { useEffect, useState } from "react";

function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [filteredSpells, setFilteredSpells] = useState<Spell[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassType | "all">("all");
  const [loading, setLoading] = useState(true);

  const classes: ClassType[] = ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"];

  // Load spells on component mount
  useEffect(() => {
    setLoading(true);

    // Simulate a small delay to show loading state (can be removed in production)
    setTimeout(() => {
      setSpells(spellsData as Spell[]);
      setFilteredSpells(spellsData as Spell[]);
      setLoading(false);
    }, 800);
  }, []);

  // Filter spells when class changes
  useEffect(() => {
    if (!spells.length) return;

    setLoading(true);

    // Small timeout to show loading state during filtering
    setTimeout(() => {
      if (selectedClass === "all") {
        setFilteredSpells(spells);
        setLoading(false);
        return;
      }

      // Get the lowercase version of the selected class to match the JSON keys
      const classKey = selectedClass.toLowerCase() as keyof typeof spellsByClassData;

      // Get the spell IDs for the selected class
      const classSpellIds = spellsByClassData[classKey] || [];

      // Filter the spells based on the IDs
      const classSpells = spells.filter(spell =>
        classSpellIds.includes(spell.id)
      );

      setFilteredSpells(classSpells);
      setLoading(false);
    }, 300);
  }, [selectedClass, spells]);

  return (
    <div className="min-h-svh flex flex-col">
      <header className="bg-gradient-to-r from-purple-800 to-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Spell Compendium</h1>
          <p className="text-sm opacity-80">Discover magical spells from the realm</p>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-4">
        {/* Class Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedClass === "all" ? "default" : "outline"}
            onClick={() => setSelectedClass("all")}
            className="min-w-20"
          >
            All
          </Button>

          {classes.map(classType => (
            <Button
              key={classType}
              variant={selectedClass === classType ? "default" : "outline"}
              onClick={() => setSelectedClass(classType)}
              className="min-w-20"
            >
              {classType}
            </Button>
          ))}
        </div>

        {/* Filtered count */}
        <div className="text-center mb-6 text-sm text-gray-500">
          {loading ? (
            <p>Loading spells...</p>
          ) : (
            <p>
              Showing {filteredSpells.length} {selectedClass !== "all" ? `${selectedClass} ` : ""}
              spells
            </p>
          )}
        </div>

        {/* Loading state and Spell List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-24"></div>
            </div>
          </div>
        ) : (
          <>
            {filteredSpells.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold">No spells found</h3>
                <p className="text-gray-500 mt-2">
                  {selectedClass !== "all"
                    ? `There are no spells available for the ${selectedClass} class.`
                    : "No spells found matching your criteria."}
                </p>
              </div>
            ) : (
              <SpellList spells={filteredSpells} />
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p>&copy; 2025 Spell Compendium</p>
      </footer>
    </div>
  )
}

export default App
