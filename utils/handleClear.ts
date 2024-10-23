export const getSelectedItemCount = (selectedItems: {
  [key: string]: boolean;
}) => {
  return Object.values(selectedItems).filter((isSelected) => isSelected).length;
};
