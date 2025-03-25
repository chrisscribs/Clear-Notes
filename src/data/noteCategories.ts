export interface NoteCategoryConfig {
    key: string;
    title: string;
    color: string;
    description: string;
}

export const NoteCategories: NoteCategoryConfig[] = [
    {
      key: "focus",
      title: "🌱 Deep Focus",
      color: "red",
      description: "No notes. Make note of what truly needs your focus.",
    },
    {
      key: "growth",
      title: "💡 Growth & Reflection",
      color: "blue",
      description: "No notes. A space for learnings, ideas and personal reflections.",
    },
    {
      key: "flow",
      title: "🌊 Let it Flow",
      color: "green",
      description: "No notes. Unload your mental clutter.",
    },
    {
      key: "letgo",
      title: "🌬️ Let it Go",
      color: "gray",
      description: "No notes. Release the thoughts that no longer serve you.",
    },
  ];