import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { promises as fs } from "fs";
import path from "path";

// --- Firebase Configuration ---
// فضلاً، قم بنسخ إعدادات Firebase الخاصة بك هنا
// يمكنك إيجادها في ملف .env.local أو في كود Firebase الخاص بك
const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Seeding Logic ---
const DEFAULT_IMAGE_URL = "https://via.placeholder.com/150";

// --- Data Validation and Cleaning ---
function validateAndClean(data, type) {
   const errors = [];
   const cleanedData = { ...data };

   // Common validation
   if (!cleanedData.id || typeof cleanedData.id !== 'string' || !cleanedData.id.trim()) {
      errors.push('ID is missing or invalid.');
   }
   if (!cleanedData.name || typeof cleanedData.name !== 'string' || !cleanedData.name.trim()) {
      errors.push('Name is missing or invalid.');
   }

   // Cleaning
   for (const key in cleanedData) {
      if (typeof cleanedData[key] === 'string') {
         cleanedData[key] = cleanedData[key].trim();
      }
   }
   
   cleanedData.imageUrl = cleanedData.image_url || DEFAULT_IMAGE_URL;
   if (typeof cleanedData.imageUrl !== 'string' || !cleanedData.imageUrl.trim()) {
      cleanedData.imageUrl = DEFAULT_IMAGE_URL;
   }

   if (type === 'product') {
       if (cleanedData.price === null || cleanedData.price === undefined || isNaN(parseFloat(cleanedData.price))) {
           cleanedData.price = 0;
       } else {
           cleanedData.price = parseFloat(cleanedData.price);
       }
       cleanedData.price_before_discount = cleanedData.price_before_discount === null ? 0 : parseFloat(cleanedData.price_before_discount);
       cleanedData.description = cleanedData.description || null;
       cleanedData.out_of_stock = cleanedData.out_of_stock || false;
       cleanedData.variants = cleanedData.variants || [];
   }
   
   return { cleanedData, errors, isValid: errors.length === 0 };
}


async function seedDatabase() {
    console.log("--- Starting Database Seeding ---");
    const report = {
        categories: { success: 0, failed: 0 },
        products: { success: 0, failed: 0 },
        errors: [],
    };

    try {
        const filePath = path.join(process.cwd(), "db.json");
        const data = await fs.readFile(filePath, "utf-8");
        const { groups } = JSON.parse(data);

        if (!groups || !Array.isArray(groups)) {
            throw new Error("'groups' array not found or is not an array in db.json");
        }
        
        console.log(`[INFO] Found ${groups.length} groups to process.`);

        for (const group of groups) {
            const { cleanedData: category, errors, isValid } = validateAndClean(group, 'category');
            
            if (!isValid) {
                report.categories.failed++;
                report.errors.push({ type: 'Category', id: group.id || 'N/A', name: group.name || 'N/A', reasons: errors });
                continue; // Skip to next category
            }

            try {
                const categoryRef = doc(db, "categories", category.id);
                await setDoc(categoryRef, {
                    name: category.name,
                    imageUrl: category.imageUrl,
                    createdAt: new Date().toISOString(),
                });
                report.categories.success++;

                if (category.products && category.products.length > 0) {
                    for (const product of category.products) {
                        const { cleanedData, errors: productErrors, isValid: isProductValid } = validateAndClean(product, 'product');
                        
                        if (!isProductValid) {
                            report.products.failed++;
                            report.errors.push({ type: 'Product', id: product.id || 'N/A', name: product.name || 'N/A', category: category.name, reasons: productErrors });
                            continue; // Skip to next product
                        }

                        try {
                            const productRef = doc(db, "categories", category.id, "products", cleanedData.id);
                            await setDoc(productRef, {
                                name: cleanedData.name,
                                description: cleanedData.description,
                                price: cleanedData.price,
                                imageUrl: cleanedData.imageUrl,
                                price_before_discount: cleanedData.price_before_discount,
                                out_of_stock: cleanedData.out_of_stock,
                                variants: cleanedData.variants,
                                createdAt: new Date().toISOString(),
                            });
                            report.products.success++;
                        } catch (dbError) {
                            report.products.failed++;
                            report.errors.push({ type: 'Product', id: cleanedData.id, name: cleanedData.name, category: category.name, reasons: [`Firestore Error: ${dbError.message}`] });
                        }
                    }
                }
            } catch (dbError) {
                report.categories.failed++;
                report.errors.push({ type: 'Category', id: category.id, name: category.name, reasons: [`Firestore Error: ${dbError.message}`] });
            }
        }
    } catch (e) {
        console.error("[FATAL] A critical error occurred:", e.message);
        report.errors.push({ type: 'Fatal', reasons: [e.message] });
    }

    // --- Final Report ---
    console.log("\n--- Seeding Report ---");
    console.log(`Categories => Success: ${report.categories.success}, Failed: ${report.categories.failed}`);
    console.log(`Products   => Success: ${report.products.success}, Failed: ${report.products.failed}`);
    if (report.errors.length > 0) {
        console.log("\n--- Error Details ---");
        report.errors.forEach(err => {
            console.error(`- Type: ${err.type} | ID: ${err.id} | Name: ${err.name}`);
            err.reasons.forEach(reason => console.error(`  - Reason: ${reason}`));
        });
    }
    console.log("--- End of Report ---");
}

seedDatabase();