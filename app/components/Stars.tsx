import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";

interface Props {
  reviews: Review[];
}

const Stars = ({ reviews }: Props) => {
  const rate = calculateReviewRatingAverage(reviews);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rate)) {
        stars.push(fullStar);
      } else if (i === Math.floor(rate)) {
        const value = rate - i;
        if (value < 0.2) stars.push(emptyStar);
        else if (value < 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else {
        stars.push(emptyStar);
      }
    }

    return stars.map((star, i) => (
      <Image src={star} key={i} alt="star" className="w-4 h-4 mr-1" />
    ));
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default Stars;
