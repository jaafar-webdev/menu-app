import MenuList from "@/features/public/menuList/MenuList";
import CartDesktop from "@/features/public/cart/CartDesktop";
import { getGroups } from "@/features/public/services/getGroups";
import Categories from "@/features/public/categories/Categories";

export default async function MenuPage() {
  const groups = await getGroups();

  return (
    <div className="main-container w-full">
      <div className="w-full md:flex md:gap-2.5 mt-4 mx-auto xl:w-[90%]">
        <div className="md:w-2/3 lg:w-9/12 lg:flex">
          <div className="lg:w-3/12 sticky top-[65px] z-10">
            <Categories groups={groups} />
          </div>
          <div className="lg:w-9/12">
            <MenuList groups={groups} />
          </div>
        </div>
        <div className="md:w-1/3 lg:w-3/12 mt-4 md:mt-0">
          <CartDesktop />
        </div>
      </div>
    </div>
  );
}
