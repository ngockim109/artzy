import ITool from "@/interface/tool.interface";
import { calculatePrice } from "./calculatePrice";

type FilterToolsProps = {
  originalTools: ITool[];
  price: string;
  glassSurfaces: "true" | "false" | "All";
  onSale: boolean | null;
  brandFilter: string;
};
export const isValidPrice = (price: string) => {
  const pricePattern = /^\d+(\.\d{1,2})?$/;
  return pricePattern.test(price);
};
export const filterTools = ({
  originalTools,
  price = "Any price",
  glassSurfaces = "All",
  onSale = null,
  brandFilter = "All",
}: FilterToolsProps): ITool[] => {
  const [minPrice, maxPrice] =
    price !== "Any price"
      ? price
          .split("-")
          .map((val) => (val.trim() !== "" ? parseFloat(val) : null))
      : [null, null];
  return originalTools.filter((tool) => {
    const isPriceMatch =
      price === "Any price" || // If the price is "Any price", skip filtering
      (minPrice !== null &&
        maxPrice !== null &&
        calculatePrice(tool.limitedTimeDeal, tool.price) >= minPrice &&
        calculatePrice(tool.limitedTimeDeal, tool.price) <= maxPrice) || // Between min and max
      (minPrice !== null &&
        maxPrice === null &&
        calculatePrice(tool.limitedTimeDeal, tool.price) >= minPrice) || // Greater than or equal to minPrice
      (minPrice === null &&
        maxPrice !== null &&
        calculatePrice(tool.limitedTimeDeal, tool.price) <= maxPrice); // Less than or equal to maxPrice

    const isGlassSurfacesMatch =
      glassSurfaces === "All" ||
      tool.glassSurface === (glassSurfaces === "true");
    const isOnSaleMatch =
      onSale === null || tool.limitedTimeDeal > 0 === onSale;
    const isBrandMatch = brandFilter === "All" || tool.brand === brandFilter;
    console.log(brandFilter, onSale, glassSurfaces, price);
    return (
      isPriceMatch && isGlassSurfacesMatch && isOnSaleMatch && isBrandMatch
    );
  });
};
