import ITool from "@/interface/tool.interface";

type FilterToolsProps = {
  originalTools: ITool[];
  price: string;
  glassSurfaces: "true" | "false" | "All";
  onSale: boolean | null;
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
}: FilterToolsProps): ITool[] => {
  const [minPrice, maxPrice] =
    price !== "Any price" ? price.split("-").map(Number) : [null, null];
  return originalTools.filter((tool) => {
    const isPriceMath =
      price === "Any price" ||
      (minPrice !== null &&
        maxPrice !== null &&
        tool.price >= minPrice &&
        tool.price <= maxPrice);
    const isGlassSurfacesMatch =
      glassSurfaces === "All" ||
      tool.glassSurface === (glassSurfaces === "true");
    const isOnSaleMatch =
      onSale === null || tool.limitedTimeDeal > 0 === onSale;
    return isPriceMath && isGlassSurfacesMatch && isOnSaleMatch;
  });
};
