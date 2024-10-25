import { FlatList, TouchableOpacity } from "react-native";
import React from "react";
import IBrand from "@/interface/brand.interface";
import BrandCard from "./atoms/BrandCard";
import { useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";

type BrandsProps = {
  DATA: IBrand[];
};
const Brands = ({ DATA }: BrandsProps) => {
  const router = useRouter();
  return (
    <FlatList
      data={DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="items-center justify-center"
          onPress={() =>
            router.push({
              pathname: `/brands/[id]`,
              params: { id: item?.brand ?? "", brandImage: item?.brandImage },
            })
          }
        >
          <BrandCard
            src={item?.brandImage}
            key={item?.id}
            style={{
              width: 60,
              height: 60,
              marginRight: 10,
              borderRadius: 50,
            }}
          />
          <ThemedText className="text-center">{item?.brand}</ThemedText>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item?.id}
    />
  );
};

export default Brands;
