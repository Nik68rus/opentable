import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { Metadata, NextPage, NextPageContext } from "next";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: "Search result",
};

export interface IFoundRestaurant {
  id: number;
  name: string;
  price: PRICE;
  location: Location;
  cuisine: Cuisine;
  slug: string;
  main_image: string;
}

export interface ISearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const prisma = new PrismaClient();

const fetchRestaurantsByLocation = async (
  searchParams: ISearchParams
): Promise<IFoundRestaurant[]> => {
  const { city, cuisine, price } = searchParams;

  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        contains: searchParams.city.toLocaleLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine,
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    price: true,
    location: true,
    cuisine: true,
    slug: true,
    main_image: true,
  };

  if (!city)
    return await prisma.restaurant.findMany({
      select,
    });

  const restaurants = await prisma.restaurant.findMany({
    where,
    select,
  });

  return restaurants;
};

const fetchLocations = async (): Promise<Location[]> => {
  const locations = prisma.location.findMany();
  return locations;
};

const fetchCuisines = async (): Promise<Cuisine[]> => {
  const cuisines = prisma.cuisine.findMany();
  return cuisines;
};

const Search = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const restaurants = await fetchRestaurantsByLocation(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cusines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} item={restaurant} />
            ))
          ) : (
            <p>No restaurants at this location!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
