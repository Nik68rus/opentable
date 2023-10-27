import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";

interface Props {
  items: Review[];
}

const Reviews = ({ items }: Props) => {
  if (!items.length) {
    return (
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        No reviews yet!
      </h1>
    );
  } else {
    return (
      <div>
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          What {items.length} {items.length === 1 ? "person is" : "people are"}{" "}
          saying
        </h1>
        <div>
          {items.map((item) => (
            <ReviewCard review={item} key={item.id} />
          ))}
        </div>
      </div>
    );
  }
};

export default Reviews;
