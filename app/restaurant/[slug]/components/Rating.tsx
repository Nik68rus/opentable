import Stars from "@/app/components/Stars";
import {
  calculateReviewRatingAverage,
  getReviewString,
} from "@/utils/calculateReviewRatingAverage";
import { Review } from "@prisma/client";
import React from "react";

interface Props {
  reviews: Review[];
}

const Rating = ({ reviews }: Props) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>
          <Stars reviews={reviews} />
        </p>
        <p className="text-reg ml-3">{calculateReviewRatingAverage(reviews)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{getReviewString(reviews)}</p>
      </div>
    </div>
  );
};

export default Rating;
