export async function getGroups() {
  try {
    const response = await fetch(`http://localhost:3000/api/groups`);

    if (!response.ok) {
      throw new Error(`Error fetching groups: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
}
