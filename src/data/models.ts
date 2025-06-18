export type DamageType =
  | "Acid"
  | "Bludgeoning"
  | "Cold"
  | "Fire"
  | "Force"
  | "Lightning"
  | "Necrotic"
  | "Piercing"
  | "Poison"
  | "Psychic"
  | "Radiant"
  | "Slashing"
  | "Thunder";

export type Spell = {
  id: string;
  url: string;
  name: string;
  icon: string;
  level: number;
  upcast: boolean;
  action: "Action" | "Bonus Action";
  duration: string;
  range: string;
  type: string;
  damage: {
    dice: string;
    damageType: DamageType;
  }[];
};

export type ClassType =
  | "Bard"
  | "Cleric"
  | "Druid"
  | "Sorcerer"
  | "Warlock"
  | "Wizard";
