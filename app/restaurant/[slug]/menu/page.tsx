import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchMenu = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {slug},
    select: {
      items: true
    }
  });

  if (!restaurant) throw new Error;

  return restaurant.items;
}

const RestaurantMenu = async ({params}: {params: {slug: string}}) => {
  const menu = await fetchMenu(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      <Menu items={menu}/>
    </div>
  );
};

export default RestaurantMenu;
