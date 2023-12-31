import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient, Restaurant, Review } from "@prisma/client";

interface IRestaurantDetails {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[]
} 

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string): Promise<IRestaurantDetails> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {slug},
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    }
  })

  if (!restaurant) throw new Error("Not found!")

  return restaurant;
}

const RestaurantDetails = async ({params}: {params: {slug: string}}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title title={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images items={restaurant.images} />
        <Reviews items={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetails;
