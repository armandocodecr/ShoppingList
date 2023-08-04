
export interface IDataLists {
    ok            : boolean
    data          : IList[];
}

export interface IAccLists {
    [key: string] : IList[]
}

export interface IListSorted {
    createdMonthAt: string;
    infoItemsList : IList[] | []
}

export interface IList {
    completed     : boolean
    name          :       string;
    id            :         string;
    creadtedAt   ?: null | string;
    items         :      IItemElement[];
}

export interface IItemElement {
    completed     : boolean;
    quantity      :  number;
    item          :      IItemItem;
    __typename    : string
}

export interface IItemItem {
    name          : string;
    __typename    : string;
}
