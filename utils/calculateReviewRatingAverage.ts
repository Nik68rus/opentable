import { Review } from "@prisma/client";
export const calculateReviewRatingAverage = (reviews: Review[]) => {
  if (!reviews.length) return 0;

  return (
    Math.round(
      (reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length) *
        100
    ) / 100
  );
};

export const getReviewString = (reviews: Review[]) => {
  let reviewString = reviews.length
    ? `${reviews.length} review`
    : "No reviews yet";
  if (reviews.length > 1) reviewString += "s";
  return reviewString;
};
