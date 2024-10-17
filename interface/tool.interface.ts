import IFeedback from "./feedback.interface";

type ITool = {
  id: string;
  artName: string;
  price: number;
  description: string;
  glassSurface: boolean;
  image: string;
  brand: string;
  brandImage: string;
  limitedTimeDeal: number;
  feedbacks: IFeedback[];
};

export default ITool;
