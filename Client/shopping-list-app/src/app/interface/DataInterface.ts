

export interface IDataFromServer {
    ok       : boolean;
    data     : any
}

export interface IDataItems{
  id: string
  category   : Category
  name       : string
  __typename?: string
}

export interface IPropertyItems {
  listId    ?: string
  listItemId?: string
  category   : string
  items      : IArrayItems[]
}

export interface IArrayItems{
  completed ?: boolean;
  id         : string;
  item       : Item;
  quantity   : number
}
  
export interface Category {
  name       : string
  __typename?: string
}

export interface Item {
  category   : Category
  name       : string
  id         : string
}

export interface IAccItems{
  [key: string]: IArrayItems[]
}

export interface IDataError {
  ok         : boolean;
  message    : string
}