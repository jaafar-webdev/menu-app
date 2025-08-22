import { Group } from "@/types";

export const getGroups = async (): Promise<Group[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`);
  if (!res.ok) {
    throw new Error("Failed to fetch groups");
  }
  const data = await res.json();
  return data;
};