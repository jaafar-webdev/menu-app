import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          <li>
            <Link
              href="/dashboard/add-group"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Add Group
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/add-product"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Add Product
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
