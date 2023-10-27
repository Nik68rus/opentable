import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

interface Props {
  items: Item[]
}

const Menu = ({items}: Props) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {items.length ? items.map(item => <MenuCard key={item.id} item={item} />) : <p>No menu uploaded yet for this restaurant!</p>}
        </div>
      </div>
    </main>
  );
};

export default Menu;
