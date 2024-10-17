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
