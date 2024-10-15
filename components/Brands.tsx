import { FlatList } from "react-native";
import React from "react";
import IBrand from "@/interface/brand.interface";
import BrandCard from "./atoms/BrandCard";

type BrandsProps = {
  DATA: IBrand[];
};
const Brands = ({ DATA }: BrandsProps) => {
  return (
    <FlatList
      data={DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <BrandCard
          src={item?.brandImage}
          key={item?.id}
          style={{
            width: 70,
            height: 70,
            marginRight: 10,
            borderRadius: 50,
          }}
        />
      )}
      keyExtractor={(item) => item?.id}
    />
  );
};

export default Brands;
