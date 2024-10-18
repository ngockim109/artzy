import IFeedback from "@/interface/feedback.interface";
import { roundNumber } from "./roundNumber";

export const averageRating = (feedbacks: IFeedback[]) => {
  if (feedbacks && feedbacks.length > 0) {
    let sumRating = 0;
    feedbacks?.forEach((fb) => {
      sumRating += fb.rating;
    });
    return roundNumber(sumRating / feedbacks?.length, 2);
  } else {
    return 0;
  }
};

export const countRatingByStar = (feedbacks: IFeedback[], star: number) => {
  if (star < 1 || star > 5) {
    throw new Error("Star rating must be between 1 and 5.");
  }
  return feedbacks.filter((fb) => fb.rating === star).length;
};

export const percentageOfRatingByStar = (
  feedbacks: IFeedback[],
  star: number
) => {
  if (star < 1 || star > 5) {
    throw new Error("Star rating must be between 1 and 5.");
  }
  const totalFeedbacks = feedbacks.length;
  if (totalFeedbacks === 0) {
    return 0;
  }
  const count = countRatingByStar(feedbacks, star);
  return roundNumber((count / totalFeedbacks) * 100, 2);
};
