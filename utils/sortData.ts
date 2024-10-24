import ITool from "@/interface/tool.interface";
import { calculatePrice } from "./calculatePrice";

export const sortTools = (
  tools: ITool[],
  sortBy: string = "relevant"
): ITool[] => {
  // Helper to calculate final price after deal
  const getFinalPrice = (tool: ITool): number => {
    return calculatePrice(tool?.limitedTimeDeal, tool?.price);
  };

  const sortedTools = [...tools]; // Make a copy to avoid mutating the original array

  switch (sortBy) {
    case "highestPrice":
      return sortedTools.sort((a, b) => getFinalPrice(b) - getFinalPrice(a)); // Sort by final price descending

    case "lowestPrice":
      return sortedTools.sort((a, b) => getFinalPrice(a) - getFinalPrice(b)); // Sort by final price ascending

    case "highestDeal":
      return sortedTools.sort((a, b) => b.limitedTimeDeal - a.limitedTimeDeal); // Sort by deal percentage descending

    case "lowestDeal":
      return sortedTools.sort((a, b) => a.limitedTimeDeal - b.limitedTimeDeal); // Sort by deal percentage ascending

    case "highestAvgReview":
      return sortedTools.sort((a, b) => {
        const avgRatingA =
          a.feedbacks.length > 0
            ? a.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
              a.feedbacks.length
            : 0;
        const avgRatingB =
          b.feedbacks.length > 0
            ? b.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
              b.feedbacks.length
            : 0;
        return avgRatingB - avgRatingA; // Sort by average feedback rating descending
      });
    case "lowestAvgReview":
      return sortedTools.sort((a, b) => {
        const avgRatingA =
          a.feedbacks.length > 0
            ? a.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
              a.feedbacks.length
            : 0;
        const avgRatingB =
          b.feedbacks.length > 0
            ? b.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
              b.feedbacks.length
            : 0;
        return avgRatingA - avgRatingB; // Sort by average feedback rating descending
      });
    case "relevant":
    default:
      return tools;
  }
};
