"use server";

import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { groups: [], products: [] }; // Return a default structure if file doesn't exist
    }
    console.error("Error reading database:", error);
    throw new Error("Could not read data from the database.");
  }
}

async function writeDb(data) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to database:", error);
    throw new Error("Could not write data to the database.");
  }
}

export async function addGroup(formData) {
  const groupName = formData.get("groupName");
  const image = formData.get("image");

  console.log({ groupName, image });

  // Here you would typically handle the image upload to a storage service
  // and then save the group name and image URL to the database.

  return { success: true, message: "Group added successfully!" };
}

export async function getGroups() {
  try {
    const db = await readDb();
    return {
      success: true,
      data: db.groups.map((g) => ({ id: g.id, name: g.name })),
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function addProduct(formData) {
  const productName = formData.get("productName");
  const description = formData.get("description");
  const price = formData.get("price");
  const inStock = formData.get("inStock");
  const discount = formData.get("discount");
  const categoryId = formData.get("category");
  const images = formData.getAll("images");

  console.log({
    productName,
    description,
    price,
    inStock,
    discount,
    categoryId,
    images,
  });

  // Here you would handle image uploads and then save the product to the database.

  return { success: true, message: "Product added successfully!" };
}
