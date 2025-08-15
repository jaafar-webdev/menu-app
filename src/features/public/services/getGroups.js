import data from "@/../db.json";

export const getGroups = async () => {
  try {
    return data.groups;
  } catch (error) {
    console.error("Error reading groups from db.json:", error);
    return [];
  }
};
