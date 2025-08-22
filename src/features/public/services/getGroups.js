export async function getGroups() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/groups`,
    );

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
