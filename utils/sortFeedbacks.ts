import IFeedback from "@/interface/feedback.interface";

export const sortFeedbacks = (
  feedbacks: IFeedback[],
  sortBy: string
): IFeedback[] => {
  const sortedFeedbacks = [...feedbacks];

  switch (sortBy) {
    case "highestRated":
      sortedFeedbacks.sort((a, b) => b.rating - a.rating);
      break;
    case "lowestRated":
      sortedFeedbacks.sort((a, b) => a.rating - b.rating);
      break;
    case "mostRecent":
      sortedFeedbacks.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      break;
    case "relevant":
      break;
  }

  return sortedFeedbacks;
};
