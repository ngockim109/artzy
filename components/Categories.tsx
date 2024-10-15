import { FlatList } from "react-native";
import React from "react";
import Category from "./atoms/Category";

type CategoriesProps = {
  DATA: ICategory[];
};
const Categories = () => {
  const DATA: ICategory[] = [
    { id: "1", category: "All", categoryImage: "" },
    { id: "2", category: "GlassSurface", categoryImage: "" },
    { id: "3", category: "", categoryImage: "" },
  ];

  return (
    <FlatList
      data={DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Category
          src={item?.categoryImage}
          key={item?.id}
          style={{ width: 100, height: 100, marginRight: 10 }}
        />
      )}
      keyExtractor={(item) => item?.id}
    />
  );
};

export default Categories;
