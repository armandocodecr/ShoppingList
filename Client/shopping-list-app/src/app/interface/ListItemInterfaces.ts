export interface IListItemElement {
    id                : string
    completed         : boolean;
    quantity          : number;
    item              : IListItemItems;
    __typename        : string
}

export interface IListItemItems {
    id                : string;
    name              : string;
    __typename       ?: string 
    category          : IListItemItemsCategory
}

export interface IListItemItemsCategory {
    name              : string;
    __typename       ?: string 
}

export interface ListItemUserDataStore {
    listId           : string;
    completed        : boolean;
    listName         : string;
    createdAt        : string
    listItem         : ListItemUserData[];
}

export interface ListItemUserData {
    listId            : string
    category          : string;
    items             : any[];
}

export interface Item {
    id                : string;
    name              : string;
    quantity          : number;
    completed         : boolean;
}

export interface CategorizedListItem {
    [category: string]: {
      listItemId      : string
      item            : IListItemItems;
      quantity        : number;
      completed       ?: boolean;
    }[];
}