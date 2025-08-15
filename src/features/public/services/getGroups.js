import data from "@/../db.json";

export const getGroups = async () => {
  // No fetch needed, just return the imported data directly.
  // We keep it async to avoid changing the components that use it.
  try {
    return data.groups;
  } catch (error) {
    console.error("Error reading groups from db.json:", error);
    return [];
  }
};
