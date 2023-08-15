import { ListItemUserData } from "@/app/interface/ListItemInterfaces";
import { ListItemCardMenu } from "./ListItemCardMenu";

interface Props {
  ListItem: ListItemUserData;
}

export function ContentListsItemsMenu({ ListItem }: Props) {

  return (
    <div className="self-start w-full">
      <h3 className="text-base text-slate-400">{ListItem.category}</h3>
      {ListItem.items.map((itemList) => (
        <ListItemCardMenu key={String(itemList.item.name)} itemList={itemList} />
      ))}
    </div>
  );
}