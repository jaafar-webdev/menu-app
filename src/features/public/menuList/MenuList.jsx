import MenuItem from "./MenuItem";

export default function MenuList({ groups = [] }) {
  return (
    <div className="px-2">
      <span className="block font-black my-6 pr-3 text-sm text-gray-600">
        السعر يشمل الضرائب
      </span>

      {groups.map((group) => (
        <section
          key={group.id}
          id={`group-${group.id}`}
          className="scroll-mt-20 space-y-4"
        >
          <h2 className="text-xl font-bold border-r-4 border-primary pr-2">
            {group.name}
          </h2>
          {group.products.map((product) => (
            <MenuItem key={product.id} product={product} />
          ))}
        </section>
      ))}
    </div>
  );
}
