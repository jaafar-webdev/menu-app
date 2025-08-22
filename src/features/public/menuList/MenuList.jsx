import { memo } from "react";
import MenuItem from "./MenuItem";

// تحسين أداء القائمة عن طريق تقسيم المكونات
const ProductsList = memo(({ products }) => {
  return products.map((product) => (
    <MenuItem key={product.id} product={product} />
  ));
});

const GroupSection = memo(({ group }) => {
  return (
    <section
      key={group.id}
      id={`group-${group.id}`}
      className="scroll-mt-20 space-y-4"
    >
      <h2 className="text-xl font-bold border-r-4 border-primary pr-2">
        {group.name}
      </h2>
      <ProductsList products={group.products} />
    </section>
  );
});

export default function MenuList({ groups }) {
  return (
    <div className="px-2">
      <span className="block font-black my-6 pr-3 text-sm text-gray-600">
        السعر يشمل الضرائب
      </span>

      {groups.map((group) => (
        <GroupSection key={group.id} group={group} />
      ))}
    </div>
  );
}
