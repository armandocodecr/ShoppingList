import { IPropertyItems } from "../interface/DataInterface";

interface Props {
    dataItems: IPropertyItems[], 
    currentItem: IPropertyItems, 
    itemName: string, 
    index: number
}

export const onDeleteItemsOfState = ({ dataItems, currentItem, itemName, index }: Props) => {
    if (!dataItems) return;

    const existingItem = dataItems.find((item) => item.category === currentItem.category);
    if( existingItem?.items.length === 1 ) {
        const newArray = dataItems.filter((itemExist, i) => i !== index)
        return newArray
    }

    const newData = dataItems.map((item) => {
      if (item.category === currentItem.category) {
        return {
          ...item,
          items: item.items.filter((currentItem) => currentItem.name !== itemName),
        };
      }
      return item;
    });

    return newData
}