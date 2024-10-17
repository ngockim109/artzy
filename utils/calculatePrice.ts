import { roundNumber } from "./roundNumber";

export const calculatePrice = (deal: number, price: number) => {
  return deal > 0 ? roundNumber(price - price * deal, 2) : price;
};
