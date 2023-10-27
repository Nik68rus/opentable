import Link from "next/link";
import { IFoundRestaurant } from "../page";
import Price from "@/app/components/Price";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import Stars from "@/app/components/Stars";

interface Props {
  item: IFoundRestaurant;
}

const RestaurantCard = ({ item }: Props) => {
  const renderRatingText = () => {
    const rate = calculateReviewRatingAverage(item.reviews);
    if (rate > 4) return "Awesome";
    else if (rate > 3) return "Good";
    else if (rate > 2) return "Average";
    else return "Bad";
  };

  return (
    <div className="border-b flex pb-5 ml-4">
      <img src={item.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{item.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={item.reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={item.price} />
            <p className="mr-4 capitalize">{item.cuisine.name}</p>
            <p className="mr-4 capitalize">{item.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${item.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
