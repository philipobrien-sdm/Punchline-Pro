export interface UserProfile {
  name: string;
  occupation: string;
  age: string;
  hometown: string;
  context: string;
  topics: string;
  style: ComedyStyle;
  influences: string[];
}

export enum ComedyStyle {
  OBSERVATIONAL = "Observational",
  SELF_DEPRECATING = "Self-Deprecating",
  DARK = "Dark/Edgy",
  ABSURDIST = "Absurdist",
  CLEAN = "Clean/Family Friendly",
  DEADPAN = "Deadpan"
}

export interface ComedyBit {
  id: number;
  title: string;
  setup: string;
  punchline: string;
  actOut: string;
  coachingTip: string;
}

export interface GeneratedRoutine {
  bits: ComedyBit[];
  opener: string;
  closer: string;
}
