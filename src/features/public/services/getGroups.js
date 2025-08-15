const GET_GROUPS = "/api/db";

export const getGroups = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 30000));
  try {
    const res = await fetch(GET_GROUPS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const products = await res.json();
    console.log(products);
    return products.groups;
  } catch (error) {
    console.error("Error fetching Groups:", error);
    return [];
  }
};
